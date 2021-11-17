import axios from "axios";

function getEmployees() {
  return axios.get("/api/employees")
}
export default {
  getEmployees
}