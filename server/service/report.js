const fs = require('fs');
const ejs = require('ejs');
const wkhtmltopdf = require('wkhtmltopdf');
const { reportLogger, simpleLogger } = require('../logger/logger');
const emailService = require('../service/email');
const Report = require('../Models/Reports');

async function generateReport({ data, template, reportDir, pdfName }) {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  const filePath = `${reportDir}/${pdfName}`;
  ejs.renderFile(template, data,
    function (err, file) {
      if(err) {
        reportLogger.error(err);
        emailService.sendEmail({ emailMessage: err });
      } else {
        wkhtmltopdf(file, {
          output: filePath,
          pageSize: 'a4'
        }, function (err) {
          if(err) {
            reportLogger.error(err);
            emailService.sendEmail({ emailMessage: err });
          } else {
            simpleLogger.info('Report generated.')
          }
        });
      }
    });
  const newReport = Report({ name: pdfName, employeeId: data.employee._id });
  await newReport.save();
}

module.exports = { generateReport }