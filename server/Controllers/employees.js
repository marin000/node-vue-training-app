const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { validationResult } = require('express-validator');

async function create(req, res, next) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const newEmployee = Employee(req.body);
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    return next(error);
  }
}

async function fetch(req, res) {
  try {
    const data = await Employee.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteEmployee(req, res) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    await Task.deleteMany({ employee: req.params.id });
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).send("Employee deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createTask(req, res, next) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const newTask = Task(req.body);
    newTask.employee = req.params.id;
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    return next(error);
  }
}

async function deleteTask(req, res) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(204).send("Task deleted successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateTask(req, res) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const { completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId, { completed });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getEmployeeTasks(req, res) {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      res.status(403).json({ errors: errors.array() });
      return;
    }
    const tasks = await Task.find({ employee: req.params.id });
    res.json(tasks);
  } catch (error) {
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
  getEmployeeTasks }