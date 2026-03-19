<script setup lang="ts">
import { computed } from "vue"
import type { Appointment } from "../../stores/appointment.store"

interface Props {
  appointments: Appointment[]
  loading: boolean
  isDoctorView: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  confirm: [id: string]
  cancel: [id: string]
  complete: [id: string]
}>()

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

// Acciones disponibles
const canConfirm = (appointment: Appointment) => {
  return appointment.status === "pending"
}

const canComplete = (appointment: Appointment) => {
  return appointment.status === "confirmed"
}

const canCancel = (appointment: Appointment) => {
  return (
    appointment.status === "pending" || appointment.status === "confirmed"
  )
}

// Agrupar citas por fecha
const groupedAppointments = computed(() => {
  return props.appointments.reduce((acc, appt) => {
    const date = new Date(appt.date).toDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(appt)
    return acc
  }, {} as Record<string, Appointment[]>)
})

// Ordenar fechas
const sortedDates = computed(() => {
  return Object.keys(groupedAppointments.value).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )
})
</script>

<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando citas...</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="appointments.length === 0"
      class="text-center py-12"
    >
      <span class="material-symbols-outlined text-4xl text-slate-600">
        event_busy
      </span>
      <p class="text-slate-400 mt-4">
        {{ isDoctorView ? "No tienes citas programadas" : "No hay citas para mostrar" }}
      </p>
    </div>

    <!-- Grouped appointments -->
    <div
      v-for="date in sortedDates"
      v-else
      :key="date"
      class="space-y-3"
    >
      <!-- Date header -->
      <div class="flex items-center gap-3 pb-2 border-b border-slate-700">
        <span class="material-symbols-outlined text-cyan-400">calendar_today</span>
        <span class="text-white font-semibold capitalize">
          {{ formatDate(date) }}
        </span>
        <span class="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-xs">
          {{ groupedAppointments[date].length }} citas
        </span>
      </div>

      <!-- Appointments cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="appointment in groupedAppointments[date]"
          :key="appointment.id"
          class="glass-card rounded-xl p-4 border border-slate-700 hover:border-cyan-500/30 transition-all"
        >
          <div class="flex items-start justify-between gap-4 mb-3">
            <!-- Patient info -->
            <div class="flex items-start gap-3 flex-1">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0"
              >
                {{ appointment.profiles?.first_name?.charAt(0) || "?" }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white font-semibold">
                  {{ appointment.profiles?.first_name || "Sin nombre" }}
                </p>
                <p class="text-slate-400 text-sm truncate">
                  Paciente
                </p>
              </div>
            </div>

            <!-- Time & Status -->
            <div class="text-right">
              <div class="flex items-center gap-2 justify-end mb-2">
                <span class="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                <span class="text-white font-medium">{{ formatTime(appointment.date) }}</span>
              </div>
              <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
                :class="statusBadge(appointment.status)"
              >
                {{ statusLabel(appointment.status) }}
              </span>
            </div>
          </div>

          <!-- Service info -->
          <div class="flex items-center gap-2 mb-3 p-3 rounded-lg bg-slate-800/50">
            <span
              v-if="appointment.services?.icon"
              class="material-symbols-outlined text-teal-400 text-sm"
            >
              {{ appointment.services.icon }}
            </span>
            <div>
              <p class="text-white font-medium text-sm">
                {{ appointment.services?.title || "Sin servicio" }}
              </p>
              <p class="text-slate-400 text-xs">
                {{ appointment.services?.price ? `$${appointment.services.price}` : "Sin precio" }}
              </p>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="appointment.notes" class="mb-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700">
            <p class="text-slate-400 text-xs mb-1">Notas:</p>
            <p class="text-slate-300 text-sm">{{ appointment.notes }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-700">
            <!-- Confirmar -->
            <button
              v-if="canConfirm(appointment)"
              @click="emit('confirm', appointment.id)"
              class="px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium transition-colors flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">check_circle</span>
              Confirmar
            </button>

            <!-- Completar -->
            <button
              v-if="canComplete(appointment)"
              @click="emit('complete', appointment.id)"
              class="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-medium transition-colors flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">done_all</span>
              Completar
            </button>

            <!-- Cancelar -->
            <button
              v-if="canCancel(appointment)"
              @click="emit('cancel', appointment.id)"
              class="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-medium transition-colors flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">cancel</span>
              Cancelar
            </button>

            <!-- Ver más -->
            <button
              class="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium transition-colors flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-sm">visibility</span>
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
}
</style>
