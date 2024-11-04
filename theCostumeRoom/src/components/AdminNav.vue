<script setup>
import { useRouter } from 'vue-router';
import {logout} from "@/auth/index.js";

const router = useRouter();

const handleLogout = () => {
  // Clear token from localStorage
  logout();
  // Redirect to login page
  router.push('/');
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Admin Dashboard</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin-dashboard">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user-management">User Management</router-link>
          </li>
        </ul>
        <button class="btn btn-outline-light" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
