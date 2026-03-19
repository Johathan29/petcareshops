<template>
  <transition name="slide-over">
    <div v-if="show" class="fixed inset-0 z-50 overflow-hidden" @click.self="close">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click.self="close"></div>
      
      <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          class="w-[550px] glass-card flex flex-col h-full shadow-2xl"
          v-motion
          :initial="{ x: '100%' }"
          :enter="{ x: 0 }"
          :leave="{ x: '100%' }"
        >
          <!-- Header -->
          <div class="p-6 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
            <div class="flex flex-col">
              <h3 class="text-slate-100 text-xl font-bold flex items-center gap-2">
                <span class="material-symbols-outlined text-cyan-400">security</span>
                Edit Permissions
              </h3>
              <p class="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">
                {{ role?.name }}
              </p>
            </div>
            <button
              @click="close"
              class="p-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span class="material-symbols-outlined text-slate-400">close</span>
            </button>
          </div>

          <!-- Body - Permissions List -->
          <div class="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <!-- Group permissions by module -->
            <div v-for="(modulePerms, module) in groupedPermissions" :key="module" class="mb-8">
              <div class="flex items-center gap-2 mb-4 pb-2 border-b border-slate-700">
                <span class="material-symbols-outlined text-cyan-400 text-xl">{{ getModuleIcon(module) }}</span>
                <h4 class="text-slate-100 font-bold capitalize">{{ module }}</h4>
                <span class="text-xs text-slate-500 ml-auto">{{ modulePerms.length }} permissions</span>
              </div>
              
              <div class="space-y-3">
                <label
                  v-for="perm in modulePerms"
                  :key="perm.id"
                  class="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 cursor-pointer group hover:border-cyan-500/50 transition-all"
                  :class="{ 'bg-cyan-500/10 border-cyan-500/30': selectedPermissions.includes(perm.id!) }"
                >
                  <div class="flex items-center gap-3 flex-1">
                    <div class="flex flex-col">
                      <span class="text-sm text-slate-200 font-medium">{{ perm.label }}</span>
                      <span class="text-xs text-slate-500 font-mono">{{ perm.module }}.{{ perm.action }}</span>
                    </div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      :checked="selectedPermissions.includes(perm.id!)"
                      @change="togglePermission(perm.id!)"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </label>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="permissions.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-slate-600 mb-4">lock_outline</span>
              <p class="text-slate-400 text-lg">No permissions available</p>
              <p class="text-slate-500 text-sm mt-2">Create permissions first to assign them to roles</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-6 border-t border-slate-700 bg-slate-800/50">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-slate-400 text-sm">Selected Permissions</p>
                <p class="text-cyan-400 text-2xl font-bold">{{ selectedPermissions.length }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="selectAll"
                  class="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Select All
                </button>
                <button
                  @click="deselectAll"
                  class="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button
                @click="close"
                class="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                @click="handleSubmit"
                :disabled="loading"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
              >
                <span v-if="loading" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                <span v-else class="material-symbols-outlined text-sm">save</span>
                {{ loading ? "Saving..." : "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Role, Permission } from '../../../stores/roles.store'

interface Props {
  show: boolean
  role: Role | null
  permissions: Permission[]
  currentPermissions: string[]
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  role: null,
  permissions: () => [],
  currentPermissions: () => []
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: { idRole: string | undefined; permissions: string[] }): void
}>()

const selectedPermissions = ref<string[]>([])

watch(() => props.show, (newVal) => {
  if (newVal) {
    selectedPermissions.value = [...props.currentPermissions]
  }
}, { immediate: true })

const groupedPermissions = computed(() => {
  const grouped: Record<string, Permission[]> = {}
  
  props.permissions.forEach(perm => {
    if (!grouped[perm.module]) {
      grouped[perm.module] = []
    }
    grouped[perm.module].push(perm)
  })
  
  return grouped
})

const getModuleIcon = (module: string): string => {
  const iconMap: Record<string, string> = {
    users: 'group',
    pets: 'pets',
    appointments: 'event',
    services: 'medical_services',
    adoptions: 'handshake',
    medical: 'stethoscope',
    veterinary: 'local_hospital',
    grooming: 'content_cut',
    billing: 'account_balance_wallet',
    invoices: 'receipt',
    reports: 'assessment',
    settings: 'settings',
    roles: 'security',
    permissions: 'key',
    dashboard: 'dashboard',
    notifications: 'notifications',
    files: 'folder',
    inventory: 'inventory_2'
  }
  
  return iconMap[module.toLowerCase()] || 'folder'
}

const togglePermission = (permissionId: string) => {
  const index = selectedPermissions.value.indexOf(permissionId)
  if (index === -1) {
    selectedPermissions.value.push(permissionId)
  } else {
    selectedPermissions.value.splice(index, 1)
  }
}

const selectAll = () => {
  selectedPermissions.value = props.permissions
    .filter(p => p.id)
    .map(p => p.id!)
}

const deselectAll = () => {
  selectedPermissions.value = []
}

const handleSubmit = () => {
  emit('submit', {
    idRole: props.role?.id,
    permissions: selectedPermissions.value
  })
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(5, 201, 204, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(5, 201, 204, 0.5);
}

/* Slide-over Transitions */
.slide-over-enter-active,
.slide-over-leave-active {
  transition: opacity 0.3s ease;
}

.slide-over-enter-from,
.slide-over-leave-to {
  opacity: 0;
}

.slide-over-enter-active > div:last-child,
.slide-over-leave-active > div:last-child {
  transition: transform 0.3s ease;
}
</style>
