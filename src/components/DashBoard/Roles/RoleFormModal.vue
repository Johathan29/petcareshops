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
              <span class="material-symbols-outlined text-cyan-400">{{ isEditing ? 'edit' : 'add_box' }}</span>
              {{ isEditing ? 'Edit Role' : 'Create New Role' }}
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

          <!-- Name -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">badge</span>
                Role Name *
              </span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g., Administrator"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.includes('Name is required') }"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">description</span>
                Description
              </span>
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Brief description of this role..."
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm text-slate-400 mb-2">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">category</span>
                Category
              </span>
            </label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            >
              <option value="">Select category</option>
              <option value="Administrative">Administrative</option>
              <option value="Medical">Medical</option>
              <option value="Support">Support</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Grooming">Grooming</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <!-- Active Toggle -->
          <div class="flex items-center justify-between p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-cyan-400">toggle_on</span>
              <div>
                <p class="text-white font-medium text-sm">Active Role</p>
                <p class="text-slate-500 text-xs">Users can be assigned to this role</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="form.active"
                type="checkbox"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
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
import { ref, watch } from 'vue'
import type { Role } from '../../stores/roles.store'

interface Props {
  show: boolean
  isEditing: boolean
  initialData?: Role | null
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', data: Role): void
}>()

const errors = ref<string[]>([])
const form = ref<Role>({
  name: '',
  description: '',
  active: true,
  category: ''
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
    name: '',
    description: '',
    active: true,
    category: ''
  }
  errors.value = []
}

const validateForm = () => {
  errors.value = []

  if (!form.value.name || form.value.name.trim() === '') {
    errors.value.push('Name is required')
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
