const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');

async function employeeReport(req, res) {
  try {
    const employee = await Employee.findOne({ name: req.body.name });
    const currentDate = new Date();
    const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear()-1));
    const tasks = await Task.find({ employee: employee._id, 
      createdAt: { $gte: yearAgo, $lte: currentDate } });
    const tasksCompleted = tasks.filter(task => task.completed === true);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { employeeReport };