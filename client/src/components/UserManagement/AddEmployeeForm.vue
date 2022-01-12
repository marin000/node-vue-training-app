<template>
  <form @submit.prevent="addEmployee" class="employee-form">
    <div class="employee-input">
      <va-input class="mb-4" v-model="employee.name" label="name" />
      <div class="input-employee-error" v-if="errorName">{{ errorName }}</div>
      <va-input class="mb-4" v-model="employee.email" label="email" />
      <div class="input-employee-error" v-if="errorEmail">{{ errorEmail }}</div>
      <va-input class="mb-4" v-model="employee.phone" label="phone" />
      <va-input class="mb-4" v-model="employee.age" label="age" />
      <va-input class="mb-4" v-model="employee.pet" label="pet" />
      <input
        @change="setImgDataUrl"
        id="image"
        name="image"
        placeholder="Choose an image"
        ref="image"
        type="file"
      />
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
      errorName: '',
      errorEmail: '',
      employee: {
        name: '',
        email: '',
        phone: '',
        age: '',
        pet: '',
        errorName: '',
        errorEmail: '',
        image: ''
      }
    };
  },
  methods: {
    setImgDataUrl(e) {
      const image = e.target.files || e.dataTransfer.files;
      if (!image.length) return;
      const reader = new FileReader();
      reader.onload = function () {
        this.employee.image = reader.result;
      }.bind(this);
      reader.readAsDataURL(image[0]);
    },
    addEmployee() {
      this.errorName = this.employee.name.length ? '' : 'Please input employee name!';
      this.errorEmail = this.employee.email.length ? '' : 'Please input email!';
      if (!this.error) {
        api.addNewEmployee(this.employee)
          .then(() => { this.$emit('employeeAdded'); })
          .catch((err) => console.log(err));
      }
      this.resetForm();
    },
    resetForm() {
      this.employee.name = '';
      this.employee.email = '';
      this.employee.phone = '';
      this.employee.age = '';
      this.employee.pet = '';
      this.$refs.image.value = null;
      this.employee.image = null;
    }
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