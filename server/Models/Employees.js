const mongoose = require('mongoose');

var EmployeesShema = new mongoose.Schema({
  name: {
    type: String,
    required: "Employee must have a name!"
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tasks"
    }
  ]
});

module.exports = mongoose.model('Employees', EmployeesShema); 