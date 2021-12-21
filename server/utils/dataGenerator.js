const faker = require('faker');
const moment = require('moment');

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

function createTask(employeeId) {
  const deadline = moment(faker.date.soon()).format('YYYY-MM-DD')
  const newTask = {
    name: faker.lorem.word(),
    deadline,
    completed: false,
    employee: employeeId
  }
  return newTask;
}
module.exports = { createEmployee, createTask };