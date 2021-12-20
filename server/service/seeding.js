const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { simpleLogger } = require('../logger/logger');
const seedindConst = require('../constants/seeding');
const faker = require('faker');
const moment = require('moment');
const { EMPLOYEES_COUNT, TASKS_MIN, TASKS_MAX} = seedindConst;

async function seedEmployees() {
  let employees = [];
  for (let i = 0; i < EMPLOYEES_COUNT; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const newEmployee = {
      name: firstName + ' ' + lastName,
      email: faker.internet.email(firstName, lastName),
      phone: faker.phone.phoneNumber(),
      age: faker.datatype.number(65),
      pet: faker.animal.cat()
    }
    employees.push(newEmployee);
  }
  await Employee.insertMany(employees);
  simpleLogger.info('Employees collection filled.')
}

async function seedTasks() {
  const employeesIdArr = await Employee.find().distinct('_id');
  const taskArr = [];
  employeesIdArr.forEach(employeeId => {
    let randTaskNum = Math.random() * (TASKS_MAX - TASKS_MIN) + TASKS_MIN;
    for (let i = 0; i < randTaskNum; i++) {
      const deadline = moment(faker.date.soon()).format('YYYY-MM-DD')
      const newTask = {
        name: faker.lorem.word(),
        deadline,
        completed: false,
        employee: employeeId
      }
      taskArr.push(newTask);
    }
  });
  await Task.insertMany(taskArr);
  simpleLogger.info('Tasks collection filled.');
}
module.exports = { seedEmployees, seedTasks }