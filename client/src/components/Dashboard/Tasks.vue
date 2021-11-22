<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--striped tasks-table">
      <thead>
      <tr>
        <th>Task</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in task" :key="task._id">
        <td>{{task.name}}</td>
        <td><va-button @click="deleteHandler(task._id)" size="small" color="danger" class="mr-4">Delete</va-button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../../../api/employees';

export default {
  name: "Tasks",
  data() {
    return {
      tasks: [],
      err: null,
      isLoading: false
    }
  },
  mounted() {
    this.fetchTasks("")
  },

  methods: {
    fetchTasks(id) {
      api.getTasks(id)
      .then((result) => (this.tasks = result.data))
      .catch((err) => (this.err = err))
    }
  }
}
</script>

<style>
</style>