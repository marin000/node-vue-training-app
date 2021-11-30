import axios from "axios";

const url = '/api/employees';

const getEmployees = () => axios.get(url);

const deleteEmployee = (id) => axios.delete(`${url}/${id}`);

const addNewEmployee = (employee) => axios.post(url, employee);

const getTasks = (id) => axios.get(`${url}/${id}`);

const createTask = (id, task) => axios.post(`${url}/${id}`, task);

const deleteTask = (employeeId, taskId) => 
  axios.delete(`${url}/${employeeId}/${taskId}`);

const setCompletion = (employeeId, taskId, completed) => 
  axios.put(`${url}/${employeeId}/${taskId}`, { completed: completed });

export default {
  getEmployees,
  deleteEmployee,
  addNewEmployee,
  getTasks,
  createTask,
  deleteTask,
  setCompletion
}