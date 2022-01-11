const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const report = require('../constants/report');
const { validationResult } = require('express-validator');
const emailService = require('../service/email');
const infoMessage = require('../constants/infoMessages');
const reportService = require('../service/report');
const taskHelper = require('../utils/taskReportHelper');
const { reportLogger } = require('../logger/logger');
const path = require('path');

async function createEmployeeReport(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      reportLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }

    const employee = await Employee.findById(req.body.id);
    const currentDate = new Date();
    const yearAgo = new Date(new Date().setFullYear(new Date()
      .getFullYear() - 1));
    const tasks = await Task.find({
      employee: employee._id,
      createdAt: { $gte: yearAgo, $lte: currentDate }
    });
    const tasksCompleted = tasks.filter(task => task.completed);
    const tasksExpired = tasks.filter(task => task.isExpired);
    const pdfName = employee.name.replace(' ', '-')
      .toLowerCase() + report.FILE_NAME_EXT;

    const employeeReportDir = `${report.REPORTS_PATH}/${employee._id}`;
    const data = {
      employee,
      taskInfo: {
        total: tasks.length,
        completed: tasksCompleted.length,
        expired: tasksExpired.length
      }
    };
    const options = {
      data,
      template: report.EMPLOYEE_TEMPLATE,
      reportDir: employeeReportDir,
      pdfName
    };
    await reportService.generateReport(options);
    reportLogger.info(infoMessage.NEW_REPORT);
    res.json(path.join(__dirname, `../.${employeeReportDir}/${pdfName}`));
  } catch (error) {
    reportLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

async function createTasksReport(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      reportLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const { id, date } = req.body;
    const employee = await Employee.findById(id);
    const tommorow = new Date(date);
    tommorow.setDate(tommorow.getDate() + 1);
    const tasks = await Task.find({
      employee: employee._id,
      updatedAt: { $gte: new Date(date), $lte: tommorow }
    });

    const { tempContext, employeeReportDir, pdfName} = 
      taskHelper.createTaskReportData(employee, tasks, date);

    const options = {
      data: tempContext,
      template: report.TASKS_TEMPLATE,
      reportDir: employeeReportDir,
      pdfName
    };
    await reportService.generateReport(options);
    reportLogger.info(infoMessage.NEW_REPORT);
    res.json(path.join(__dirname, `../.${employeeReportDir}/${pdfName}`));
  } catch (error) {
    reportLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

module.exports = { createEmployeeReport, createTasksReport };