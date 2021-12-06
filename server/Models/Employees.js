const mongoose = require('mongoose');

var EmployeesShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Employee must have a name!"
  }
}, {timestamps: true }
);

module.exports = mongoose.model('Employees', EmployeesShema); 