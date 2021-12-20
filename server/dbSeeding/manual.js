const seedingService = require('../service/seeding');
const mongoose = require('mongoose');
const { dbConnectionLogger, simpleLogger } = require('../logger/logger');
const email = require('../service/email');
const config = require('../config/index');
const dbMessages = require('../constants/dbMessages');
const { CONNECTED, DISCONNECTED, ERROR_CONNECTING } = dbMessages;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(config.dbUrl, connectionParams)
  .then(() => {
    simpleLogger.info(CONNECTED);
    dbConnectionLogger.info(CONNECTED);
    DBseeding();
  })
  .catch((err) => {
    console.error(ERROR_CONNECTING + `\n${err}`);
    dbConnectionLogger.error(ERROR_CONNECTING + `\n${err}`);
    email.sendEmail(ERROR_CONNECTING + `\n${err}`);
  })

async function closeMongoConnection() {
  await mongoose.connection.close();
  simpleLogger.info(DISCONNECTED);
  process.exit();
} 
  
async function DBseeding() {
  await seedingService.seedEmployees();
  await seedingService.seedTasks();
  await closeMongoConnection();
}


