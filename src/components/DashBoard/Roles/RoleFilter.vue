<template>
  <div
    class="bg-surface-dark p-4 rounded-xl border border-border-dark mb-6 flex flex-wrap items-center justify-between gap-4"
  >
    <div class="grid md:grid-cols-4 items-center flex-col md:flex-col-4 gap-4 flex-1">
      <!-- Search Input -->
      <div class="relative w-full max-w-sm">
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined"
          >search</span
        >
        <input
          v-model="searchQuery"
          @input="emitSearch"
          class="w-full rounded-lg bg-background-dark border border-border-dark pl-10 pr-4 py-2.5 text-slate-100 focus:ring-1 focus:ring-primary placeholder-slate-500 text-sm"
          placeholder="Search by role name..."
        />
      </div>

      <div class="h-6 w-px bg-border-dark mx-2"></div>

      <!-- Filter Label -->
       <div class="flex  items-center">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-slate-500 uppercase">Filters:</span>
      </div>

      <!-- Role Filter Buttons -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="role in roles"
          :key="role.id"
          @click="selectRole(role.id)"
          class="px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
          :class="selectedRoleId === role.id
            ? 'bg-primary/20 text-primary border-primary/30'
            : 'bg-background-dark text-slate-400 border-border-dark hover:border-primary/50'"
        >
          {{ role.name }}
        </button>
      </div>
      </div>
    </div>

    <!-- Clear Filter Button -->
    <button
      v-if="selectedRoleId || searchQuery"
      @click="clearFilters"
      class="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-sm font-medium"
    >
      <span class="material-symbols-outlined text-xl">clear_all</span>
      <span>Clear</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Role } from '../../stores/roles.store'

interface Props {
  roles: Role[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'search', value: string): void
  (e: 'filter', roleId: string | null): void
  (e: 'clear'): void
}>()

const searchQuery = ref('')
const selectedRoleId = ref<string | null>(null)

const emitSearch = () => {
  emit('search', searchQuery.value)
}

const selectRole = (roleId: string) => {
  if (selectedRoleId.value === roleId) {
    selectedRoleId.value = null
    emit('filter', null)
  } else {
    selectedRoleId.value = roleId
    emit('filter', roleId)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedRoleId.value = null
  emit('clear')
  emit('search', '')
  emit('filter', null)
}
</script>

<style scoped>
.bg-surface-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(22 44 45 / var(--tw-bg-opacity, 1));
}

.bg-background-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(15 34 35 / var(--tw-bg-opacity, 1));
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(33 73 74 / var(--tw-border-opacity, 1));
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(5 201 204 / var(--tw-text-opacity, 1));
}

.bg-primary\/20 {
  background-color: rgb(5 201 204 / 0.2);
}

.border-primary\/30 {
  border-color: rgb(5 201 204 / 0.3);
}
</style>
