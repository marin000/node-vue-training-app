<template>
  <div class="addEmployee"><AddEmployeeForm /></div>
  <div class="employees"><Employees /></div>
</template>

<script>
import Employees from './Employees.vue'
import AddEmployeeForm from './AddEmployeeForm.vue'

export default {
  components: {
    Employees,
    AddEmployeeForm
  }
}
</script>

<style>

</style>