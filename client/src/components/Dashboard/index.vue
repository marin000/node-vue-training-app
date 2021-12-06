<template>
  <employees-dropdown class="dashboard-employees" @employeeSelected="getTasks"/>
  <add-task-form 
    @taskAdded="refreshTasks"
    :employeeId="employeeId"
    class="addTask" />
  <div class="tasks">
    <div class="my-5">
      <va-divider />
    </div>
    <Task ref="task"
          :employeeId="employeeId"
          @taskDeleted="refreshTasks"
          @taskCompleted="refreshTasks" />
  </div>
</template>

<script>
import EmployeesDropdown from './EmployeesDropdown.vue'
import AddTaskForm from './AddTaskForm.vue'
import Task from './Task.vue'

export default {
  components: {
    EmployeesDropdown,
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
      this.refreshTasks();
    },
    refreshTasks() {
      this.$refs.task.fetchTasks(this.employeeId);
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