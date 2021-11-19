<template>
  <div class="employees"><Employees /></div>
  <div class="addTask"><AddTaskForm /></div>
</template>

<script>
import Employees from './Employees.vue'
import AddTaskForm from './AddTaskForm.vue'

export default {
  components: {
    Employees,
    AddTaskForm
  }
}
</script>

<style>
.employees {
  float: left;
  width: 20%;
}

.addTask {
  float: left;
  width: 70%;
}
</style>