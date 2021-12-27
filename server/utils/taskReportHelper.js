const report = require('../constants/report');

function taskReportHelp(employee, tasks, date) {
  const pdfName = employee.name.replace(' ', '-')
    .toLowerCase() + `-${date}.pdf`;
  const employeeReportDir = `${report.REPORTS_PATH}/${employee._id}`;
  const data = {
    employee,
    tasks,
    date
  };
  return { data, employeeReportDir, pdfName };
}

module.exports = { taskReportHelp }