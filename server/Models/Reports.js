const mongoose = require('mongoose');
const report = require('../constants/report');

const ReportsShema = new mongoose.Schema({
  name: String,
  employeeId: String
}, { timestamps: true }
);

ReportsShema.virtual('path').get(function() {
  return (`${report.REPORTS_PATH}/${this.employeeId}/${this.name}`);
});

module.exports = mongoose.model('Reports', ReportsShema); 