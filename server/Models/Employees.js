const mongoose = require('mongoose');

const EmployeesShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Employee must have a name!"
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/, 
    'Please fill a valid email address']
  },
  phone: String,
  age: Number,
  pet: String
}, {timestamps: true }
);

module.exports = mongoose.model('Employees', EmployeesShema); 