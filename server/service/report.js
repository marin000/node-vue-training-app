const fs = require('fs');
const ejs = require('ejs');
const wkhtmltopdf = require('wkhtmltopdf');
const { simpleLogger } = require('../logger/logger');
const Report = require('../Models/Reports');
const report = require('../constants/report');

function createPdf(html, filePath) {
  return new Promise((resolve, reject) => {
    wkhtmltopdf(html, { output: filePath, pageSize: 'a4' }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

async function generateReport({ data, template, reportDir, pdfName }) {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  const filePath = `${reportDir}/${pdfName}`;
  const html = await ejs.renderFile(template, data, { async: true });
  await createPdf(html, filePath);
  const reportPath = `${report.REPORTS_PATH}/${data.employee._id}/${pdfName}`;
  const newReport = Report({ path: reportPath });
  await newReport.save();
  simpleLogger.info('Report generated.')
}

module.exports = { generateReport }