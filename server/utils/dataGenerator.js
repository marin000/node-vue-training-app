const faker = require('faker');
const dayjs = require('dayjs');
const Task = require('../Models/Tasks');

function createEmployee() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const newEmployee = {
    name: firstName + ' ' + lastName,
    email: faker.internet.email(firstName, lastName),
    phone: faker.phone.phoneNumber(),
    age: faker.datatype.number(65),
    pet: faker.animal.cat()
  }
  return newEmployee;
}

async function createTask(employeeId) {
  const deadline = dayjs(faker.date.soon()).format('YYYY-MM-DD')
  const newTask = Task({
    name: faker.lorem.word(),
    deadline,
    completed: false,
    employee: employeeId
  });
  await newTask.save();
  
}
module.exports = { createEmployee, createTask };