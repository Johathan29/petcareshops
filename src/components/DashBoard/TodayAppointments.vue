<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useAuthStore } from "../../stores/auth.store"

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const loading = ref(false)

// Citas de hoy
const todayAppointments = computed(() => {
  const today = new Date().toDateString()
  return appointmentStore.appointments.filter((apt) => {
    return new Date(apt.date).toDateString() === today
  })
})

// Citas pendientes de hoy
const pendingToday = computed(() => {
  return todayAppointments.value.filter((apt) => apt.status === "pending")
})

// Citas confirmadas de hoy
const confirmedToday = computed(() => {
  return todayAppointments.value.filter((apt) => apt.status === "confirmed")
})

// Formatear hora
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Badge de estado
const statusBadge = (status: string) => {
  const badges: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    rejected: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }
  return badges[status] || badges.pending
}

const statusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    cancelled: "Cancelada",
    completed: "Completada",
    rejected: "Rechazada",
  }
  return labels[status] || status
}

// Aceptar cita
const handleAccept = async (id: string) => {
  await appointmentStore.updateStatus(id, "confirmed")
}

// Rechazar cita
const handleReject = async (id: string) => {
  await appointmentStore.updateStatus(id, "rejected")
}

onMounted(async () => {
  loading.value = true
  await appointmentStore.fetch()
  loading.value = false
})
</script>

<template>
  <div class="glass-card rounded-2xl p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-cyan-400">today</span>
          Citas de Hoy
        </h2>
        <p class="text-slate-400 text-sm mt-1">
          {{ new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-center px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p class="text-2xl font-bold text-yellow-400">{{ pendingToday.length }}</p>
          <p class="text-xs text-yellow-400">Pendientes</p>
        </div>
        <div class="text-center px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <p class="text-2xl font-bold text-green-400">{{ confirmedToday.length }}</p>
          <p class="text-xs text-green-400">Confirmadas</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando citas...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="todayAppointments.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600">
        event_busy
      </span>
      <p class="text-slate-400 mt-4">No hay citas programadas para hoy</p>
    </div>

    <!-- Appointments list -->
    <div v-else class="space-y-3">
      <div
        v-for="appointment in todayAppointments"
        :key="appointment.id"
        class="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
      >
        <!-- Time -->
        <div class="text-center min-w-[80px]">
          <p class="text-lg font-bold text-white">{{ formatTime(appointment.date) }}</p>
          <p class="text-xs text-slate-400">{{ appointment.services?.title || "Servicio" }}</p>
        </div>

        <!-- Patient/Doctor info -->
        <div class="flex-1">
          <p class="text-white font-medium">
            {{ appointment.profiles?.first_name || "Paciente" }}
          </p>
          <p class="text-slate-400 text-sm">
            {{ appointment.doctors?.name || "Doctor" }} - {{ appointment.doctors?.specialty }}
          </p>
        </div>

        <!-- Status -->
        <span
          class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
          :class="statusBadge(appointment.status)"
        >
          {{ statusLabel(appointment.status) }}
        </span>

        <!-- Actions for pending -->
        <div v-if="appointment.status === 'pending'" class="flex items-center gap-2">
          <button
            @click="handleAccept(appointment.id)"
            class="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
            title="Aceptar"
          >
            <span class="material-symbols-outlined text-sm">check</span>
          </button>
          <button
            @click="handleReject(appointment.id)"
            class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            title="Rechazar"
          >
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
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
