const cron = require('node-cron');
const emailService = require('../service/email');
const emailDefault = require('../constants/email');
const { CRONJOB_MESSAGE, CRONJOB_SUBJECT } = emailDefault;
const reportService = require('../service/report');
const Employee = require('../Models/Employees');
const moment = require('moment');
const report = require('../constants/report');
const taskHelper = require('../utils/taskReportHelper');
const { simpleLogger } = require('../logger/logger');
const infoMessage = require('../constants/infoMessages');
const path = require('path');
const cronSchedule = require('../constants/cronjob');
const fs = require('fs');

function sendReport() {
  cron.schedule(cronSchedule.DAILY_3AM, async () => {
    const employees = await Employee.find().populate('tasks');
    const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');

    employees.forEach(employee => {
      const yesterdayTasks = [];
      employee.tasks.forEach(task => {
        const taskDate = moment(task.updatedAt).format('YYYY-MM-DD');
        if (moment(yesterday).isSame(taskDate)) {
          yesterdayTasks.push(task);
        }
      });
      const { tempContext, employeeReportDir, pdfName } =
        taskHelper.createTaskReportData(employee, yesterdayTasks, yesterday);
      reportService.generateReport(tempContext, report.TASKS_TEMPLATE,
        employeeReportDir, pdfName);
      const reportPath = (path.join(__dirname,
        `../.${employeeReportDir}/${pdfName}`));
      const emailData = {
        emailMessage: CRONJOB_MESSAGE,
        emailSubject: CRONJOB_SUBJECT + yesterday,
        attachmentName: pdfName,
        attachmentPath: reportPath
      };
      emailService.sendEmail(emailData);
    });
    simpleLogger.info(infoMessage.CRONJOB_SEND_REPORTS);
  });
}

function deleteReport() {
  cron.schedule(cronSchedule.DAILY_4AM, async () => {
    fs.readdir(report.REPORTS_PATH, (err, dirs) => {
      dirs.forEach(dir => {
        if (dir !== report.HIDDEN_FILE) {
          const reportDir = `${report.REPORTS_PATH}/${dir}`;
          fs.readdir(reportDir, (err, files) => {
            files.forEach(file => {
              const filePath = `${reportDir}/${file}`;
              const { birthtime } = fs.statSync(filePath);
              const oldDate = moment().add(-5, 'days');
              if (moment(birthtime).isBefore(moment(oldDate))) {
                fs.rmSync(filePath);
                simpleLogger.info(infoMessage.FILE_DELETED);
              }
            });
          });
        }
      });
    });
  });
}

module.exports = { sendReport, deleteReport }