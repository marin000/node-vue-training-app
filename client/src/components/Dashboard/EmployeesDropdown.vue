<template>
  <div style="max-width: 300px;">
    <va-select 
      @update:modelValue="emitEmployeeSelected($event)"
      v-model="value" 
      :options="employees" 
      class="mb-4" 
      label="Select employee" 
      track-by="_id" 
      text-by="name" />
  </div>
</template>

<script>
import api from '../../../api/employees'

export default {
  name: "EmployeesDropdown",
  emits: ['employeeSelected'],
  data() {
    return {
      employees: [],
      err: null,
      value: ''
    }
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      api.getEmployees()
      .then((result) => (this.employees = result.data))
      .then(() => { this.selectEmployee(this.employees[0])})
      .catch((err) => (this.err = err));
    },
    selectEmployee(employee) {
      if(employee) {
        this.value = employee;
        this.emitEmployeeSelected(employee);
      }
    },
    emitEmployeeSelected(employee) {
      this.$emit("employeeSelected", employee._id); 
    }
  }
}
</script>

<style>

</style>