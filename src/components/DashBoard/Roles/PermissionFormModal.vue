<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="close">
      <div
        class="glass-card rounded-2xl w-full max-w-lg relative overflow-hidden"
        v-motion
        :initial="{ opacity: 0, scale: 0.95, y: 20 }"
        :enter="{ opacity: 1, scale: 1, y: 0 }"
        :leave="{ opacity: 0, scale: 0.95, y: 20 }"
      >
        <!-- Header -->
        <div class="p-6 border-b border-slate-700">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-cyan-400">{{ isEditing ? 'edit' : 'add_task' }}</span>
              {{ isEditing ? 'Edit Permission' : 'Create New Permission' }}
            </h2>
            <button
              @click="close"
              class="p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4">
          <!-- Errors -->
          <div
            v-if="errors.length > 0"
            class="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-red-400 text-sm">error</span>
              <span class="text-red-400 font-medium text-sm">Errors:</span>
            </div>
            <ul class="text-sm text-red-300 space-y-1">
              <li v-for="(error, index) in errors" :key="index">• {{ error }}</li>
            </ul>
          </div>

          <!-- Module -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">folder</span>
                Module *
              </span>
            </label>
            <input
              v-model="form.module"
              type="text"
              placeholder="e.g., users, pets, appointments"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.includes('Module is required') }"
            />
            <p class="text-xs text-slate-500 mt-1">The module this permission belongs to</p>
          </div>

          <!-- Action -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">settings</span>
                Action *
              </span>
            </label>
            <select
              v-model="form.action"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.includes('Action is required') }"
            >
              <option value="">Select action</option>
              <option value="create">create</option>
              <option value="read">read</option>
              <option value="update">update</option>
              <option value="delete">delete</option>
              <option value="list">list</option>
              <option value="export">export</option>
              <option value="import">import</option>
              <option value="approve">approve</option>
              <option value="reject">reject</option>
              <option value="manage">manage</option>
            </select>
            <p class="text-xs text-slate-500 mt-1">The action type for this permission</p>
          </div>

          <!-- Label -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">label</span>
                Label *
              </span>
            </label>
            <input
              v-model="form.label"
              type="text"
              placeholder="e.g., Can create users"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.includes('Label is required') }"
            />
            <p class="text-xs text-slate-500 mt-1">Human-readable description of this permission</p>
          </div>

          <!-- Preview Key -->
          <div class="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p class="text-xs text-slate-400 mb-1">Permission Key (auto-generated):</p>
            <code class="text-cyan-400 font-mono text-sm">{{ previewKey }}</code>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-slate-700 flex justify-end gap-3">
          <button
            @click="close"
            class="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            :disabled="loading"
            class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
          >
            <span v-if="loading" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined text-sm">check</span>
            {{ loading ? "Saving..." : (isEditing ? "Update" : "Create") }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Permission } from '../../stores/roles.store'

interface Props {
  show: boolean
  isEditing: boolean
  initialData?: Permission | null
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Permission): void
}>()

const errors = ref<string[]>([])
const form = ref<Permission>({
  module: '',
  action: '',
  label: ''
})

const previewKey = computed(() => {
  if (form.value.module && form.value.action) {
    return `${form.value.module}.${form.value.action}`
  }
  return 'module.action'
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    resetForm()
  }
})

watch(() => props.initialData, (newData) => {
  if (newData && props.isEditing) {
    form.value = { ...newData }
  }
}, { immediate: true })

const resetForm = () => {
  form.value = {
    module: '',
    action: '',
    label: ''
  }
  errors.value = []
}

const validateForm = () => {
  errors.value = []

  if (!form.value.module || form.value.module.trim() === '') {
    errors.value.push('Module is required')
  }

  if (!form.value.action || form.value.action.trim() === '') {
    errors.value.push('Action is required')
  }

  if (!form.value.label || form.value.label.trim() === '') {
    errors.value.push('Label is required')
  }

  return errors.value.length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  emit('submit', form.value)
}

const close = () => {
  resetForm()
  emit('close')
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .glass-card,
.modal-leave-active .glass-card {
  transition: transform 0.3s ease;
}

.modal-enter-from .glass-card,
.modal-leave-to .glass-card {
  transform: scale(0.95) translateY(20px);
}
</style>
