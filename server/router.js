const express = require("express");
const itemController = require('./Controllers/items');
const employeesController = require('./Controllers/employees');
const logsController = require('./Controllers/logs');
const reportController = require('./Controllers/reports');
const employeesValidator = require('./validators/employeesValidator');
const loggerValidator = require('./validators/loggerValidator');
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
  employeesValidator.validate('validateEmployee'),
  employeesController.deleteEmployee);

router.post(
  '/employees/:id',
  employeesValidator.validate('createTask'),
  employeesController.createTask);

router.delete(
  '/employees/:id/:taskId',
  employeesValidator.validate('validateMongoIdAndEmployee'),
  employeesController.deleteTask);

router.put(
  '/employees/:id/:taskId',
  employeesValidator.validate('validateMongoIdAndEmployee'),
  employeesController.updateTask);

router.get(
  '/employees/:id',
  employeesValidator.validate('validateEmployee'),
  employeesController.getEmployeeTasks);

router.post('/logs',
  loggerValidator.validate('logValidate'),
  logsController.getLogs);

router.post('/report/employee', reportController.employeeReport); 
  
module.exports = router;
