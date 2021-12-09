const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

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

const employeeLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'employees' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.File({ filename: 'logMessages.log' })
  ]
});
const taskLogger = createLogger({
  levels: customLevels.levels,
  defaultMeta: { component: 'tasks' },
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    json()
  ),
  transports: [
    new transports.File({ filename: 'logMessages.log' })
  ]
});

module.exports = {
  employeeLogger: employeeLogger,
  taskLogger: taskLogger
};