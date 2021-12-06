<template>
  <add-employee-form class="addEmployee" @employeeAdded="fetchEmployees"/>
  <employee ref="employee"/>
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
    fetchEmployees() {
      this.$refs.employee.fetchEmployees();
    }
  }
}
</script>

<style>
.addEmployee {
  margin-top: 30px;
}
</style>