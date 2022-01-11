const mongoose = require('mongoose');

const ReportsShema = new mongoose.Schema({
  path: String,
}, { timestamps: true }
);

module.exports = mongoose.model('Reports', ReportsShema); 