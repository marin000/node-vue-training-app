<template>
  <div></div>
</template>

<script>
import api from "../../../api/employees";

export default {
  name: "Employees",
  data() {
    return {
      employees: [],
      isLoading: false,
      err: null,
    };
  },
  created() {
    api.getEmployees()
      .then((result) => (this.employees = result.data))
      .catch((err) => (this.err = err));
  },
};
</script>

<style>
</style>