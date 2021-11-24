<template>
    <form @submit.prevent="addTask" class="task-form">
      <div class="task-input">
        <va-input
          class="mb-4"
          v-model="task"
          label="Task name"
        />
        <div class="input-error" v-if="taskNameError">{{ taskNameError }}</div>
      </div>
      <div class="task-date">
        <va-date-input v-model="taskDate" />
      </div>
      <div class="task-button">
        <va-button type="submit"> Add new task </va-button></div>
    </form>
</template>

<script>
import api from "../../../api/employees";
export default {
  name: "AddTaskForm",
  props: ['employeeId'],
  emits: ['taskAdded'],

  data() {
    return {
      task: '',
      taskDate: new Date(),
      taskNameError: ''
    }
  },
  methods: {
    addTask(){
      this.taskNameError = this.task.length ? '' : 'Please input task name!';

      if(!this.taskNameError) {
        api.createTask(this.$props.employeeId, this.task, this.taskDate)
          .then(() => { this.$emit("taskAdded"); })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style>
.task-form {
  display: flex;
}

.task-input {
  margin-right: 20px;
  width: 40%;
}

.task-date {
  margin-right: 20px;
}

.input-error {
  color: red;
  font-weight: bold;
}
</style>