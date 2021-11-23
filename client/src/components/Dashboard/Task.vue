<template>
  <div class="loading" v-if="isLoading">
    <va-inner-loading :loading="true" color="primary">
    </va-inner-loading>
  </div>
  <div v-else>
    <div class="va-table-responsive">
      <table class="va-table va-table--striped tasks-table">
        <thead>
        <tr>
          <th>Task</th>
          <th>Deadline</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <td>{{ task.name }}</td>
          <td>{{ formatDate(task.deadline) }}</td>
          <td v-if="checkDate(task.deadline)">
            <input type="checkbox" :value="task._id" id="task._id" v-model="task.completed" @change="checkTask($event)">
          </td>
          <td v-else>
            <input type="checkbox" :value="task._id" id="task._id" v-model="task.completed" @change="checkTask($event)" disabled>
          </td>
          <td v-if="checkDate(task.deadline)">
            <va-button @click="deleteHandler(task._id)" size="small" color="danger" class="mr-4">Delete</va-button>
          </td>
          <td v-else>
            <va-button @click="deleteHandler(task._id)" size="small" color="danger" class="mr-4" disabled>Delete</va-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <br><br>
  <div class="tasks-info" v-if="tasks.length">
    <p v-if="tasks.length === numTasksCompleted(tasks)" style="color: green">
      {{ numTasksCompleted(tasks) }} out of {{ tasks.length }} tasks completed.
    </p>
    <p v-else style="color: orange">
      {{ numTasksCompleted(tasks) }} out of {{ tasks.length }} tasks completed.
    </p>
  </div>
</template>

<script>
import api from '../../../api/employees';
import moment from 'moment';

export default {
  name: "Task",
  props: ['employeeId'],
  data() {
    return {
      tasks: [],
      err: null,
      isLoading: false,
    }
  },

  methods: {
    fetchTasks(id) {
      this.isLoading = true;
      api.getTasks(id)
      .then((result) => (this.tasks = result.data))
      .then(() => this.isLoading = false)
      .catch((err) => (this.err = err))
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY");
    },
    deleteHandler(taskId) {
      api.deleteTask(this.$props.employeeId, taskId)
      .then(() => { this.$emit("taskDeleted"); })
      .catch(err => console.log(err))
    },
    checkTask(e) {
      api.updateTask(this.$props.employeeId, e.srcElement.value, e.srcElement._modelValue)
      .then(() => { this.$emit("taskCompleted"); })
      .catch(err => console.log(err))
    },
    checkDate(deadline) {
      const current = moment().toDate();
      if (this.formatDate(current) > this.formatDate(deadline)) {
        return false;
      }
      return true;
    },
    numTasksCompleted(tasks) {
      var br = 0;
      tasks.forEach(task => {
        if (task.completed) {
          br++;
        }
      });
      return br;
    }
  }
}
</script>

<style>
.tasks-table {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.tasks-info {
  font-size: 1.5rem;
}
</style>