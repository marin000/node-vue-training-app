const express = require("express");
const app = express();
const Item = require("../Models/Item");
app.use(express.json())

function create(req, res) {
	console.log(req.body);
	var newItem = Item(req.body);
   newItem.save(function (err, data) {
		if (err) {
			res.status(400).send(err);
		}
		else {
			res.status(201).send(data);
		}
	}
	)
}

function fetch(req, res) {
	Item.find({}, function (err, data) {
		if (err) {
			res.status(404).send(err);
		} else {
			res.json(data);
		}
	});
}
module.exports = { create, fetch }
