const Employee = require('../Models/Employees');
const Task = require('../Models/Tasks');
const { simpleLogger } = require('../logger/logger');
const faker = require('faker');
const moment = require('moment');

async function employees() {
  let employees = [];
  for (let i = 0; i < 100; i++) {
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

async function tasks() {
  let tasks = [];
  for (let i = 0; i < 100; i++) {
    const count = await Employee.count();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);
    const deadline = moment(faker.date.soon()).format('YYYY-MM-DD')
    const newTask = {
      name: faker.lorem.word(),
      deadline,
      completed: false,
      employee: employee._id
    }
    tasks.push(newTask);
  }
  await Task.insertMany(tasks);
  simpleLogger.info('Tasks collection filled.')
}
module.exports = { employees, tasks }