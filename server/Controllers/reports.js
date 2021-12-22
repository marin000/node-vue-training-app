const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const report = require('../constants/report');
const { validationResult } = require('express-validator');
const emailService = require('../service/email');
const infoMessage = require('../constants/infoMessages');
const { reportLogger } = require('../logger/logger');
const wkhtmltopdf = require('wkhtmltopdf');
const moment = require('moment');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

async function employeeReport(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      reportLogger.error(errors);
      emailService.sendEmail(JSON.stringify(errors.array()));
      res.status(403).json({ errors: errors.array() });
      return;
    }

    const employee = await Employee.findById(req.body.id );
    const currentDate = new Date();
    const yearAgo = new Date(new Date().setFullYear(new Date()
      .getFullYear() - 1));
    const tasks = await Task.find({
      employee: employee._id,
      createdAt: { $gte: yearAgo, $lte: currentDate }
    });
    const tasksCompleted = tasks.filter(task => task.completed);
    const today = moment().format('YYYY-MM-DD');
    const tasksExpired = tasks.filter(task => moment(today)
      .isAfter(task.deadline));
    const pdfName = employee.name.replace(' ', '-')
      .toLowerCase() + report.FILE_NAME_EXT;

    const taskInfo = {
      total: tasks.length,
      completed: tasksCompleted.length,
      expired: tasksExpired.length
    };
    const employeeReportDir = `${report.REPORTS_PATH}/${employee._id}`;

    ejs.renderFile(report.EMPLOYEE_TEMPLATE,
      { employee: employee, taskInfo: taskInfo }, (err, file) => {
        if (err) {
          throw new Error(err);
        }
        if (!fs.existsSync(employeeReportDir)) {
          fs.mkdirSync(employeeReportDir);
        }
        wkhtmltopdf(file, {
          output: `${report.REPORTS_PATH}/${employee._id}/${pdfName}`,
          pageSize: 'letter'
        });
      });

    reportLogger.info(infoMessage.NEW_REPORT);
    res.json(path.join(__dirname, `../reports/${employee._id}/${pdfName}`));
  } catch (error) {
    reportLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail(error.message);
    res.status(500).send(error.message);
  }
}

module.exports = { employeeReport };