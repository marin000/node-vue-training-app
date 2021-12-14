const Log = require('../Models/Logs');
const { validationResult } = require('express-validator');
const { logsLogger } = require('../logger/logger');
const infoMessage = require('../constants/infoMessages');

async function getLogs(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logsLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const SortOrder = {
      asc: 1,
      desc: -1
    };
    const { level, message, count, sort } = req.body;
    const ascSort = 'asc';
    const sortType = sort === ascSort;

    const data = await Log.find({$or:[{ level }, { message }]})
      .sort({ timestamp: sortType ? SortOrder.asc : SortOrder.desc })
      .limit(count);
    logsLogger.info(infoMessage.GET_LOGS);
    res.json(data);
  } catch (error) {
    logsLogger.error(error.message);
    res.status(500).send(error.message);
  }
}
module.exports = { getLogs };