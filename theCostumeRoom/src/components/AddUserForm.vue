
<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(['close', 'userAdded']);

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: ''
});

const closeModal = () => {
  emit('close');
  resetForm();
};

const resetForm = () => {
  user.value = { firstName: '', lastName: '', email: '', role: '' }; // Reset user data
};

const submitForm = async () => {
  try {
    const response = await axios.post('/api/users', user.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Pass token in header
      }
    });
    console.log('User added successfully:', response.data);
    emit('userAdded', response.data);
    closeModal(); // Close modal after submission
  } catch (error) {
    console.error('Error adding user:', error);
  }
};
</script>

<template>
  <div class="modal fade" :class="{ show: showModal }" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="!showModal">
    <div class="modal-dialog">
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
              <label for="role" class="form-label">Role</label>
              <select class="form-select" id="role" v-model="user.role" required>
                <option value="" disabled>Select a role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success">Add User</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal.show {
  display: block;
  opacity: 1;
  transition: opacity 0.15s linear;
}
</style>
