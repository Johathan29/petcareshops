<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../../stores/auth.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useAppointmentStore } from "../../stores/appointment.store"
import TodayAppointments from "./TodayAppointments.vue"
import DoctorAppointments from "./DoctorAppointments.vue"
import DoctorDetail from "./DoctorDetail.vue"

const router = useRouter()
const authStore = useAuthStore()
const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()

const loading = ref(false)
const activeTab = ref<"overview" | "appointments" | "calendar">("overview")

// Check if user is doctor
const isDoctor = computed(() => {
  return authStore.profile?.is_doctor === true
})

// Get doctor profile
const doctorProfile = computed(() => {
  if (!authStore.profile?.id) return null
  return doctorStore.doctors.find((d) => d.user_id === authStore.profile?.id)
})

// Stats
const stats = computed(() => {
  const appointments = appointmentStore.appointments.filter(
    (apt) => apt.doctor_id === doctorProfile.value?.id
  )
  const today = new Date().toDateString()
  const todayAppointments = appointments.filter((apt) => {
    return new Date(apt.date).toDateString() === today
  })

  return {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    today: todayAppointments.length,
  }
})

// Tab labels
const tabs = [
  { id: "overview", label: "Resumen", icon: "dashboard" },
  { id: "appointments", label: "Citas", icon: "calendar_month" },
  { id: "calendar", label: "Calendario", icon: "calendar_view_month" },
]

// Get doctor's appointments
const doctorAppointments = computed(() => {
  if (!doctorProfile.value?.id) return []
  return appointmentStore.appointments.filter(
    (apt) => apt.doctor_id === doctorProfile.value?.id
  )
})

onMounted(async () => {
  loading.value = true

  // Initialize auth
  await authStore.init()

  // Check if user is doctor
  if (!isDoctor.value) {
    // Redirect or show error
    console.warn("User is not a doctor")
  }

  // Fetch data
  await doctorStore.fetch()
  if (doctorProfile.value?.id) {
    await appointmentStore.fetch({ doctor_id: doctorProfile.value.id })
  }

  loading.value = false
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="glass-card rounded-2xl p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
            {{ authStore.profile?.first_name?.charAt(0) || "D" }}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white">
              Panel del Doctor
            </h1>
            <p class="text-cyan-400 font-medium">
              {{ doctorProfile?.specialty || "Especialidad" }}
            </p>
            <p class="text-slate-400 text-sm mt-1">
              {{ authStore.fullName }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-center px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <p class="text-2xl font-bold text-cyan-400">{{ stats.today }}</p>
            <p class="text-xs text-cyan-400">Citas Hoy</p>
          </div>
          <div class="text-center px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p class="text-2xl font-bold text-yellow-400">{{ stats.pending }}</p>
            <p class="text-xs text-yellow-400">Pendientes</p>
          </div>
          <div class="text-center px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <p class="text-2xl font-bold text-green-400">{{ stats.confirmed }}</p>
            <p class="text-xs text-green-400">Confirmadas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not a doctor warning -->
    <div v-if="!isDoctor && !loading" class="glass-card rounded-2xl p-6 border-yellow-500/30">
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined text-4xl text-yellow-400">warning</span>
        <div>
          <h3 class="text-lg font-bold text-yellow-400">No eres doctor</h3>
          <p class="text-slate-400 text-sm mt-1">
            No tienes permisos de doctor para acceder a este panel.
          </p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando panel...</p>
    </div>

    <!-- Tabs -->
    <template v-else-if="isDoctor">
      <div class="glass-card rounded-2xl overflow-hidden">
        <div class="flex border-b border-white/10">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id as any"
            :class="[
              'flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2',
              activeTab === tab.id
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white',
            ]"
          >
            <span class="material-symbols-outlined text-sm">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </div>

        <div class="p-6">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                <p class="text-3xl font-bold text-white">{{ stats.total }}</p>
                <p class="text-sm text-slate-400 mt-1">Total Citas</p>
              </div>
              <div class="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p class="text-3xl font-bold text-yellow-400">{{ stats.pending }}</p>
                <p class="text-sm text-yellow-400 mt-1">Pendientes</p>
              </div>
              <div class="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p class="text-3xl font-bold text-green-400">{{ stats.confirmed }}</p>
                <p class="text-sm text-green-400 mt-1">Confirmadas</p>
              </div>
              <div class="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p class="text-3xl font-bold text-blue-400">{{ stats.completed }}</p>
                <p class="text-sm text-blue-400 mt-1">Completadas</p>
              </div>
            </div>

            <!-- Today Appointments -->
            <TodayAppointments />

            <!-- Doctor Info -->
            <DoctorDetail
              v-if="doctorProfile?.id"
              :doctor-id="doctorProfile.id"
            />
          </div>

          <!-- Appointments Tab -->
          <div v-else-if="activeTab === 'appointments'">
            <DoctorAppointments :doctor-id="doctorProfile?.id || ''" />
          </div>

          <!-- Calendar Tab -->
          <div v-else-if="activeTab === 'calendar'">
            <DoctorDetail
              v-if="doctorProfile?.id"
              :doctor-id="doctorProfile.id"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
