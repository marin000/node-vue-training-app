const express = require("express");
const mongoose = require("mongoose");
const url = process.env.DB_URL;
const itemController = require('./Controllers/items');
const router = express.Router();
require('dotenv').config()

const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
	.then(() => {
		console.log('Connected to database ')
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	})

router.get('/item', itemController.fetch)
router.post('/item', itemController.create)

module.exports = router;
