const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { simpleLogger } = require('../logger/logger');
const infoMessages = require('../constants/infoMessages');
const randNumber = require('../utils/getRandomNumber');
const createData = require('../utils/createNewData');
const [ EMPLOYEES_COUNT, TASKS_MIN, TASKS_MAX ] = [ 100, 1, 4];

async function seedEmployees() {
  const employees = [];
  for (let i = 0; i < EMPLOYEES_COUNT; i++) {
    const newEmployee = createData.createEmployee();
    employees.push(newEmployee);
  }
  await Employee.insertMany(employees);
  simpleLogger.info(infoMessages.EMPLOYEES_FILLED);
}

async function seedTasks() {
  const employeesIdArr = await Employee.find().distinct('_id');
  const taskArr = [];
  employeesIdArr.forEach(employeeId => {
    const randTaskNum = randNumber.getRandomNumber(TASKS_MIN, TASKS_MAX);
    for (let i = 0; i < randTaskNum; i++) {
      const newTask = createData.createTask(employeeId);
      taskArr.push(newTask);
    }
  });
  await Task.insertMany(taskArr);
  simpleLogger.info(infoMessages.TASKS_FILLED);
}
module.exports = { seedEmployees, seedTasks }