<template>
    <form @submit.prevent="handleSubmit" class="task-form">
      <div class="task-input">
        <va-input
          class="mb-4"
          v-model="task"
          label="Task name"
        />
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
  name: 
    "AddTaskForm",
  props: ['employeeId'],
  emits: ['taskAdedd'],

  data() {
    return {
      task: '',
      taskDate: new Date()
    }
  },
  methods: {
    handleSubmit(){
      api.createTask(this.$props.employeeId, this.task, this.taskDate)
        .then(() => { this.$emit("taskAdded"); })
        .catch(err => console.log(err))
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
</style>