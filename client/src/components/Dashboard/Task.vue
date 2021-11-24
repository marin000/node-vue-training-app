<template>
  <div class="loading" v-if="isLoading">
    <va-inner-loading :loading="true" color="primary">
    </va-inner-loading>
  </div>
  <div v-else>
    <va-data-table :items="tasks" :columns="columns" class="tasks-table"> 
      <template #header(name)>Task</template>

      <template #cell(deadline)="{source: deadline}"> {{ formatDate(deadline) }}</template>
      <template #cell(completed)="{source: completed}"><va-checkbox v-model="completed" /></template>
      <template #cell(employee)="{source: _id}"><va-button @click="deleteTask(_id)" size="small" color="danger" class="mr-4" :disabled="isExpired(deadline)">Delete</va-button></template>
    </va-data-table>
    <!--<div class="va-table-responsive">
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
          <td >
            <input type="checkbox" :value="task._id" id="task._id" v-model="task.completed" @change="setTaskCompletion(task)" :disabled="isExpired(task.deadline)">
          </td>
          <td>
            <va-button @click="deleteTask(task._id)" size="small" color="danger" class="mr-4" :disabled="isExpired(task.deadline)">Delete</va-button>
          </td>
        </tr>
        </tbody>
      </table>-->
    </div>
  </div>
  <br><br>
  <div class="tasks-info" v-if="tasks.length">
    <p v-if="tasks.length === completedTasksCount.length" style="color: green">
      {{ completedTasksCount.length }} out of {{ tasks.length }} tasks completed.
    </p>
    <p v-else style="color: orange">
      {{ completedTasksCount.length }} out of {{ tasks.length }} tasks completed.
    </p>
  </div>
</template>

<script>
import api from '../../../api/employees';
import moment from 'moment';

export default {
  name: "Task",
  props: ['employeeId'],
  emits: ['taskDeleted', 'taskCompleted'],
  data() {
    const columns = [
      { key: 'name' },
      { key: 'deadline' },
      { key: 'completed' },
      { key: 'employee' }
    ]
    return {
      tasks: [],
      err: null,
      isLoading: false,
      columns
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
    deleteTask(taskId) {
      api.deleteTask(this.$props.employeeId, taskId)
      .then(() => { this.$emit("taskDeleted"); })
      .catch(err => console.log(err))
    },
    setTaskCompletion(task) {
      api.updateTask(this.$props.employeeId, task._id, task.completed)
      .then(() => { this.$emit("taskCompleted"); })
      .catch(err => console.log(err))
    },
    isExpired(deadline) {
      const current = moment().toDate();
      if (this.formatDate(current) > this.formatDate(deadline)) {
        return true;
      }
      return false;
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
  },
  computed: {
    completedTasksCount() {
      return this.tasks.filter(task => task.completed === true);
    }
  }
}
</script>

<style>

.tasks-table {
  width: 60% !important;
  margin-left: auto;
  margin-right: auto;
}

.tasks-info {
  font-size: 1.2rem;
}
</style>