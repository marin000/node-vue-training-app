const Item = require("../Models/Item");

async function create(req, res) {
	try {
    const newItem = Item(req.body);
		newItem.save();
		res.status(201).send(newItem);
	} catch (error) {
		res.status(400).send(error);
	}
}

async function fetch(req, res) {
	try {
		const data = await Item.find({});
		await res.json(data);
	} catch (error) {
		res.status(404).send(error);
	}
}
module.exports = { create, fetch }
