<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useDoctorStore } from "../../stores/doctor.store"
import { useAppointmentStore } from "../../stores/appointment.store"
import DoctorsList from "./DoctorsList.vue"
import DoctorDetail from "./DoctorDetail.vue"
import AssignDoctorModal from "./AssignDoctorModal.vue"

const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()

const loading = ref(false)
const showAssignModal = ref(false)
const selectedDoctorId = ref<string | null>(null)
const showDoctorDetail = ref(false)

// Stats
const stats = computed(() => {
  const doctors = doctorStore.doctors
  const appointments = appointmentStore.appointments
  const today = new Date().toDateString()
  const todayAppointments = appointments.filter((apt) => {
    return new Date(apt.date).toDateString() === today
  })

  return {
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    today: todayAppointments.length,
  }
})

// Handle doctor selection from list
const handleSelectDoctor = (doctor: any) => {
  selectedDoctorId.value = doctor.id
  showDoctorDetail.value = true
}

// Handle assign doctor success
const handleAssignSuccess = () => {
  showAssignModal.value = false
  doctorStore.fetch()
}

// Close doctor detail
const closeDoctorDetail = () => {
  showDoctorDetail.value = false
  selectedDoctorId.value = null
}

onMounted(async () => {
  loading.value = true
  await doctorStore.fetch()
  await appointmentStore.fetch()
  loading.value = false
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="glass-card rounded-2xl p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">groups</span>
            Gestión de Doctores
          </h1>
          <p class="text-slate-400 text-sm mt-1">
            Administra los doctores y sus especialidades
          </p>
        </div>
        <button
          @click="showAssignModal = true"
          class="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors flex items-center gap-2"
        >
          <span class="material-symbols-outlined">person_add</span>
          Asignar Doctor
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div class="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700">
          <p class="text-3xl font-bold text-white">{{ stats.totalDoctors }}</p>
          <p class="text-sm text-slate-400 mt-1">Total Doctores</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <p class="text-3xl font-bold text-cyan-400">{{ stats.totalAppointments }}</p>
          <p class="text-sm text-cyan-400 mt-1">Total Citas</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p class="text-3xl font-bold text-yellow-400">{{ stats.pending }}</p>
          <p class="text-sm text-yellow-400 mt-1">Pendientes</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p class="text-3xl font-bold text-green-400">{{ stats.today }}</p>
          <p class="text-sm text-green-400 mt-1">Citas Hoy</p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando doctores...</p>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Doctor Detail View -->
      <div v-if="showDoctorDetail && selectedDoctorId">
        <div class="flex items-center gap-4 mb-4">
          <button
            @click="closeDoctorDetail"
            class="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center gap-2"
          >
            <span class="material-symbols-outlined">arrow_back</span>
            Volver
          </button>
          <h2 class="text-xl font-bold text-white">Detalle del Doctor</h2>
        </div>
        <DoctorDetail
          :doctor-id="selectedDoctorId"
          :is-admin="true"
        />
      </div>

      <!-- Doctors List View -->
      <div v-else>
        <DoctorsList
          :admin-view="true"
          :selectable="true"
          @select="handleSelectDoctor"
        />
      </div>
    </template>

    <!-- Assign Doctor Modal -->
    <AssignDoctorModal
      v-if="showAssignModal"
      @success="handleAssignSuccess"
      @close="showAssignModal = false"
    />
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
