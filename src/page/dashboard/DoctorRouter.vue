<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from "../../stores/auth.store"
import DoctorDashboard from "../../components/DashBoard/DoctorDashboard.vue"
import AdminDoctorsDashboard from "../../components/DashBoard/AdminDoctorsDashboard.vue"

const authStore = useAuthStore()
const loading = ref(true)

// Verificar rol del usuario
const isAdmin = computed(() => {
  const role = authStore.profile?.role
  return role === "admin" || role === "super_admin"
})

const isDoctor = computed(() => {
  return authStore.profile?.is_doctor || false
})

onMounted(async () => {
  await authStore.init()
  loading.value = false
})
</script>

<template>
  <div v-if="loading" class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div class="text-center">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando dashboard...</p>
    </div>
  </div>

  <template v-else>
    <!-- Admin ve el dashboard de administración de doctores -->
    <AdminDoctorsDashboard v-if="isAdmin" />

    <!-- Doctor ve su panel personal -->
    <DoctorDashboard v-else-if="isDoctor" />

    <!-- Usuario sin rol de doctor o admin -->
    <div v-else class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div class="text-center max-w-md mx-auto p-8">
        <span class="material-symbols-outlined text-6xl text-red-400 mb-4">error</span>
        <h1 class="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
        <p class="text-slate-400 mb-6">
          No tienes permisos para acceder a esta sección.
        </p>
        <p class="text-sm text-slate-500">
          Debes ser doctor o administrador para ver este panel.
        </p>
        <a
          href="/profile"
          class="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold transition-all"
        >
          Ir a mi Perfil
        </a>
      </div>
    </div>
  </template>
</template>
