<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '../../../stores/auth.store'

const store = useAuthStore()

const form = ref({
  name: '',
  email: '',
  role: 'user'
})

watch(() => store.selectedUser, (val) => {
  if (val) form.value = { ...val }
})

const save = async () => {
  if (store.selectedUser?.id) {
    await store.updateUser(store.selectedUser.id, form.value)
  } else {
    await store.createUser(form.value)
  }
}
</script>

<template>
  <div class="bg-card-dark p-6 rounded-xl space-y-4">
    <input v-model="form.name" placeholder="Name"
      class="w-full bg-white/5 p-2 rounded" />
    <input v-model="form.email" placeholder="Email"
      class="w-full bg-white/5 p-2 rounded" />

    <select v-model="form.role"
      class="w-full bg-white/5 p-2 rounded">
      <option value="admin">Admin</option>
      <option value="doctor">Doctor</option>
      <option value="user">User</option>
    </select>

    <div class="flex gap-2">
      <button @click="save"
        class="px-4 py-2 bg-primary rounded text-background-dark font-bold">
        Save
      </button>

      <button v-if="store.selectedUser"
        @click="store.deleteUser(store.selectedUser.id)"
        class="px-4 py-2 bg-red-600 rounded text-white">
        Delete
      </button>

      <button v-if="store.selectedUser"
        @click="store.resetPassword(store.selectedUser.email)"
        class="px-4 py-2 bg-yellow-600 rounded text-white">
        Reset Password
      </button>
    </div>
  </div>
</template>
