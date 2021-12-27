const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { simpleLogger } = require('../logger/logger');
const infoMessages = require('../constants/infoMessages');
const randNumber = require('../utils/getRandomNumber');
const dataGenerator = require('../utils/dataGenerator');
const [ EMPLOYEES_COUNT, TASKS_MIN, TASKS_MAX ] = [ 100, 1, 4];

async function seedEmployees() {
  const employees = [];
  for (let i = 0; i < EMPLOYEES_COUNT; i++) {
    const newEmployee = dataGenerator.createEmployee();
    employees.push(newEmployee);
  }
  await Employee.insertMany(employees);
  simpleLogger.info(infoMessages.EMPLOYEES_FILLED);
}

async function seedTasks() {
  const employeesIds = await Employee.find().distinct('_id');
  //const tasks = [];
  employeesIds.forEach(employeeId => {
    const randTaskNum = randNumber.getRandomNumber(TASKS_MIN, TASKS_MAX);
    for (let i = 0; i < randTaskNum; i++) {
      //const newTask = 
      dataGenerator.createTask(employeeId);
      //tasks.push(newTask);
    }
  });
  //await Task.deleteMany({});
  //await Task.insertMany(tasks);
  simpleLogger.info(infoMessages.TASKS_FILLED);
}
module.exports = { seedEmployees, seedTasks }