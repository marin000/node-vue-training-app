const cron = require('node-cron');
const emailService = require('../service/email');
const emailDefault = require('../constants/email');
const { CRONJOB_MESSAGE, CRONJOB_SUBJECT } = emailDefault;
const reportService = require('../service/report');
const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const Promise = require("bluebird");
const moment = require('moment');
const report = require('../constants/report');
const taskHelper = require('../utils/taskReportHelper');
const { simpleLogger } = require('../logger/logger');
const infoMessage = require('../constants/infoMessages');
const path = require('path');
const cronSchedule = require('../constants/cronjob');

function sendReport() {
  cron.schedule(cronSchedule.DAILY_3AM, async () => {
    const employees = await Employee.find().limit(1).populate('tasks');
    console.log(employees)
    /*const today = new Date((new Date().setUTCHours(0, 0, 0, 0)));
    const yesterday = new Date((new Date().setUTCHours(0, 0, 0, 0)));
    yesterday.setDate(yesterday.getDate() - 1);
    const date = moment(yesterday).format("YYYY-MM-DD");

    Promise.each(employees, async function (employee) {
      return Task.find({
        employee: employee._id,
        updatedAt: { $gte: yesterday, $lte: today }
      }).then(function (tasks) {
        const { tempContext, employeeReportDir, pdfName } =
          taskHelper.createTaskReportData(employee, tasks, date);
        reportService.generateReport(tempContext, report.TASKS_TEMPLATE,
          employeeReportDir, pdfName);

          const reportPath = (path.join(__dirname, 
            `../.${employeeReportDir}/${pdfName}`));
          emailService.sendEmail(CRONJOB_MESSAGE, CRONJOB_SUBJECT + date, 
            pdfName, reportPath );
      });
    }).then(function () {
      simpleLogger.info(infoMessage.CRONJOB_SEND_REPORTS);
    });*/
  });
}

module.exports = { sendReport }