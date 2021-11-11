import axios from "axios";

export default {
  async getItems() {
    return await axios.get("/api/item")
      .then(result => result.data)
  }
}