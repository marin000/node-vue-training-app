const fs = require('fs');
const ejs = require('ejs');
const wkhtmltopdf = require('wkhtmltopdf');

async function generateReport(data, template, reportDir, pdfName) {
  const html = await ejs.renderFile(template, data, { async: true });
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  wkhtmltopdf(html, {
    output: `${reportDir}/${pdfName}`,
    pageSize: 'letter'
  });
}

module.exports = { generateReport }