// index.js
/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./docs/options-config');
const { dbConnectionLogger, simpleLogger } = require('./logger/logger');
const emailService = require('./service/email');
const config = require('./config/index');
const seedingService= require('./dbSeeding/automatic');
const dbMessages = require('./constants/dbMessages');
const cronjob = require('./cronjobs/report');
require('dotenv').config()

const specs = swaggerJsDoc(swaggerOptions.options);

const app = express();
const port = config.port;
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
const router = require('./router');
app.use(express.json());
app.use(router);
app.use(express.static(__dirname + '/reportTemplate'));
/**
 * DB connection
 */
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const { CONNECTED, ERROR_CONNECTING } = dbMessages;
mongoose.connect(config.dbUrl, connectionParams)
  .then(() => {
    seedingService.seed();
    simpleLogger.info(CONNECTED);
    dbConnectionLogger.info(CONNECTED);
  })
  .catch((err) => {
    console.error(ERROR_CONNECTING + `\n${err}`);
    dbConnectionLogger.error(ERROR_CONNECTING  + `\n${err}`);
    emailService.sendEmail(ERROR_CONNECTING + `\n${err}`);
  })

/**
 * Cronjobs
 */
cronjob.sendReport();
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});