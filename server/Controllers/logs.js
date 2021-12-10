const Log = require('../Models/Logs');
const { validationResult } = require('express-validator');
const { logsLogger } = require('../logger/logger');

async function getLogs(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      logsLogger.error(errors);
      return;
    }
    let sortOrder = 1;
    if (req.body.sort === 'desc') {
      sortOrder = -1;
    }
    const { level, message } = req.body;
    const data = await Log.find({$or:[{ level }, { message }]})
      .sort({ timestamp: sortOrder }).limit(req.body.count);
    logsLogger.info('Successfully get all logs');
    res.json(data);
  } catch (error) {
    logsLogger.error(error.message);
    res.status(500).send(error.message);
  }
}
module.exports = { getLogs };