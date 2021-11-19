<template>
  <div class="va-table-responsive">
    <table class="va-table">
      <tbody>
      <tr v-for="employee in employees" :key="employee._id">
        <td>{{employee.name}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../../api/employees'

export default {
  name: "Employees",
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
    }
  }
}
</script>

<style>

</style>