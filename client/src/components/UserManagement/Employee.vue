<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--striped employees-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="employee in employees" :key="employee._id">
        <td>{{employee.name}}</td>
        <td><va-button @click="deleteHandler(employee._id)" size="small" color="danger" class="mr-4">Delete</va-button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../../../api/employees";

export default {
  name: "Employee",
  data() {
    return {
      employees: [],
      err: null,
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      api.getEmployees()
      .then((result) => (this.employees = result.data))
      .catch((err) => (this.err = err));
    },

    deleteHandler(id) {
      api.deleteEmployee(id)
      .then(() => { this.fetchEmployees(); })
      .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.employees-table {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.va-table-responsive {
    overflow: auto;
}

</style>