<template>
  <div class="addEmployee"><AddEmployeeForm @handleSubmit="refreshEmployees"/></div>
  <div class="employees"><Employee :fetchEmployees="fetchEmployees" ref="refreshEmployees"/></div>
</template>

<script>
import Employee from './Employee.vue'
import AddEmployeeForm from './AddEmployeeForm.vue'

export default {
  components: {
    Employee,
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
.addEmployee {
  margin-top: 30px;
}
</style>