const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
require('dotenv').config()
require('winston-mongodb');

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
  }
};

const loggerFormat = combine(
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  json(),
  format.metadata()
);

const loggerTransports = [
  new transports.File({ filename: 'logMessages.log' }),
  new transports.MongoDB({
    levels: customLevels.levels,
    db : process.env.DB_URL,
    options: {
        useUnifiedTopology: true
    },
    collection: 'logs',
    format: format.combine(
    format.timestamp(),
    format.json())
})];

const dbConnectionLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'dbConnection' },
  format: loggerFormat,
  transports: loggerTransports
});

const employeeLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'employees' },
  format: loggerFormat,
  transports: loggerTransports
});

const taskLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'tasks' },
  format: loggerFormat,
  transports: loggerTransports
});

module.exports = {
  dbConnectionLogger: dbConnectionLogger,
  employeeLogger: employeeLogger,
  taskLogger: taskLogger
};