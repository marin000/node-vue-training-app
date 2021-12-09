const mongoose = require('mongoose');

var LogsShema = new mongoose.Schema({
  timestamp: String,
  meta: {
    component: String,
    timestamp: String
  },
  level: String,
  message: String
}, { timestamps: true }
);

module.exports = mongoose.model('Logs', LogsShema); 