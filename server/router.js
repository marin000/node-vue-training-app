const express = require("express");
const itemController = require('./Controllers/items');
const employeesController = require('./Controllers/employees');
const router = express.Router();

router.get('/item', itemController.fetch)
router.post('/item', itemController.create)

router.post('/employees', employeesController.create)
router.get('/employees', employeesController.fetch)
router.delete('/employees/:id', employeesController.deleteEmployee)
router.post('/employees/:id', employeesController.createTask)
router.delete('/employees/:id/:taskId', employeesController.deleteTask)
router.put('/employees/:id/:taskId', employeesController.updateTask)
router.get('/employees/:id', employeesController.getEmployeeTasks)

module.exports = router;
