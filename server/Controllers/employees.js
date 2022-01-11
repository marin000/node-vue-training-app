const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { validationResult } = require('express-validator');
const { employeeLogger, taskLogger } = require('../logger/logger');
const infoMessage = require('../constants/infoMessages');
const emailService = require('../service/email');
const fs = require('fs');
const report = require('../constants/report');

function deleteEmployeeDir(employeeId) {
  const options = { recursive: true, force: true };
  fs.rmSync(`${report.REPORTS_PATH}/${employeeId}`, options);
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const newEmployee = Employee(req.body);
    await newEmployee.save();
    employeeLogger.info(infoMessage.NEW_EMPLOYEE);
    res.status(201).send(newEmployee);
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
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
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

async function deleteEmployee(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const employeeId = req.params.id;
    deleteEmployeeDir(employeeId);
    await Task.deleteMany({ employee: employeeId });
    await Employee.findByIdAndDelete(employeeId);
    employeeLogger.info(infoMessage.DELETE_EMPLOYEE);
    res.status(204).send();
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

async function createTask(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
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
    emailService.sendEmail({ emailMessage: error.message });
    return next(error);
  }
}

async function deleteTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const task = await Task.findById(req.params.taskId);
    const employee = await Employee.findById(task.employee);
    const index = employee.tasks.indexOf(task._id);
    employee.tasks.splice(index, 1);
    await Employee.findByIdAndUpdate( employee._id, { tasks: employee.tasks });
    await Task.findByIdAndDelete(task._id);
    taskLogger.info(infoMessage.DELETE_TASK);
    res.status(204).send();
  } catch (error) {
    taskLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

async function updateTask(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      taskLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
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
    emailService.sendEmail({ emailMessage: error.message });
    res.status(500).send(error.message);
  }
}

async function getEmployeeTasks(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      employeeLogger.error(errors);
      emailService.sendEmail({ emailMessage: JSON.stringify(errors.array()) });
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const tasks = await Task.find({ employee: req.params.id });
    employeeLogger.info(infoMessage.GET_TASKS);
    res.json(tasks);
  } catch (error) {
    employeeLogger.error(error.message, { metadata: error.stack });
    emailService.sendEmail({ emailMessage: error.message });
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