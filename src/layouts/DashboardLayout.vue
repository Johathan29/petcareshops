<script setup lang="ts">
import Sidebar from '../components/DashBoard/Sidebar.vue'
import { ref, computed, onMounted, onUnmounted } from "vue"

interface SessionUser {
  data: {
    user: {
      app_metadata: { role: string }
      user_metadata: { first_name: string }
    }
  }
}

/* ===============================
   USER
================================= */
const rawUser = sessionStorage.getItem("user")

const parsedUser = ref<SessionUser | null>(
  rawUser ? JSON.parse(rawUser) : null
)

const firstName = computed(
  () => parsedUser.value?.data.user.user_metadata.first_name ?? "User"
)

const role = computed(
  () => parsedUser.value?.data.user.app_metadata.role ?? "Guest"
)

/* ===============================
   CLOCK
================================= */
const time = ref("")
let interval: any

const updateClock = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

onMounted(() => {
  updateClock()
  interval = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

/* ===============================
   SIDEBAR STATE
================================= */
const sidebarOpen = ref(false)      // mobile
const sidebarCollapsed = ref(false) // desktop

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="flex h-screen bg-[#102022] overflow-hidden relative">

    <!-- Overlay (Mobile) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
      @click="closeSidebar"
    />

    <!-- Sidebar -->
    <Sidebar
      :collapsed="sidebarCollapsed"
      :open="sidebarOpen"
      :firstName="firstName"
      :role="role"
      @close="closeSidebar"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
    />
 <button
            class="hidden lg:flex text-slate-400 relative top-[1rem] hover:text-primary transition duration-300 "
            :class="sidebarCollapsed ? 'left-[-1.1rem]': 'left-[-1.5rem]'"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            <span class="material-symbols-outlined !text-[2.5rem] text-white/70  z-50">
              {{ sidebarCollapsed ? 'arrow_right' : 'arrow_left' }}
            </span>
          </button>
    <!-- MAIN -->
    <main class="flex-1 flex flex-col overflow-hidden">

      <!-- HEADER -->
      <header
        class="h-16 border-b border-white/10 px-4 md:px-8 flex items-center justify-between bg-background-dark/50 backdrop-blur-md shrink-0"
      >
        <div class="flex items-center gap-4">

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden text-white"
            @click="sidebarOpen = true"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>

          <!-- Desktop Collapse Button -->
         

          <h2 class="text-sm md:text-lg font-bold text-white flex items-center gap-2">
            Welcome,
            <span class="text-primary">{{ firstName }}</span>
          </h2>

          <div class="hidden sm:flex items-center gap-2 text-slate-400">
            <span class="material-symbols-outlined text-[20px]">schedule</span>
            <span class="text-sm font-mono tracking-wider">
              {{ time }}
            </span>
          </div>
        </div>
      </header>

      <!-- CONTENT -->
      <div class="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-6">
        <transition name="fade-slide" mode="out-in">
          <router-view />
        </transition>
      </div>

    </main>
  </div>
</template>