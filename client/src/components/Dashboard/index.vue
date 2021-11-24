<template>
  <Employee class="dashboard-employees" @employeeSelected="getTasks"/>
  <AddTaskForm class="addTask" :employeeId="employeeId" 
              @taskAdded="refreshTasks"/>
  <div class="tasks">
    <div class="my-5">
      <va-divider />
    </div>
    <Task ref="Task"
          :employeeId="employeeId"
          @taskDeleted="refreshTasks"
          @taskCompleted="refreshTasks" />
  </div>
</template>

<script>
import Employee from './Employee.vue'
import AddTaskForm from './AddTaskForm.vue'
import Task from './Task.vue'

export default {
  components: {
    Employee,
    AddTaskForm,
    Task
  },
  data() {
    return {
      employeeId: ''
    }
  },

  methods: {
    getTasks(id) {
      this.employeeId = id;
      this.$refs.Task.fetchTasks(this.employeeId);
    },
    refreshTasks() {
      this.$refs.Task.fetchTasks(this.employeeId);
    }
  }
}
</script>

<style>
.dashboard-employees {
  float: left;
  margin-right: 30px;
  margin-left: 20px;
}

.addTask {
  float: left;
}

.tasks {
  clear: both;
}


</style>