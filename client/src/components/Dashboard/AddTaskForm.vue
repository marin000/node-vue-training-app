<template>
    <form @submit.prevent="addTask" class="task-form">
      <div class="task-input">
        <va-input
          class="mb-4"
          v-model="task"
          label="Task name"
        />
        <div class="input-task-error" v-if="error">{{ error }}</div>
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
import moment from 'moment';
export default {
  name: "AddTaskForm",
  props: ['employeeId'],
  emits: ['taskAdded'],

  data() {
    return {
      task: '',
      taskDate: new Date(),
      error: ''
    }
  },
  methods: {
    addTask(){
      this.error = this.task.length ? '' : 'Please input task name!';

      if(!this.error) {
        const task = { 
          name: this.task, 
          deadline: moment(this.taskDate).format('YYYY-MM-DD'), 
          completed: false};
        api.createTask(this.employeeId, task)
          .then(() => { this.$emit("taskAdded"); })
          .catch(err => console.log(err));
      }
      this.task = '';
      this.taskDate = new Date();
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

.input-task-error {
  color: red;
  font-weight: bold;
}
</style>