import axios from "axios";

async function getItems() {
  return await axios.get("/api/item")
    .then(result => result.data)
}
export default {
  getItems
}