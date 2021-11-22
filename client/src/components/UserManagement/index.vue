<template>
  <div class="addEmployee"><AddEmployeeForm @handleSubmit="refreshEmployees"/></div>
  <div class="employees"><Employees :fetchEmployees="fetchEmployees" ref="refreshEmployees"/></div>
</template>

<script>
import Employees from './Employees.vue'
import AddEmployeeForm from './AddEmployeeForm.vue'

export default {
  components: {
    Employees,
    AddEmployeeForm
  },
  methods: {
    refreshEmployees() {
      this.$refs.refreshEmployees.fetchEmployees();
    }
  }
}
</script>

<style>

</style>