<script setup lang="ts">
import { computed } from "vue"
import type { Appointment } from "../../stores/appointment.store"

interface Props {
  appointments: Appointment[]
  loading: boolean
  canEdit: boolean
  canDelete: boolean
  canConfirm: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  updateStatus: [id: string, status: string]
  delete: [id: string]
}>()

// Formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
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
const canConfirmAppointment = (appointment: Appointment) => {
  return props.canConfirm && appointment.status === "pending"
}

const canCompleteAppointment = (appointment: Appointment) => {
  return props.canConfirm && appointment.status === "confirmed"
}

const canCancelAppointment = (appointment: Appointment) => {
  return (
    props.canConfirm &&
    (appointment.status === "pending" || appointment.status === "confirmed")
  )
}
</script>

<template>
  <div class="overflow-x-auto">
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
      <p class="text-slate-400 mt-4">No hay citas para mostrar</p>
    </div>

    <!-- Table -->
    <table v-else class="w-full">
      <thead>
        <tr class="border-b border-slate-700">
          <th class="text-left py-3 px-4 text-sm font-semibold text-slate-300">
            Paciente
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-slate-300">
            Doctor
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-slate-300">
            Servicio
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-slate-300">
            Fecha
          </th>
          <th class="text-left py-3 px-4 text-sm font-semibold text-slate-300">
            Estado
          </th>
          <th class="text-right py-3 px-4 text-sm font-semibold text-slate-300">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="appointment in appointments"
          :key="appointment.id"
          class="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors"
        >
          <!-- Paciente -->
          <td class="py-4 px-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold"
              >
                {{ appointment.profiles?.first_name?.charAt(0) || "?" }}
              </div>
              <div>
                <p class="text-white font-medium">
                  {{ appointment.profiles?.first_name || "Sin nombre" }}
                </p>
                <p class="text-slate-400 text-xs">
                  Paciente
                </p>
              </div>
            </div>
          </td>

          <!-- Doctor -->
          <td class="py-4 px-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-cyan-400 text-sm">
                medical_services
              </span>
              <div>
                <p class="text-white text-sm">
                  {{ appointment.doctors?.name || "Sin asignar" }}
                </p>
                <p class="text-slate-400 text-xs">
                  {{ appointment.doctors?.specialty || "" }}
                </p>
              </div>
            </div>
          </td>

          <!-- Servicio -->
          <td class="py-4 px-4">
            <div class="flex items-center gap-2">
              <span
                v-if="appointment.services?.icon"
                class="material-symbols-outlined text-teal-400 text-sm"
              >
                {{ appointment.services.icon }}
              </span>
              <span class="text-white text-sm">
                {{ appointment.services?.title || "Sin servicio" }}
              </span>
            </div>
          </td>

          <!-- Fecha -->
          <td class="py-4 px-4">
            <div class="flex flex-col">
              <span class="text-white text-sm">{{ formatDate(appointment.date) }}</span>
              <span class="text-slate-400 text-xs">{{ formatTime(appointment.date) }}</span>
            </div>
          </td>

          <!-- Estado -->
          <td class="py-4 px-4">
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
              :class="statusBadge(appointment.status)"
            >
              {{ statusLabel(appointment.status) }}
            </span>
          </td>

          <!-- Acciones -->
          <td class="py-4 px-4">
            <div class="flex items-center justify-end gap-2">
              <!-- Confirmar -->
              <button
                v-if="canConfirmAppointment(appointment)"
                @click="emit('updateStatus', appointment.id, 'confirmed')"
                class="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                title="Confirmar cita"
              >
                <span class="material-symbols-outlined text-sm">check_circle</span>
              </button>

              <!-- Completar -->
              <button
                v-if="canCompleteAppointment(appointment)"
                @click="emit('updateStatus', appointment.id, 'completed')"
                class="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                title="Completar cita"
              >
                <span class="material-symbols-outlined text-sm">done_all</span>
              </button>

              <!-- Cancelar -->
              <button
                v-if="canCancelAppointment(appointment)"
                @click="emit('updateStatus', appointment.id, 'cancelled')"
                class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                title="Cancelar cita"
              >
                <span class="material-symbols-outlined text-sm">cancel</span>
              </button>

              <!-- Eliminar -->
              <button
                v-if="props.canDelete"
                @click="emit('delete', appointment.id)"
                class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                title="Eliminar cita"
              >
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>

              <!-- Ver detalles -->
              <button
                class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title="Ver detalles"
              >
                <span class="material-symbols-outlined text-sm">visibility</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
