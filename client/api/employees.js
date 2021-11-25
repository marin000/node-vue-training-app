import axios from "axios";

const url = '/api/employees';

function getEmployees() {
  return axios.get(url)
}

function deleteEmployee(id) {
  return axios.delete(`${url}/${id}`)
}

function addNewEmployee(employee) {
  return axios.post(url, employee)
}

function getTasks(id) {
  return axios.get(`${url}/${id}`)
}

function createTask(id, task) {
  return axios.post(`${url}/${id}`, task)
}

function deleteTask(employeeId, taskId) {
  return axios.delete(`${url}/${employeeId}/${taskId}`)
}

function setCompletion(employeeId, taskId, completed) {
  return axios.put(`${url}/${employeeId}/${taskId}`, { completed: completed })
}

export default {
  getEmployees,
  deleteEmployee,
  addNewEmployee,
  getTasks,
  createTask,
  deleteTask,
  setCompletion
}