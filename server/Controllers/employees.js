const Employees = require('../Models/Employees');
const Tasks = require('../Models/Tasks');

async function create(req, res) {
	try {
    const newEmployee = Employees(req.body);
		await newEmployee.save();
		res.status(201).send(newEmployee);
	} catch (error) {
		res.status(400).send(error);
	}
}

async function fetch(req, res) {
	try {
		const data = await Employees.find({});
		res.json(data);
	} catch (error) {
		res.status(404).send(error);
	}
}

async function deleteEmployee(req, res) {
  try {
    await Employees.findByIdAndDelete(req.params.id);
    res.status(200).send("Employee deleted successfully");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createTask(req, res) {
  try {
    const newTask = Tasks(req.body);
    newTask.employee = req.params.id;
    const savedTask = await newTask.save();
    await Employees.findByIdAndUpdate(req.params.id,
      { $push: { tasks: savedTask._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).send(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function deleteTask(req, res) {
  try {
    await Employees.findByIdAndUpdate(req.params.id,
      { $pull: { tasks: req.params.taskId } },
      { new: true, useFindAndModify: false }
    );
    await Tasks.findByIdAndDelete(req.params.taskId);
    res.status(200).send("Task deleted successfully.");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function updateTask(req, res) {
  try {
    await Tasks.findByIdAndUpdate(req.params.taskId, { completed: true });
    res.status(200).send("Task updated successfully.");
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getOneEmployee(req, res) {
  try {
    const employee = await Employees.findById(req.params.id).populate("tasks");
    res.json(employee);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = { create, fetch, deleteEmployee, createTask, deleteTask, updateTask, getOneEmployee }