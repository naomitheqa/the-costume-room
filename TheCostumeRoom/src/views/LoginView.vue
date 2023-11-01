<script setup>
  import axios from "axios";


  async function login(email, password){
    let result = await axios.post("http://127.0.0.1:8080/tcr/users/login");
    console.log(result);

  }
</script>

<template>
  <div>
    <div>
      <h4>Welcome to the Costume Room!</h4>
    </div>
    <div>
      <form action="">
        <div>
          <label for="email">Email address</label>
          <div>
            <input type="email" name="email" v-model="email">
          </div>
        </div>

        <div>
          <label for="password" name="password">Password</label>
          <input type="password" v-model="password">
        </div>

        <div>
          <button @click="login(email, password)">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>