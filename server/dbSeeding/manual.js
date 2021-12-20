const seedingService = require('../service/seeding');
const mongoose = require('mongoose');
const { dbConnectionLogger, simpleLogger } = require('../logger/logger');
const email = require('../service/email');
const config = require('../config/index');

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(config.dbUrl, connectionParams)
  .then(() => {
    seedingService.seedEmployees();
    seedingService.seedTasks();
    simpleLogger.info('Connect to database');
    dbConnectionLogger.info('Conneted to database');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
    dbConnectionLogger.error(`Error connecting to the database. \n${err}`);
    email.sendEmail(`Error connecting to the database. \n${err}`);
  })