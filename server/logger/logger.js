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

const dbConnectionLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'dbConnection' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    format.metadata()
  ),
  transports: [
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
  })]
});

const employeeLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'employees' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    format.metadata()
  ),
  transports: [
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
  })]
});

const taskLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'tasks' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json(),
    format.metadata()
  ),
  transports: [
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
  })]
});

module.exports = {
  dbConnectionLogger: dbConnectionLogger,
  employeeLogger: employeeLogger,
  taskLogger: taskLogger
};