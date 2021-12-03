const express = require("express");
const itemController = require('./Controllers/items');
const employeesController = require('./Controllers/employees');
const employeesValidator = require('./validators/employeesValidator');
const router = express.Router();

router.get('/item', itemController.fetch)
router.post('/item', itemController.create)

router.post(
  '/employees', 
  employeesValidator.validate('create'),
  employeesController.create);

router.get('/employees', employeesController.fetch);
router.delete(
  '/employees/:id', 
  employeesValidator.validate('deleteEmployee'),
  employeesController.deleteEmployee);

router.post(
  '/employees/:id', 
  employeesValidator.validate('createTask'),
  employeesController.createTask);

router.delete(
  '/employees/:id/:taskId', 
  employeesValidator.validate('deleteTask'),
  employeesController.deleteTask);

router.put(
  '/employees/:id/:taskId', 
  employeesValidator.validate('updateTask'),
  employeesController.updateTask);

router.get(
  '/employees/:id', 
  employeesValidator.validate('getEmployeeTasks'),
  employeesController.getEmployeeTasks);

module.exports = router;
