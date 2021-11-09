const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemShema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('Item', ItemShema);