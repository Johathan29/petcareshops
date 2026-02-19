<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth.store'
import { computed } from 'vue'

const store = useAuthStore()

const permissions = [
  { key: 'view_pets', label: 'View Pets' },
  { key: 'edit_pets', label: 'Edit Pets' },
  { key: 'manage_appointments', label: 'Manage Appointments' },
  { key: 'financial_access', label: 'Financial Access' },
  { key: 'user_management', label: 'User Management' }
]

const togglePermission = (key: string) => {
  const current = store.selectedUser.permissions || {}
  current[key] = !current[key]
  store.updatePermissions(store.selectedUser.id, current)
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <label
      v-for="perm in permissions"
      :key="perm.key"
      class="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 cursor-pointer"
    >
      <span class="text-sm font-bold text-white">
        {{ perm.label }}
      </span>

      <input
        type="checkbox"
        :checked="store.selectedUser?.permissions?.[perm.key]"
        @change="togglePermission(perm.key)"
        class="size-5 text-primary"
      />
    </label>
  </div>
</template>
