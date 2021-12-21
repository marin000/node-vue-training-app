const seedingService = require('../service/seeding');
const mongoose = require('mongoose');
const { simpleLogger } = require('../logger/logger');
const email = require('../service/email');

function seed() {
  mongoose.connection.db.collection('employees').count(function (err, count) {
    if (err) {
      simpleLogger.error(err);
      email.sendEmail(err);
    }
    else if (count === 0) {
      seedingService.seedEmployees();
    }
  });

  mongoose.connection.db.collection('tasks').count(function (err, count) {
    if (err) {
      simpleLogger.error(err);
      email.sendEmail(err);
    }
    else if (count === 0) {
      seedingService.seedTasks();
    }
  });
}
module.exports = { seed }