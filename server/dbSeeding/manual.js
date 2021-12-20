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
    simpleLogger.info('Connect to database');
    dbConnectionLogger.info('Conneted to database');
    DBseding();
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
    dbConnectionLogger.error(`Error connecting to the database. \n${err}`);
    email.sendEmail(`Error connecting to the database. \n${err}`);
  })

async function DBseding() {
  Promise.all([seedingService.seedEmployees(), seedingService.seedTasks()])
    .then(() => {
      mongoose.connection.close();
      simpleLogger.info('Disconnect from database');
      process.exit();
    });
}
