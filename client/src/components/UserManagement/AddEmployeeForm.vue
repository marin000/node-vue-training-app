<template>
    <form @submit.prevent="addEmployee" class="employee-form">
      <div class="employee-input">
        <va-input
          class="mb-4"
          v-model="name"
          label="name"
        />
      </div>
      <div class="employee-button">
        <va-button type="submit"> Add new user </va-button></div>
    </form>
</template>

<script>
import api from "../../../api/employees";
export default {
  name: "AddEmployeeForm",
  emits: ['employeeAdded'],

  data() {
    return {
      name: ''
    }
  },
  methods: {
    addEmployee(){
      api.addNewEmployee(this.name)
      .then(() => { this.$emit("employeeAdded"); })
      .catch(err => console.log(err));
    this.name = '';
    }
  }
}
</script>

<style>

.employee-form {
  display: flex;
  justify-content: center;
}

.employee-input {
  margin-right: 10px;
  width: 30%;
}
</style>