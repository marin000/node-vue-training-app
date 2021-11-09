<template>
  <h1>Items</h1>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Created at</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item._id">
        <td>{{ item.name }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    axios
      .get("/api/item")
      .then((result) => (this.items = result.data))
      .catch((err) => console.log(err.message));
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>