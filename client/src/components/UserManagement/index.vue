<template>
  <AddEmployeeForm class="addEmployee" @employeeAdded="refreshEmployees"/>
  <Employee ref="Employee"/>
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
      this.$refs.Employee.fetchEmployees();
    }
  }
}
</script>

<style>
.addEmployee {
  margin-top: 30px;
}
</style>