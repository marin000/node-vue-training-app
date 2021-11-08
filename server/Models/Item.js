const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ItemShema = new Schema({
    name: String,
    createdAt: Date
});
module.exports = mongoose.model('Item', ItemShema);
