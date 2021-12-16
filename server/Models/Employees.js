const mongoose = require('mongoose');

const EmployeesShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Employee must have a name!"
  },
  email: String,
  phone: String,
  age: Number,
  pet: String
}, {timestamps: true }
);

module.exports = mongoose.model('Employees', EmployeesShema); 