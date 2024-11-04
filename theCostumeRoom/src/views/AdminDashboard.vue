<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";

const baseUrl = "https://the-costume-room-api.onrender.com";
const router = useRouter();

const userList = ref([]);
const loading = ref(true );
const error = ref(null);

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/tcr/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    userList.value = response.data.users;
  } catch (err){
    error.value = "Failed to load users. Please try again later.";
  } finally {
    loading.value = false;
  }
}

onMounted(getAllUsers);
</script>

<template>
 <div>
   <h1>Admin Dashboard</h1>
   <h2>All Users</h2>

   <div v-if="loading">Loading users...</div>
   <div v-if="error" class="error">{{ error }}</div>

   <table v-if="userList.length">
     <thead>
       <tr>
         <th>Name</th>
         <th>Email</th>
         <th>Expiry Date</th>
       </tr>
     </thead>

     <tbody>
       <tr v-for="user in userList">
         <td>{{ `${user.firstName} ${user.lastName}` }}</td>
         <td>{{ user.email }}</td>
         <td>{{ user.expiryDate }}</td>
       </tr>
     </tbody>
   </table>

   <div v-else>No users found.</div>
 </div>
</template>

<style scoped>

</style>
