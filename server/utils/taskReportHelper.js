const report = require('../constants/report');

function createTaskReportData(employee, tasks, date) {
  const pdfName = employee.name.replace(' ', '-')
    .toLowerCase() + `-${date}.pdf`;
  const employeeReportDir = `${report.REPORTS_PATH}/${employee._id}`;
  const tempContext = { employee, tasks, date };
  return { tempContext, employeeReportDir, pdfName };
}

module.exports = { createTaskReportData }