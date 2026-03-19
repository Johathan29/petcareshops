<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAuthStore } from "../stores/auth.store"
import { useAppointmentStore } from "../stores/appointment.store"
import { useAdoptionStore } from "../stores/adoption.store"
import UserProfiles from "../components/User/UserProfiles.vue"
import UserAppointments from "../components/User/UserAppointments.vue"
import UserAdoptions from "../components/User/UserAdoptions.vue"
import UserSettings from "../components/User/UserSettings.vue"

const authStore = useAuthStore()
const appointmentStore = useAppointmentStore()
const adoptionStore = useAdoptionStore()

// Tab activa
const activeTab = ref<"profile" | "appointments" | "adoptions" | "settings">("profile")

// Estado de carga
const loading = ref(false)

// Citas del usuario
const userAppointments = computed(() => {
  if (!authStore.user) return []
  return appointmentStore.appointmentsByUser(authStore.user?.id)
})

// Adopciones del usuario
const userAdoptions = computed(() => {
  if (!authStore?.user) return []
  return adoptionStore.adoptions.filter((a) => a.user_id === authStore.user?.id)
})

// Estadísticas
const stats = computed(() => {
  return {
    appointments: userAppointments.value.length,
    adoptions: userAdoptions.value.length,
    pendingAdoptions: userAdoptions.value.filter((a) => a.status === "pending").length,
  }
})

// Cargar datos iniciales
onMounted(async () => {
  loading.value = true

  try {
    // Inicializar auth
    await authStore.init()

    // Cargar datos del usuario
    if (authStore.user) {
      await Promise.all([
        appointmentStore.fetch({ user_id: authStore.user.id }),
        adoptionStore.fetch(),
      ])
    }
  } catch (error) {
    console.error("Error loading profile:", error)
  } finally {
    loading.value = false
  }
})

// Tabs disponibles
const tabs = [
  {
    id: "profile",
    label: "Perfil",
    icon: "person",
  },
  {
    id: "appointments",
    label: "Mis Citas",
    icon: "event",
    badge: computed(() => {
      const pending = userAppointments.value.filter((a) => a.status === "pending").length
      return pending > 0 ? pending : null
    }),
  },
  {
    id: "adoptions",
    label: "Mis Adopciones",
    icon: "pets",
    badge: computed(() => {
      const pending = stats.value.pendingAdoptions
      return pending > 0 ? pending : null
    }),
  },
  {
    id: "settings",
    label: "Configuración",
    icon: "settings",
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
          progress_activity
        </span>
        <p class="text-slate-400 mt-4">Cargando perfil...</p>
      </div>

      <template v-else>
        <!-- Header -->
        <div class="glass-card rounded-2xl p-6 mb-6">
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div
              v-if="authStore.avatarUrl"
              class="w-24 h-24 rounded-full overflow-hidden border-4 border-cyan-500/30"
            >
              <img
                :src="authStore.avatarUrl"
                :alt="authStore.fullName"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-cyan-500/30"
            >
              {{ authStore.fullName?.charAt(0) || "U" }}
            </div>

            <!-- Info -->
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-white mb-1">
                {{ authStore.fullName || "Usuario" }}
              </h1>
              <p class="text-slate-400 mb-2">{{ authStore.user?.email }}</p>
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                >
                  {{ authStore.role || "Sin rol" }}
                </span>
                <span
                  v-if="authStore.profile?.is_online"
                  class="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30"
                >
                  <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  En línea
                </span>
              </div>
            </div>

            <!-- Stats -->
            <div class="hidden md:flex items-center gap-6">
              <div class="text-center">
                <p class="text-2xl font-bold text-cyan-400">{{ stats.appointments }}</p>
                <p class="text-slate-400 text-xs">Citas</p>
              </div>
              <div class="text-center">
                <p class="text-2xl font-bold text-teal-400">{{ stats.adoptions }}</p>
                <p class="text-slate-400 text-xs">Adopciones</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-2 mb-6 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id as any"
            class="px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex items-center gap-2"
            :class="[
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-400 hover:text-white hover:bg-slate-800/50'
            ]"
          >
            <span class="material-symbols-outlined">{{ tab.icon }}</span>
            {{ tab.label }}
            <span
              v-if="tab.badge"
              class="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold"
            >
              {{ tab.badge }}
            </span>
          </button>
        </div>

        <!-- Content -->
        <div class="glass-card rounded-2xl p-6">
          <!-- Profile Tab -->
          <UserProfiles
            v-if="activeTab === 'profile'"
            :user="authStore.profile"
          />

          <!-- Appointments Tab -->
          <UserAppointments
            v-else-if="activeTab === 'appointments'"
            :appointments="userAppointments"
          />

          <!-- Adoptions Tab -->
          <UserAdoptions
            v-else-if="activeTab === 'adoptions'"
            :adoptions="userAdoptions"
          />

          <!-- Settings Tab -->
          <UserSettings
            v-else-if="activeTab === 'settings'"
            :user="authStore.profile"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
