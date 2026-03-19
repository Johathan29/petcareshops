<script setup lang="ts">
import { ref, computed } from "vue"
import type { Appointment } from "../../stores/appointment.store"
import CreateAppointmentModal from "../Appointments/CreateAppointmentModal.vue"

interface Props {
  appointments: Appointment[]
}

const props = defineProps<Props>()

const showCreateModal = ref(false)

// Formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

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

// Citas futuras
const futureAppointments = computed(() => {
  const now = new Date()
  return props.appointments.filter((a) => new Date(a.date) >= now)
})

// Citas pasadas
const pastAppointments = computed(() => {
  const now = new Date()
  return props.appointments.filter((a) => new Date(a.date) < now)
})

// Manejar éxito en creación
const handleCreateSuccess = () => {
  showCreateModal.value = false
  // Aquí se podría recargar la lista
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">event</span>
        Mis Citas
      </h2>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25"
      >
        <span class="material-symbols-outlined text-sm">add</span>
        Nueva Cita
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="appointments.length === 0"
      class="text-center py-12"
    >
      <span class="material-symbols-outlined text-4xl text-slate-600">
        event_busy
      </span>
      <p class="text-slate-400 mt-4">No tienes citas programadas</p>
      <button
        @click="showCreateModal = true"
        class="mt-4 px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
      >
        Crear mi primera cita
      </button>
    </div>

    <!-- Future appointments -->
    <div v-if="futureAppointments.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-green-400">schedule</span>
        Citas Futuras
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="appointment in futureAppointments"
          :key="appointment.id"
          class="glass-card rounded-xl p-4 border border-slate-700 hover:border-cyan-500/30 transition-all"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span
                  v-if="appointment.services?.icon"
                  class="material-symbols-outlined text-teal-400 text-sm"
                >
                  {{ appointment.services.icon }}
                </span>
                <span class="text-white font-semibold">
                  {{ appointment.services?.title || "Sin servicio" }}
                </span>
              </div>
              <p class="text-slate-400 text-sm">
                {{ appointment.doctors?.name || "Doctor no asignado" }}
              </p>
            </div>
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
              :class="statusBadge(appointment.status)"
            >
              {{ statusLabel(appointment.status) }}
            </span>
          </div>

          <div class="flex items-center gap-4 text-sm text-slate-400 mb-3">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">calendar_today</span>
              {{ formatDate(appointment.date) }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              {{ formatTime(appointment.date) }}
            </span>
          </div>

          <div
            v-if="appointment.notes"
            class="p-3 rounded-lg bg-slate-800/50 border border-slate-700"
          >
            <p class="text-slate-400 text-xs mb-1">Notas:</p>
            <p class="text-slate-300 text-sm">{{ appointment.notes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Past appointments -->
    <div v-if="pastAppointments.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-slate-400">history</span>
        Historial de Citas
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="appointment in pastAppointments"
          :key="appointment.id"
          class="glass-card rounded-xl p-4 border border-slate-700 opacity-75"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span
                  v-if="appointment.services?.icon"
                  class="material-symbols-outlined text-teal-400 text-sm"
                >
                  {{ appointment.services.icon }}
                </span>
                <span class="text-white font-semibold">
                  {{ appointment.services?.title || "Sin servicio" }}
                </span>
              </div>
              <p class="text-slate-400 text-sm">
                {{ appointment.doctors?.name || "Doctor no asignado" }}
              </p>
            </div>
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
              :class="statusBadge(appointment.status)"
            >
              {{ statusLabel(appointment.status) }}
            </span>
          </div>

          <div class="flex items-center gap-4 text-sm text-slate-400">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">calendar_today</span>
              {{ formatDate(appointment.date) }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              {{ formatTime(appointment.date) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <CreateAppointmentModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @success="handleCreateSuccess"
    />
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
}
</style>
