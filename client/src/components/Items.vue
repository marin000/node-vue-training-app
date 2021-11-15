<template>
  <h1 class="display-2">Items</h1>
  <div v-if="err">
    {{ err }}
  </div>
  <div v-else>
    <div v-if="items.length">
      <div class="va-table-responsive">
        <table class="va-table va-table--striped table-center">
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
  .va-table-responsive {
    overflow: auto;
  }

  .table-center {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }

  .display-2 {
    margin-bottom: 20px;
  }
</style>
