import axios from "axios";

function getItems() {
  return axios.get("/api/item")
}
export default {
  getItems
}