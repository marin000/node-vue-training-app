const Log = require('../Models/Logs');

async function getLogs(req, res) {
  try {
    var sortOrder = 1;
    if (req.body.sort === 'desc') {
      sortOrder = -1;
    }
    const data = await Log.find({
      $or:[{ level: req.body.level }, { message: req.body.message }]})
      .sort({ timestamp: sortOrder }).limit(req.body.count);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = { getLogs };