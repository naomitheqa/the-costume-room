<script setup>
import { ref } from 'vue';
import { addItem } from "@/auth/apiService.js";
import { TokenService } from "@/auth/tokenService.js";

const errorMessage = ref(null);
const isSubmitting = ref(false);
const message = ref(null);

const item = ref({
  itemName: '',
  itemDescription: '',
  itemCount: 1,
  itemGroup: '',
  itemFile: null,
});

const resetForm = () => {
  item.value = {
    itemName: '',
    itemDescription: '',
    itemCount: 1,
    itemGroup: '',
    itemFile: null,
  };
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
    item.value.itemFile = file;
    errorMessage.value = null; // Clear any previous error messages
  } else {
    errorMessage.value = 'Please upload a valid .png or .jpeg file.';
    event.target.value = ''; // Clear the input value to prompt re-selection
  }
};

const handleSubmit = async () => {
  if (!item.value.itemFile) {
    errorMessage.value = 'Please upload an image file before submitting.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = null;
  message.value = null;

  try {
    const token = TokenService.getToken();
    const res = await addItem(token, item.value);

    // Clear form after successful submission
    resetForm();
    message.value = res.message;
  } catch (error) {
    errorMessage.value = 'An error occurred while adding the item.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <h2>Add New Item</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Name Field -->
      <div class="mb-3">
        <label for="itemName" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="itemName"
          v-model="item.itemName"
          required
        />
      </div>

      <!-- Description Field -->
      <div class="mb-3">
        <label for="itemDescription" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="itemDescription"
          v-model="item.itemDescription"
          required
        ></textarea>
      </div>

      <!-- Count Field -->
      <div class="mb-3">
        <label for="itemCount" class="form-label">Count</label>
        <input
          type="number"
          class="form-control"
          id="itemCount"
          v-model="item.itemCount"
          required
          min="1"
        />
      </div>

      <!-- Group Dropdown Field -->
      <div class="mb-3">
        <label for="itemGroup" class="form-label">Group</label>
        <select
          class="form-select"
          id="itemGroup"
          v-model="item.itemGroup"
          required
        >
          <option value="" disabled>Select a group</option>
          <option value="SENIORS">Seniors</option>
          <option value="TEENS">Teens</option>
          <option value="JUNIORS">Juniors</option>
        </select>
      </div>

      <!-- File Upload Field -->
      <div class="mb-3">
        <label for="itemFile" class="form-label">Upload Image</label>
        <input
          type="file"
          class="form-control"
          id="itemFile"
          @change="handleFileUpload"
          accept=".png, .jpeg"
          required
        />
        <small class="text-muted">
          Only .png and .jpeg files are allowed.
        </small>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Adding...' : 'Add Item' }}
      </button>
    </form>

    <!-- Error Message Display -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>

    <!-- Success Message Display -->
    <div v-if="message" class="alert alert-success mt-3">
      {{ message }}
    </div>
  </div>
</template>


<style scoped>
/* Optional: Custom styles */
form {
  max-width: 500px;
  margin: 0 auto;
}

.alert {
  max-width: 500px;
  margin: 0 auto;
}
</style>
