<template>
  <va-navbar color="primary" shape class="mb-2">
    <template #left>
      <va-navbar-item><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></va-navbar-item>
      <va-navbar-item><router-link :to="{ name: 'UserManagement' }">User Management</router-link></va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
a {
  color: white;
}

a.router-link-exact-active {
  color: black;
  font-weight: bold;
  
}
</style>