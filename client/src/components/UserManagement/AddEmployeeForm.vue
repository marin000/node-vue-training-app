<template>
  <form @submit.prevent="addEmployee" class="employee-form">
    <div class="employee-input">
      <va-input class="mb-4" v-model="name" label="name" />
      <div class="input-employee-error" v-if="errorName">{{ errorName }}</div>
      <va-input class="mb-4" v-model="email" label="email" />
      <div class="input-employee-error" v-if="errorEmail">{{ errorEmail }}</div>
      <va-input class="mb-4" v-model="phone" label="phone" />
      <va-input class="mb-4" v-model="age" label="age" />
      <va-input class="mb-4" v-model="pet" label="pet" />
    </div>
    <div class="employee-button">
      <va-button type="submit"> Add new user </va-button>
    </div>
  </form>
</template>

<script>
import api from "../../../api/employees";
export default {
  name: "AddEmployeeForm",
  emits: ["employeeAdded"],

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      age: "",
      pet: "",
      errorName: "",
      errorEmail: "",
    };
  },
  methods: {
    addEmployee() {
      this.errorName = this.name.length ? "" : "Please input employee name!";
      this.errorEmail = this.email.length ? "" : "Please input email!";
      if (!this.error) {
        api.addNewEmployee({
            name: this.name,
            email: this.email,
            phone: this.phone,
            age: this.age,
            pet: this.pet
          }).then(() => {
            this.$emit("employeeAdded");
          }).catch((err) => console.log(err));
      }
      this.name = "";
      this.email = "";
      this.phone = "";
      this.age = "";
      this.pet = "";
    },
  },
};
</script>

<style>
.employee-form {
  display: flex;
  justify-content: left;
  margin-left: 15%;
}

.employee-input {
  margin-right: 10px;
  width: 30%;
}

.input-employee-error {
  color: red;
  font-weight: bold;
}
</style>