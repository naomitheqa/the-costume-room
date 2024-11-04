<!-- Admin Dashboard -->

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";
import AdminNav from "@/components/AdminNav.vue";
import AddUserBtn from "@/components/AddUserBtn.vue";
import AddUserForm from "@/components/AddUserForm.vue";
import {getToken} from "@/auth/tokenService.js";
import {getAllUsers} from "@/auth/apiService.js";

const router = useRouter();

const userList = ref([]);
const loading = ref(true );
const error = ref(null);
const showModal = ref(false);

const getUserList = async () => {
  try {
    const token = getToken();
    const res = await getAllUsers(token);

    userList.value = res.data.users;
  } catch (err){
    error.value = "Failed to load users. Please try again later.";
  } finally {
    loading.value = false;
  }
}

onMounted(getUserList);
</script>

<template>
 <div>
   <admin-nav></admin-nav>

   <div class="container mt-5">
     <h2>All Users</h2>

     <div v-if="loading" class="container mt-5 placeholder-glow">
       <!--Loading users...-->
       <span class="placeholder col-12"></span>
       <span class="placeholder col-12"></span>
       <span class="placeholder col-12"></span>
     </div>
     <div v-if="error" class="error">{{ error }}</div>

     <!--Table-->
     <div v-if="userList && userList.length" class="table-responsive">
       <table v-if="userList.length" class="table table-hover table-striped table-bordered">
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

     <div class="text-end">
        <add-user-btn></add-user-btn>
     </div>

     <div>
       <add-user-form :show-modal="showModal" @close="showModal = false"></add-user-form>
     </div>
   </div>


 </div>
</template>

<style scoped>
.message {
  color: green;
}
</style>
