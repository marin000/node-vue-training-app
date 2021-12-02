<template>
  <div class="loading" v-if="isLoading">
    <va-inner-loading :loading="true" color="primary"> </va-inner-loading>
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
            <td>{{ task.deadline }}</td>
            <td>
              <input
                type="checkbox"
                :value="task._id"
                id="task._id"
                v-model="task.completed"
                @change="setTaskCompletion(task)"
                :disabled="isExpired(task.deadline)"
              />
            </td>
            <td>
              <va-button
                @click="deleteTask(task._id)"
                size="small"
                color="danger"
                class="mr-4"
                :disabled="isExpired(task.deadline)"
                >Delete</va-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <br /><br />
  <div class="tasks-info" v-if="tasks.length">
    <p v-if="tasks.length === completedTasks.length" style="color: green">
      {{ completedTasks.length }} out of {{ tasks.length }} tasks completed.
    </p>
    <p v-else style="color: orange">
      {{ completedTasks.length }} out of {{ tasks.length }} tasks completed.
    </p>
  </div>
</template>

<script>
import api from "../../../api/employees";
import moment from "moment";

export default {
  name: "Task",
  props: ["employeeId"],
  emits: ["taskDeleted", "taskCompleted"],
  data() {
    return {
      tasks: [],
      err: null,
      isLoading: false,
    };
  },

  methods: {
    fetchTasks(id) {
      this.isLoading = true;
      api.getTasks(id)
        .then((result) => (this.tasks = result.data))
        .then(() => (this.isLoading = false))
        .catch((err) => (this.err = err));
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    deleteTask(taskId) {
      api.deleteTask(this.employeeId, taskId)
        .then(() => {
          this.$emit("taskDeleted");
        })
        .catch((err) => console.log(err));
    },
    setTaskCompletion(task) {
      api.setCompletion(this.employeeId, task._id, task.completed)
        .then(() => {
          this.$emit("taskCompleted");
        })
        .catch((err) => console.log(err));
    },
    isExpired(deadline) {
      const today = moment().format('YYYY-MM-DD');
      return moment(today).isAfter(deadline);
    },
  },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.completed === true);
    },
  },
};
</script>

<style>
.tasks-table {
  width: 60% !important;
  margin: 0 auto;
}

.tasks-info {
  font-size: 1.2rem;
}
</style>