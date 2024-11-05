
<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import {addUser, getAllUsers} from "@/auth/apiService.js";
import {TokenService} from "@/auth/tokenService.js";

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(['close', 'userAdded']);
let error = ref(null);
let message = ref(null);

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  expiryDate: '',
  role: ''
});

const closeModal = () => {
  emit('close');
  resetForm();
};

const resetForm = () => {
  user.value = { firstName: '', lastName: '', email: '', expiryDate: '',role: '' }; // Reset user data
};

const submitForm = async () => {
  error.value = null;
  message.value = null;
  try {
    const token = TokenService.getToken();
    const res = await addUser(token, user.value);

    console.log('User added successfully:', res.data);
    emit('userAdded', res.data);
    closeModal(); // Close modal after submission
    window.location.reload();
  } catch (err) {
    // console.error('Error adding user:', error.response.data);
    const errHold = err.response;
    if (errHold){
        error.value = errHold.data.message;
    }
  }
};
</script>

<template>
  <div class="modal fade" :class="{ show: showModal }" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="!showModal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addUserModalLabel">Add New User</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="user.firstName" required />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="user.lastName" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="user.email" required />
            </div>
            <div class="mb-3">
              <label for="expiryDate" class="form-label">Birth Date</label>
              <input type="date" class="form-control" id="expiryDate" v-model="user.expiryDate" required>
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Role</label>
              <select class="form-select" id="role" v-model="user.role" required>
                <option value="" disabled>Select a role</option>
                <option value="admin">Admin</option>
                <option value="general">General</option>
              </select>
            </div>
            <div v-if="error" class="error alert alert-danger d-flex align-items-center" role="alert"> {{ error }}</div>

            <button type="submit" class="btn btn-success">Add User</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal-backdrop fade show"></div>
</template>


<style scoped>
.modal.show {
  display: block;
  opacity: 1;
  transition: opacity 0.15s linear;
}
</style>
