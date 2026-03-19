<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useServicesStore } from "../../stores/service.store"

const appointmentStore = useAppointmentStore()
const doctorStore = useDoctorStore()
const servicesStore = useServicesStore()

const loading = ref(false)
const limit = ref(10)

// Completed consultations sorted by date
const recentConsultations = computed(() => {
  return appointmentStore.appointments
    .filter((apt) => apt.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit.value)
})

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
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

// Get doctor name
const getDoctorName = (appointment: any) => {
  if (appointment.doctors?.name) {
    return appointment.doctors.name
  }
  return `Dr. ${appointment.doctors?.first_name || "Sin nombre"}`
}

// Get specialty
const getSpecialty = (appointment: any) => {
  return appointment.doctors?.specialty || "Especialidad"
}

// Get service name
const getServiceName = (appointment: any) => {
  return appointment.services?.title || "Servicio"
}

// Get patient name
const getPatientName = (appointment: any) => {
  const firstName = appointment.profiles?.first_name || "Paciente"
  const lastName = appointment.profiles?.last_name || ""
  return `${firstName} ${lastName}`.trim()
}

// Get doctor avatar initial
const getDoctorInitial = (appointment: any) => {
  const name = appointment.doctors?.name || appointment.doctors?.first_name || "D"
  return name.charAt(0).toUpperCase()
}

// Get patient avatar initial
const getPatientInitial = (appointment: any) => {
  const name = appointment.profiles?.first_name || "P"
  return name.charAt(0).toUpperCase()
}

onMounted(async () => {
  loading.value = true
  await appointmentStore.fetch()
  await doctorStore.fetch()
  await servicesStore.fetch()
  loading.value = false
})
</script>

<template>
  <div class="glass-card rounded-2xl p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-cyan-400">history</span>
          Consultas Recientes
        </h2>
        <p class="text-slate-400 text-sm mt-1">
          Historial de citas completadas
        </p>
      </div>
      <div class="text-center px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
        <p class="text-2xl font-bold text-cyan-400">{{ recentConsultations.length }}</p>
        <p class="text-xs text-cyan-400">Completadas</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando consultas...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="recentConsultations.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600">
        history_toggle_off
      </span>
      <p class="text-slate-400 mt-4">No hay consultas recientes</p>
    </div>

    <!-- Consultations list -->
    <div v-else class="space-y-3">
      <div
        v-for="appointment in recentConsultations"
        :key="appointment.id"
        class="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
      >
        <!-- Doctor avatar -->
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
            {{ getDoctorInitial(appointment) }}
          </div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <p class="text-white font-medium truncate">
              {{ getDoctorName(appointment) }}
            </p>
            <span class="text-slate-500">•</span>
            <p class="text-cyan-400 text-sm truncate">
              {{ getSpecialty(appointment) }}
            </p>
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
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">medical_services</span>
              {{ getServiceName(appointment) }}
            </span>
          </div>
        </div>

        <!-- Patient -->
        <div class="flex-shrink-0 text-right">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-medium">
              {{ getPatientInitial(appointment) }}
            </div>
            <div>
              <p class="text-slate-300 text-sm font-medium">
                {{ getPatientName(appointment) }}
              </p>
              <p class="text-slate-500 text-xs">Paciente</p>
            </div>
          </div>
        </div>

        <!-- Status badge -->
        <span class="inline-flex px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
          <span class="material-symbols-outlined text-xs mr-1">check_circle</span>
          Completada
        </span>
      </div>
    </div>

    <!-- View all button -->
    <div v-if="recentConsultations.length > 0" class="mt-6 text-center">
      <button
        @click="limit += 10"
        v-if="recentConsultations.length >= limit"
        class="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors inline-flex items-center gap-2"
      >
        <span class="material-symbols-outlined text-sm">expand_more</span>
        Ver más
      </button>
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
