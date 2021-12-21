const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const wkhtmltopdf = require('wkhtmltopdf');
const moment = require('moment');
const fs = require('fs');
const ejs = require('ejs');

async function employeeReport(req, res) {
  try {
    const employee = await Employee.findOne({ name: req.body.name });
    const currentDate = new Date();
    const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const tasks = await Task.find({
      employee: employee._id,
      createdAt: { $gte: yearAgo, $lte: currentDate }
    });
    const tasksCompleted = tasks.filter(task => task.completed === true);
    const today = moment().format('YYYY-MM-DD');
    const tasksExpired = tasks.filter(task => moment(today).isAfter(task.deadline));
    const pdfName = employee.name.replace(' ', '-').toLowerCase() + '-status.pdf';

    const taskInfo = {
      total: tasks.length,
      completed: tasksCompleted.length,
      expired: tasksExpired.length
    };

    ejs.renderFile('./server/reportTemplate/employee.ejs', 
      { employee: employee, taskInfo: taskInfo }, (err, file) => {
        if (err) {
          console.log(err);
        }
        if (!fs.existsSync(`./server/reports/${employee._id}`)) {
          fs.mkdirSync(`./server/reports/${employee._id}`);
        }
        wkhtmltopdf(file, {
          output: `./server/reports/${employee._id}/${pdfName}`,
          pageSize: 'letter'
        });
      });
    res.json();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { employeeReport };