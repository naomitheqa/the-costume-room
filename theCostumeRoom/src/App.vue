<script setup>
  import {onMounted, onBeforeUnmount} from "vue";
  import {TokenService} from "@/auth/tokenService.js";
  import {logout} from "@/auth/index.js";

  let timer;

  const checkTokenExpiration = () => {
    if (TokenService.isTokenExpired()){
      logout();
      alert('Your session has expired. Please login again.')
    }
  };

  onMounted(() => {
    timer = setInterval(checkTokenExpiration, 60 * 1000);
  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  })
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
  }
</style>
