<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useDoctorStore } from "../../stores/doctor.store"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useServicesStore } from "../../stores/service.store"
import DoctorCalendar from "../Doctor/DoctorCalendar.vue"

interface Props {
  doctorId?: string
  isAdmin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  doctorId: "",
  isAdmin: false,
})

const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()
const servicesStore = useServicesStore()

const loading = ref(false)
const activeTab = ref<"overview" | "appointments" | "services" | "calendar">("overview")

// Get current doctor
const doctor = computed(() => {
  if (props.doctorId) {
    return doctorStore.doctors.find((d) => d.id === props.doctorId)
  }
  return null
})

// Doctor's appointments
const doctorAppointments = computed(() => {
  if (!props.doctorId) return []
  return appointmentStore.appointments.filter((apt) => apt.doctor_id === props.doctorId)
})

// Stats
const stats = computed(() => {
  const appointments = doctorAppointments.value
  return {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled" || a.status === "rejected").length,
  }
})

// Doctor's services
const doctorServices = computed(() => {
  if (!doctor.value?.services || !Array.isArray(doctor.value.services)) {
    return []
  }
  return servicesStore.services.filter((s) => doctor.value?.services?.includes(s.id))
})

// Tab labels
const tabs = [
  { id: "overview", label: "Resumen", icon: "dashboard" },
  { id: "appointments", label: "Citas", icon: "calendar_month" },
  { id: "services", label: "Servicios", icon: "medical_services" },
  { id: "calendar", label: "Calendario", icon: "calendar_view_month" },
]

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

// Format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Status badge
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

// Accept appointment
const handleAccept = async (id: string) => {
  await appointmentStore.updateStatus(id, "confirmed")
}

// Reject appointment
const handleReject = async (id: string) => {
  await appointmentStore.updateStatus(id, "rejected")
}

// Complete appointment
const handleComplete = async (id: string) => {
  await appointmentStore.updateStatus(id, "completed")
}

// Cancel appointment
const handleCancel = async (id: string) => {
  await appointmentStore.updateStatus(id, "cancelled")
}

// Get patient name
const getPatientName = (appointment: any) => {
  const firstName = appointment.profiles?.first_name || "Paciente"
  const lastName = appointment.profiles?.last_name || ""
  return `${firstName} ${lastName}`.trim()
}

// Get patient initial
const getPatientInitial = (appointment: any) => {
  const name = appointment.profiles?.first_name || "P"
  return name.charAt(0).toUpperCase()
}

// Watch for doctorId changes
watch(() => props.doctorId, async (newId) => {
  if (newId) {
    loading.value = true
    await appointmentStore.fetch({ doctor_id: newId })
    loading.value = false
  }
}, { immediate: true })

onMounted(async () => {
  loading.value = true
  await doctorStore.fetch()
  await servicesStore.fetch()
  if (props.doctorId) {
    await appointmentStore.fetch({ doctor_id: props.doctorId })
  }
  loading.value = false
})
</script>

<template>
  <div class="glass-card rounded-2xl overflow-hidden">
    <!-- Doctor Header -->
    <div class="p-6 border-b border-white/10">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
            {{ doctor?.first_name?.charAt(0) || doctor?.name?.charAt(0) || "D" }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">
              {{ doctor?.name || `Dr. ${doctor?.first_name || ""} ${doctor?.last_name || ""}` }}
            </h2>
            <p class="text-cyan-400 font-medium">
              {{ doctor?.specialty || "Especialidad" }}
            </p>
            <div class="flex items-center gap-4 mt-2 text-sm text-slate-400">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">badge</span>
                {{ doctor?.license || "Sin licencia" }}
              </span>
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">phone</span>
                {{ doctor?.phone || "Sin teléfono" }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="isAdmin" class="flex items-center gap-2">
          <button class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
            <span class="material-symbols-outlined text-white">edit</span>
          </button>
        </div>
      </div>

      <!-- Bio -->
      <p v-if="doctor?.bio" class="mt-4 text-slate-300 text-sm">
        {{ doctor.bio }}
      </p>
    </div>

    <!-- Tabs -->
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

    <!-- Tab Content -->
    <div class="p-6">
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
          progress_activity
        </span>
        <p class="text-slate-400 mt-4">Cargando...</p>
      </div>

      <!-- Overview Tab -->
      <div v-else-if="activeTab === 'overview'" class="space-y-6">
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

        <!-- Recent Appointments -->
        <div>
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">schedule</span>
            Citas Recientes
          </h3>
          <div v-if="doctorAppointments.length === 0" class="text-center py-8">
            <span class="material-symbols-outlined text-4xl text-slate-600">event_busy</span>
            <p class="text-slate-400 mt-4">No hay citas</p>
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="appointment in doctorAppointments.slice(0, 5)"
              :key="appointment.id"
              class="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
            >
              <div class="text-center min-w-[70px]">
                <p class="text-sm font-bold text-white">{{ formatDate(appointment.date) }}</p>
                <p class="text-xs text-cyan-400">{{ formatTime(appointment.date) }}</p>
              </div>
              <div class="flex-1">
                <p class="text-white font-medium">{{ getPatientName(appointment) }}</p>
                <p class="text-slate-400 text-sm">{{ appointment.services?.title || "Servicio" }}</p>
              </div>
              <span
                class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
                :class="statusBadge(appointment.status)"
              >
                {{ statusLabel(appointment.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments Tab -->
      <div v-else-if="activeTab === 'appointments'" class="space-y-3">
        <div v-if="doctorAppointments.length === 0" class="text-center py-12">
          <span class="material-symbols-outlined text-4xl text-slate-600">event_busy</span>
          <p class="text-slate-400 mt-4">No hay citas</p>
        </div>
        <div
          v-else
          v-for="appointment in doctorAppointments"
          :key="appointment.id"
          class="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
        >
          <div class="text-center min-w-[70px]">
            <p class="text-sm font-bold text-white">{{ formatDate(appointment.date) }}</p>
            <p class="text-xs text-cyan-400">{{ formatTime(appointment.date) }}</p>
          </div>
          <div class="flex items-center gap-3 flex-1">
            <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-medium">
              {{ getPatientInitial(appointment) }}
            </div>
            <div>
              <p class="text-white font-medium">{{ getPatientName(appointment) }}</p>
              <p class="text-slate-400 text-sm">{{ appointment.services?.title || "Servicio" }}</p>
              <p v-if="appointment.notes" class="text-slate-500 text-xs mt-1">{{ appointment.notes }}</p>
            </div>
          </div>
          <span
            class="inline-flex px-3 py-1 rounded-full text-xs font-medium border"
            :class="statusBadge(appointment.status)"
          >
            {{ statusLabel(appointment.status) }}
          </span>
          <div class="flex items-center gap-2">
            <template v-if="appointment.status === 'pending'">
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
            </template>
            <template v-else-if="appointment.status === 'confirmed'">
              <button
                @click="handleComplete(appointment.id)"
                class="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                title="Completar"
              >
                <span class="material-symbols-outlined text-sm">task_alt</span>
              </button>
              <button
                @click="handleCancel(appointment.id)"
                class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                title="Cancelar"
              >
                <span class="material-symbols-outlined text-sm">cancel</span>
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Services Tab -->
      <div v-else-if="activeTab === 'services'" class="space-y-4">
        <div v-if="doctorServices.length === 0" class="text-center py-12">
          <span class="material-symbols-outlined text-4xl text-slate-600">medical_services</span>
          <p class="text-slate-400 mt-4">No hay servicios asignados</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="service in doctorServices"
            :key="service.id"
            class="p-4 rounded-xl bg-slate-800/50 border border-slate-700"
          >
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <span class="material-symbols-outlined text-cyan-400">
                  {{ service.icon || "medical_services" }}
                </span>
              </div>
              <div>
                <h4 class="text-white font-medium">{{ service.title }}</h4>
                <p class="text-slate-400 text-sm mt-1">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Tab -->
      <div v-else-if="activeTab === 'calendar'">
        <DoctorCalendar
          :appointments="doctorAppointments"
          :is-doctor-view="true"
        />
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
