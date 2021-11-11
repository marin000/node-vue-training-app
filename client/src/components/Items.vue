<template>
  <h1>Items</h1>
  <div v-if="err">
    {{ err }}
  </div>
  <div v-else>
    <div v-if="items.length">
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
            <td>{{ formatDate(item.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading items...</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import api from "../../api/items";

export default {
  data() {
    return {
      items: [],
      err: null,
    };
  },
  mounted() {
    api.getItems()
      .then((result) => (this.items = result.data))
      .catch((err) => (this.err = err));
  },
  methods: {
    formatDate(value) {
      return moment(value).format("ddd MMM DD, YYYY [at] HH:mm a");
    },
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

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>