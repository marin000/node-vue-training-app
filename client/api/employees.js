import axios from "axios";

function getEmployees() {
  return axios.get("/api/employees")
}

function deleteEmployee(id) {
  return axios.delete(`/api/employees/${id}`)
}

function addNewEmployee(name) {
  return axios.post('/api/employees', {name: name})
}
export default {
  getEmployees,
  deleteEmployee,
  addNewEmployee
}