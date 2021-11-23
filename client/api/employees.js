import axios from "axios";

function getEmployees() {
  return axios.get('/api/employees')
}

function deleteEmployee(id) {
  return axios.delete(`/api/employees/${id}`)
}

function addNewEmployee(name) {
  return axios.post('/api/employees', {name: name})
}

function getTasks(id) {
  return axios.get(`/api/employees/${id}`)
}

function createTask(id, task, taskDate) {
  return axios.post(`/api/employees/${id}`, { name: task, deadline: taskDate, completed: false})
}

function deleteTask(employeeId, taskId) {
  return axios.delete(`/api/employees/${employeeId}/${taskId}`)
}

function updateTask(employeeId, taskId, completed) {
  return axios.put(`/api/employees/${employeeId}/${taskId}`, { completed: completed })
}

export default {
  getEmployees,
  deleteEmployee,
  addNewEmployee,
  getTasks,
  createTask,
  deleteTask,
  updateTask
}