<script setup lang="ts">
import { useRoute } from 'vue-router'

interface Props {
  collapsed?: boolean
  open?: boolean
  firstName: string
  role: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggle'): void
}>()

const route = useRoute()

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const menuSections = [
  {
    title: 'Core Dashboard',
    items: [
      { label: 'Overview', icon: 'dashboard', to: '/dashboard/home' }
    ]
  },
  {
    title: 'Management',
    items: [
      { label: 'Adoptions', icon: 'favorite', to: '/dashboard/adoptions' },
      { label: 'Pets Inventory', icon: 'pets', to: '/dashboard/pets' },
      { label: 'Users & Clients', icon: 'group', to: '/dashboard/users' },
      { label: 'Roles & Permissions', icon: 'shield_person', to: '/dashboard/roles' }
    ]
  },
  {
    title: 'Veterinary',
    items: [
      { label: 'Doctors', icon: 'stethoscope', to: '/dashboard/doctor' },
      { label: 'Services', icon: 'medical_services', to: '/dashboard/services' },
      { label: 'Appointments', icon: 'calendar_month', to: '/dashboard/appointments' }
    ]
  }
]
</script>

<template>
  <aside
    class="fixed lg:relative z-50 top-0 left-0 h-full 
    bg-[#132424] md:bg-background-dark border-r border-white/50 
    flex flex-col shrink-0
    transition-all duration-300 ease-in-out"
    :class="[
      props.collapsed ? 'w-20' : 'w-64',
      props.open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >

    <!-- Close Button (Mobile) -->
    <button
      class="lg:hidden absolute right-4 top-4 text-white"
      @click="emit('close')"
    >
      <span class="material-symbols-outlined">close</span>
    </button>

    <!-- Header -->
    <div class="p-6 flex items-center gap-3">
      <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <span class="material-symbols-outlined text-background-dark font-bold">
          pets
        </span>
      </div>

      <div v-if="!props.collapsed">
        <h1 class="text-white font-bold text-lg leading-none">PetAdmin</h1>
        <p class="text-primary text-[10px] uppercase tracking-widest font-semibold mt-1">
          Management Hub
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 mt-4 space-y-6 overflow-y-auto custom-scrollbar">
      <div v-for="section in menuSections" :key="section.title">

        <div
          v-if="!props.collapsed"
          class="text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2"
        >
          {{ section.title }}
        </div>

        <router-link
          v-for="item in section.items"
          :key="item.label"
          :to="item.to"
          @click="emit('close')"
          class="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all"
          :class="isActive(item.to)
            ? 'active-sidebar-item'
            : 'sidebar-item text-slate-400'"
        >
          <span class="material-symbols-outlined text-[22px]">
            {{ item.icon }}
          </span>

          <span v-if="!props.collapsed">
            {{ item.label }}
          </span>
        </router-link>

      </div>
    </nav>

    <!-- User Card -->
    <div class="p-4 border-t border-white/5" v-if="!props.collapsed">
      <div class="glass-card rounded-xl p-3 flex items-center gap-3">
        <div
          class="size-9 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-bold"
        >
          {{ props.firstName?.charAt(0).toUpperCase() }}
        </div>

        <div class="flex-1 overflow-hidden">
          <p class="text-xs font-bold text-white truncate">
            {{ props.firstName }}
          </p>
          <p class="text-[10px] text-slate-500 truncate">
            {{ props.role }}
          </p>
        </div>
      </div>
    </div>

  </aside>
  
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: #13daec;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(19, 218, 236, 0.1);
}

.sidebar-item:hover {
  background: rgba(19, 218, 236, 0.1);
  color: #13daec;
}

a.router-link-active {
  background: rgba(19, 218, 236, 0.15);
  color: #13daec !important;
  border-right: 3px solid #13daec;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #102022;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #13daec33;
  border-radius: 10px;
}
</style>