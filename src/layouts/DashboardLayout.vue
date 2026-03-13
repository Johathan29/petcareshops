<script setup lang="ts">
import Sidebar from "../components/DashBoard/Sidebar.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";

/* ===============================
   TYPES
================================= */


/* ===============================
   USER STATE
================================= */

const user = ref()
const profile = ref()
const role = ref()
const email = ref()
const avatar = ref()
onMounted(() => {
  const storedUser = sessionStorage.getItem("user")
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    console.log(user.value)
    profile.value = user.value.profile.first_name
    avatar.value = user.value.profile.avatar || null
    email.value = user.value.profile.email
    role.value = user.value.role.name
  }
})


/* ===============================
   COMPUTED USER DATA
================================= */



/* ===============================
   ROLE PERMISSIONS
================================= */

const permissions = computed(() => {
  switch (role.value) {
    case "admin":
      return {
        dashboard: true,
        users: true,
        doctors: true,
        appointments: true,
        calendar: true,
        services: true,
        adoption: true,
      }

    case "Doctors":
      return {
        dashboard: true,
        users: false,
        doctors: true,
        appointments: true,
        calendar: true,
        services: false,
        adoption: false,
      }

    default:
      return {
        dashboard: true,
        users: false,
        doctors: false,
        appointments: false,
        calendar: false,
        services: false,
        adoption: false,
      }
  }
})

/* ===============================
   CLOCK
================================= */

const time = ref("")
let interval: any

const updateClock = () => {
  time.value = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
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

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="flex h-screen bg-[#102022] overflow-hidden relative">
    <!-- Overlay (Mobile) -->

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" @click="closeSidebar">
    </div>

    <!-- Sidebar -->
    <Sidebar :collapsed="sidebarCollapsed" :open="sidebarOpen" :firstName="profile" :email="email" :avatar="avatar"
      :role="role" :permissions="permissions" @close="closeSidebar" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <button class="hidden lg:flex text-slate-400 relative top-[1rem] hover:text-primary h-fit transition duration-300 "
      :class="sidebarCollapsed ? 'left-[-1.1rem]' : 'left-[-1rem]'" @click="sidebarCollapsed = !sidebarCollapsed">
      <span class="material-symbols-outlined !text-[1.2rem] text-primary z-50">
        {{ sidebarCollapsed ? "right_panel_close" : "right_panel_open" }}
      </span>
    </button>
    <!-- MAIN -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- HEADER -->
      <header
        class="h-16 border-b border-white/10 px-4 md:px-8 flex items-center justify-between bg-background-dark/50 backdrop-blur-md shrink-0">
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Button -->
          <button class="lg:hidden text-white" @click="sidebarOpen = true">
            <span class="material-symbols-outlined">menu</span>
          </button>

          <!-- Desktop Collapse Button -->

          <h2 class="text-sm md:text-lg font-bold text-white flex items-center gap-2">
            Welcome,
            <span class="text-primary">{{ profile }}</span>
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
<style scoped>
.text-primary {
  color: #04c9cc;
}
</style>