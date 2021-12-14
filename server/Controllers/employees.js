const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { validationResult } = require('express-validator');
const { employeeLogger, taskLogger } = require('../logger/logger');
const infoMessage = require('../constants/infoMessages');

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const newEmployee = Employee(req.body);
    await newEmployee.save();
    employeeLogger.info(infoMessage.NEW_EMPLOYEE);
    res.status(201).send(newEmployee);
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    return next(error);
  }
}

async function fetch(req, res) {
  try {
    const data = await Employee.find({});
    employeeLogger.info(infoMessage.GET_EMPLOYEES);
    res.json(data);
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    res.status(500).send(error.message);
  }
}

async function deleteEmployee(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    await Task.deleteMany({ employee: req.params.id });
    await Employee.findByIdAndDelete(req.params.id);
    employeeLogger.info(infoMessage.DELETE_EMPLOYEE);
    res.status(204).send('Employee deleted successfully');
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    res.status(500).send(error.message);
  }
}

async function createTask(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const newTask = Task(req.body);
    newTask.employee = req.params.id;
    await newTask.save();
    taskLogger.info(infoMessage.NEW_TASK);
    res.status(201).send(newTask);
  } catch (error) {
    taskLogger.error(error.message, { metadata: error.stack });
    return next(error);
  }
}

async function deleteTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    await Task.findByIdAndDelete(req.params.taskId);
    taskLogger.info(infoMessage.DELETE_TASK);
    res.status(204).send('Task deleted successfully.');
  } catch (error) {
    taskLogger.error(error.message, { metadata: error.stack });
    res.status(500).send(error.message);
  }
}

async function updateTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId, { completed });
    taskLogger.info(infoMessage.UPDATE_TASK);
    res.json(updatedTask);
  } catch (error) {
    taskLogger.error(error.message, { metadata: error.stack });
    res.status(500).send(error.message);
  }
}

async function getEmployeeTasks(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const tasks = await Task.find({ employee: req.params.id });
    employeeLogger.info(infoMessage.GET_TASKS);
    res.json(tasks);
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    res.status(500).send(error.message);
  }
}

module.exports = {
  create,
  fetch,
  deleteEmployee,
  createTask,
  deleteTask,
  updateTask,
  getEmployeeTasks
}