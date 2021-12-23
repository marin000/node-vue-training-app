const fs = require('fs');
const ejs = require('ejs');
const report = require('../constants/report');
const wkhtmltopdf = require('wkhtmltopdf');

function generateEmployeeReport(data) {
  const { employee, taskInfo, employeeReportDir, pdfName } = data;
  ejs.renderFile(report.EMPLOYEE_TEMPLATE,
    { employee: employee, taskInfo: taskInfo }, (err, file) => {
      if (err) {
        throw new Error(err);
      }
      if (!fs.existsSync(employeeReportDir)) {
        fs.mkdirSync(employeeReportDir);
      }
      wkhtmltopdf(file, {
        output: `${employeeReportDir}/${pdfName}`,
        pageSize: 'letter'
      });
    });
}

function generateTasksReport(data) {
  const { employee, tasks, date, employeeReportDir, pdfName } = data;
  ejs.renderFile(report.TASKS_TEMPLATE,
    { employee: employee, tasks: tasks, date: date }, (err, file) => {
      if (err) {
        throw new Error(err);
      }
      if (!fs.existsSync(employeeReportDir)) {
        fs.mkdirSync(employeeReportDir);
      }
      wkhtmltopdf(file, {
        output: `${employeeReportDir}/${pdfName}`,
        pageSize: 'letter'
      });
    });
}

module.exports = { generateEmployeeReport,generateTasksReport }