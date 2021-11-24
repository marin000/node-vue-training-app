import axios from "axios";

const url = '/api/employees';

function getEmployees() {
  return axios.get(url)
}

function deleteEmployee(id) {
  return axios.delete(`${url}/${id}`)
}

function addNewEmployee(name) {
  return axios.post(url, {name: name})
}

function getTasks(id) {
  return axios.get(`${url}/${id}`)
}

function createTask(id, task, taskDate) {
  return axios.post(`${url}/${id}`, { name: task, deadline: taskDate, completed: false})
}

function deleteTask(employeeId, taskId) {
  return axios.delete(`${url}/${employeeId}/${taskId}`)
}

function updateTask(employeeId, taskId, completed) {
  return axios.put(`${url}/${employeeId}/${taskId}`, { completed: completed })
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