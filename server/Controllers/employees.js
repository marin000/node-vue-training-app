const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');

async function create(req, res) {
  try {
    const newEmployee = Employee(req.body);
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function fetch(req, res) {
  try {
    const data = await Employee.find({});
    res.json(data);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deleteEmployee(req, res) {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ employee: req.params.id });
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createTask(req, res) {
  try {
    const newTask = Task(req.body);
    newTask.employee = req.params.id;
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).send("Task deleted successfully.");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function updateTask(req, res) {
  try {
    await Task.findByIdAndUpdate(req.params.taskId, { completed: req.body.completed });
    res.status(200).send("Task updated successfully.");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getEmployeeTasks(req, res) {
  try {
    const tasks = await Task.find({ employee: req.params.id });
    res.json(tasks);
  } catch (error) {
    res.status(404).send(error);
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