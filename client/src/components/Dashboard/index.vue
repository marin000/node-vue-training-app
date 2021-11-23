<template>
  <div class="dashboard-employees"><Employee @employeeSelected="getTasks"/></div>
  <div class="addTask">
    <AddTaskForm :employeeId="employeeId" 
                  @taskAdded="refreshTasks"/>
  </div>
  <div class="tasks">
    <div class="my-5">
      <va-divider />
    </div>
    <Task :fetchTasks="fetchTasks" ref="getTasks"
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
      this.$refs.getTasks.fetchTasks(this.employeeId);
    },
    refreshTasks() {
      this.$refs.getTasks.fetchTasks(this.employeeId);
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