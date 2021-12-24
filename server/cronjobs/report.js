const cron = require('node-cron');
const emailService = require('../service/email');
const emailDefault = require('../constants/email');
const { CRONJOB_MESSAGE, CRONJOB_SUBJECT } = emailDefault;
const reportService = require('../service/report');
const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');


function sendReport() {
  cron.schedule('0 3 * * *', async () => {
    const employees = await Employee.find();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    
  });
}

module.exports = { sendReport }