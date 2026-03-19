<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useAuthStore } from "../../stores/auth.store"

interface Props {
  doctorId?: string
  adminView?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  doctorId: "",
  adminView: false,
})

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()

const loading = ref(false)
const filterStatus = ref<"all" | "pending" | "confirmed" | "cancelled" | "completed" | "rejected">("all")
const selectedAppointment = ref<any>(null)
const showRejectModal = ref(false)
const rejectReason = ref("")

const filteredAppointments = computed(() => {
  let appointments = appointmentStore.appointments

  if (props.doctorId) {
    appointments = appointments.filter((apt) => apt.doctor_id === props.doctorId)
  } else if (!props.adminView && authStore.user) {
    const doctorProfile = authStore.profile
    if (doctorProfile?.is_doctor) {
      appointments = appointments.filter((apt) => apt.doctor_id === doctorProfile.id)
    }
  }

  if (filterStatus.value !== "all") {
    appointments = appointments.filter((apt) => apt.status === filterStatus.value)
  }

  return appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const stats = computed(() => {
  const appointments = filteredAppointments.value
  return {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled" || a.status === "rejected").length,
  }
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
}

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

const handleAccept = async (id: string) => {
  await appointmentStore.updateStatus(id, "confirmed")
}

const handleRejectClick = (appointment: any) => {
  selectedAppointment.value = appointment
  rejectReason.value = ""
  showRejectModal.value = true
}

const handleReject = async () => {
  if (selectedAppointment.value) {
    await appointmentStore.updateStatus(selectedAppointment.value.id, "rejected")
    showRejectModal.value = false
    selectedAppointment.value = null
    rejectReason.value = ""
  }
}

const handleComplete = async (id: string) => {
  await appointmentStore.updateStatus(id, "completed")
}

const handleCancel = async (id: string) => {
  await appointmentStore.updateStatus(id, "cancelled")
}

watch(() => props.doctorId, async (newId) => {
  if (newId) {
    loading.value = true
    await appointmentStore.fetch({ doctor_id: newId })
    loading.value = false
  }
}, { immediate: true })

onMounted(async () => {
  loading.value = true
  if (props.doctorId) {
    await appointmentStore.fetch({ doctor_id: props.doctorId })
  } else {
    await appointmentStore.fetch()
  }
  loading.value = false
})
</script>

<template>
  <div class="glass-card rounded-2xl p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">calendar_month</span>
        {{ adminView ? "Todas las Citas" : "Mis Citas" }}
      </h2>
      <select
        v-model="filterStatus"
        class="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
      >
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="confirmed">Confirmadas</option>
        <option value="completed">Completadas</option>
        <option value="cancelled">Canceladas</option>
        <option value="rejected">Rechazadas</option>
      </select>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
      <div class="text-center p-3 rounded-xl bg-slate-800/50 border border-slate-700">
        <p class="text-2xl font-bold text-white">{{ stats.total }}</p>
        <p class="text-xs text-slate-400">Total</p>
      </div>
      <div class="text-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
        <p class="text-2xl font-bold text-yellow-400">{{ stats.pending }}</p>
        <p class="text-xs text-yellow-400">Pendientes</p>
      </div>
      <div class="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <p class="text-2xl font-bold text-green-400">{{ stats.confirmed }}</p>
        <p class="text-xs text-green-400">Confirmadas</p>
      </div>
      <div class="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <p class="text-2xl font-bold text-blue-400">{{ stats.completed }}</p>
        <p class="text-xs text-blue-400">Completadas</p>
      </div>
      <div class="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
        <p class="text-2xl font-bold text-red-400">{{ stats.cancelled }}</p>
        <p class="text-xs text-red-400">Canceladas</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">progress_activity</span>
      <p class="text-slate-400 mt-4">Cargando citas...</p>
    </div>

    <div v-else-if="filteredAppointments.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600">event_busy</span>
      <p class="text-slate-400 mt-4">No hay citas para mostrar</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="appointment in filteredAppointments"
        :key="appointment.id"
        class="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
      >
        <div class="text-center min-w-[70px]">
          <p class="text-sm font-bold text-white">{{ formatDate(appointment.date) }}</p>
          <p class="text-xs text-cyan-400">{{ formatTime(appointment.date) }}</p>
        </div>

        <div class="flex-1">
          <p class="text-white font-medium">{{ appointment.profiles?.first_name || "Paciente" }}</p>
          <p class="text-slate-400 text-sm">{{ appointment.services?.title || "Servicio" }}</p>
          <p v-if="appointment.notes" class="text-slate-500 text-xs mt-1">{{ appointment.notes }}</p>
        </div>

        <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium border" :class="statusBadge(appointment.status)">
          {{ statusLabel(appointment.status) }}
        </span>

        <div class="flex items-center gap-2">
          <template v-if="appointment.status === 'pending'">
            <button @click="handleAccept(appointment.id)" class="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors" title="Aceptar">
              <span class="material-symbols-outlined text-sm">check</span>
            </button>
            <button @click="handleRejectClick(appointment)" class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" title="Rechazar">
              <span class="material-symbols-outlined text-sm">close</span>
            </button>
          </template>

          <template v-else-if="appointment.status === 'confirmed'">
            <button @click="handleComplete(appointment.id)" class="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors" title="Completar">
              <span class="material-symbols-outlined text-sm">task_alt</span>
            </button>
            <button @click="handleCancel(appointment.id)" class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors" title="Cancelar">
              <span class="material-symbols-outlined text-sm">cancel</span>
            </button>
          </template>
        </div>
      </div>
    </div>

    <div v-if="showRejectModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div class="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10">
        <h3 class="text-xl font-bold text-white mb-4">Rechazar Cita</h3>
        <p class="text-slate-400 text-sm mb-4">¿Estás seguro de rechazar esta cita?</p>

        <div class="mb-4">
          <label class="block text-sm text-slate-400 mb-2">Motivo (opcional)</label>
          <textarea
            v-model="rejectReason"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
            placeholder="Ingresa el motivo del rechazo..."
          ></textarea>
        </div>

        <div class="flex gap-3">
          <button @click="showRejectModal = false" class="flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors">
            Cancelar
          </button>
          <button @click="handleReject" class="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors">
            Rechazar Cita
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
