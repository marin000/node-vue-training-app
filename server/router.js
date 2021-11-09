const express = require("express");
const itemController = require('./Controllers/items');
const router = express.Router();

router.get('/item', itemController.fetch)
router.post('/item', itemController.create)

module.exports = router;
