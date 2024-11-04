<script setup>
  import { ref } from 'vue';
  import axios from "axios";
  import {useRouter} from "vue-router";

  const baseUrl = "https://the-costume-room-api.onrender.com";
  const router = useRouter();

  let email, password, loading, error, message;
  email = ref('');
  password = ref('');
  loading = ref(false);
  error = ref(null);
  message = ref(null);

  const login = async () => {
    loading.value = true;
    error.value = null;
    message.value = null;

    try {
      const response = await axios.post(`${baseUrl}/tcr/users/login`, {
        email: email.value,
        password: password.value,
      });

      // Successful Login
      const token = response.data.data.token;
      localStorage.setItem('token', token);

      message.value = "Login successful";
      await router.push('/admin-dashboard');
    } catch (err){
      // Error with Login
      error.value = "Invalid email or password. Please try again.";
    } finally {
      loading.value = false;
    }};
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <div id="email-field">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div id="password-field">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
    </form>

    <div v-if="error" class="error"> {{ error }}</div>
    <div v-if="message" class="message"> {{ message }}</div>
  </div>
</template>

<style scoped>
  .error {
    color: red;
  }

  .message {
    color: green;
  }
</style>
