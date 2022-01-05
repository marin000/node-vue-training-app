const ejs = require('ejs');
const fs = require('fs');
const Promise = require('bluebird');
const Report = require('../Models/Reports');
const report = require('../constants/report');
const { simpleLogger } = require('../logger/logger');
const wkhtmltopdf = Promise.promisify(require('wkhtmltopdf'));

async function generateReport({ data, template, reportDir, pdfName }) {
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  const filePath = `${reportDir}/${pdfName}`;
  const html = await ejs.renderFile(template, data, { async: true });
  await wkhtmltopdf(html, { output: filePath, pageSize: 'a4' });
  const reportPath = `${report.REPORTS_PATH}/${data.employee._id}/${pdfName}`;
  const newReport = Report({ path: reportPath });
  await newReport.save();
  simpleLogger.info('Report generated.')
}

module.exports = { generateReport }