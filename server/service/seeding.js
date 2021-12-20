const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { simpleLogger } = require('../logger/logger');
const config = require('../constants/seeding');
const faker = require('faker');
const moment = require('moment');
const Promise = require('bluebird');


async function seedEmployees() {
  let employees = [];
  for (let i = 0; i < config.EMPLOYEES_COUNT; i++) {
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
  const taskArr = [];
  for (let i = 0; i < config.TASKS_COUNT; i++) {
    const deadline = moment(faker.date.soon()).format('YYYY-MM-DD')
    const newTask = {
      name: faker.lorem.word(),
      deadline,
      completed: false,
      employee: null
    }
    taskArr.push(newTask);
  }
  const count = await Employee.count();
  Promise.each(taskArr, function (task) {
    return (async function () {
      const rand = Math.floor(Math.random() * count);
      const employee = await Employee.findOne().skip(rand);
      task.employee = employee._id;
    });
  }).then(function (tasks) {
    Task.insertMany(tasks);
    simpleLogger.info('Tasks collection filled.')
  });
}
module.exports = { seedEmployees, seedTasks }