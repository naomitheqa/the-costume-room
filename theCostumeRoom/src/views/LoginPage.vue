<!-- Login Page -->

<script setup>
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  import { login } from "@/auth/authService.js";
  import { setToken } from "@/auth/tokenService.js";

  const router = useRouter();

  let email, password, loading, error, message;
  email = ref('');
  password = ref('');
  loading = ref(false);
  error = ref(null);
  message = ref(null);

  const handleLogin = async () => {
    loading.value = true;
    error.value = null;
    message.value = null;

    try {
      // Successful Login
      const res = await login(email, password);
      setToken(res.data.token);
      message.value = "Login successful";

      await router.push('/admin-dashboard');
    } catch (err){
      // Error with Login
      error.value = "Invalid email or password. Please try again.";
      console.log(err)
    } finally {
      loading.value = false;
    }};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="card-title text-center">TCR Login</h2>
          <form @submit.prevent="handleLogin">
            <div id="email-field" class="mb-3">
              <label for="email">Email:</label>
              <input type="email" v-model="email" class="form-control" id="email" required />
            </div>
            <div id="password-field" class="mb-3">
              <label for="password">Password:</label>
              <input type="password" v-model="password" class="form-control" id="password" required />
            </div>

            <div v-if="error" class="error alert alert-danger" role="alert"> {{ error }}</div>
            <div v-if="message" class="message alert alert-success"> {{ message }}</div>

            <button type="submit" :disabled="loading" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: darkred;
}
  .message {
    color: darkgreen;
  }
</style>
