const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { validationResult } = require('express-validator');
const { employeeLogger, taskLogger } = require('../logger/logger');

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      employeeLogger.error(errors);
      return;
    }
    const newEmployee = Employee(req.body);
    await newEmployee.save();
    employeeLogger.info('New employee created');
    res.status(201).send(newEmployee);
  } catch (error) {
    employeeLogger.error(error.message);
    return next(error);
  }
}

async function fetch(req, res) {
  try {
    const data = await Employee.find({});
    employeeLogger.info('Successfully get all employees');
    res.json(data);
  } catch (error) {
    employeeLogger.error(error.message);
    res.status(500).send(error.message);
  }
}

async function deleteEmployee(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      employeeLogger.error(errors);
      return;
    }
    await Task.deleteMany({ employee: req.params.id });
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send('Employee deleted successfully');
    employeeLogger.info('Employee deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
    employeeLogger.error(error.message);
  }
}

async function createTask(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      taskLogger.error(errors);
      return;
    }
    const newTask = Task(req.body);
    newTask.employee = req.params.id;
    await newTask.save();
    res.status(201).send(newTask);
    taskLogger.info('New task created');
  } catch (error) {
    taskLogger.error(error.message);
    return next(error);
  }
}

async function deleteTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      taskLogger.error(errors);
      return;
    }
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(204).send('Task deleted successfully.');
    taskLogger.info('Task deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
    taskLogger.error(error.message);
  }
}

async function updateTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      taskLogger.error(errors);
      return;
    }
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId, { completed });
    res.json(updatedTask);
    taskLogger.info('Task updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
    taskLogger.error(error.message);
  }
}

async function getEmployeeTasks(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      employeeLogger.error(errors);
      return;
    }
    const tasks = await Task.find({ employee: req.params.id });
    res.json(tasks);
    employeeLogger.info('Get employee tasks successfully');
  } catch (error) {
    res.status(500).send(error.message);
    employeeLogger.error(error.message);
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