<template>
  <div style="max-width: 300px;">
    <va-select 
    class="mb-4" 
    label="Select employee" 
    v-model="value" 
    :options="employees" 
    track-by="_id" 
    text-by="name"
    @click="selectEmployee(value._id)" />
  </div>
</template>

<script>
import api from '../../../api/employees'

export default {
  name: "Employee",
  data() {
    return {
      employees: [],
      err: null,
      value: ''
    }
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
    selectEmployee(id) {
      this.$emit("employeeSelected",id);
    }
  }
}
</script>

<style>

</style>