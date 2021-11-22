<template>
  <div class="employees"><Employees @employeeSelected="getTasks"/></div>
  <div class="addTask"><AddTaskForm /></div>
  <div class="tasks"><Tasks :fetchTasks="fetchTasks" ref="getTasks"/></div>
</template>

<script>
import Employees from './Employees.vue'
import AddTaskForm from './AddTaskForm.vue'
import Tasks from './Tasks.vue'

export default {
  components: {
    Employees,
    AddTaskForm,
    Tasks
  },
  methods: {
    getTasks(id) {
      this.$refs.getTasks.fetchTasks(id);
    }
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