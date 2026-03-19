<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useAuthStore } from "../../stores/auth.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useServicesStore } from "../../stores/service.store"
import DoctorCalendar from "../../components/Doctor/DoctorCalendar.vue"
import DoctorAppointmentsList from "../../components/Doctor/DoctorAppointmentsList.vue"
import AppointmentStats from "../../components/Appointments/AppointmentStats.vue"

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const doctorStore = useDoctorStore()
const serviceStore = useServicesStore()

// Vista activa
const activeView = ref<"calendar" | "list">("calendar")

// Estado de carga
const loading = ref(false)

// Doctor actual logueado
const currentDoctor = ref<any>(null)
const isDoctorView = ref(false)

// Estadísticas
const stats = computed(() => {
  return appointmentStore.getStats()
})

// Citas filtradas según el rol
const filteredAppointments = computed(() => {
  if (isDoctorView.value && currentDoctor.value) {
    return appointmentStore.appointmentsByDoctor(currentDoctor.value.id)
  }
  return appointmentStore.appointments
})

// Verificar si es doctor y cargar sus datos
onMounted(async () => {
  loading.value = true

  try {
    // Esperar a que auth store se inicialice
    await authStore.init()

    // Verificar rol del usuario
    if (authStore.isDoctor) {
      isDoctorView.value = true

      // Buscar el doctor asociado al usuario
      await doctorStore.fetch()
      currentDoctor.value = doctorStore.doctors.find(
        (d) => d.idUser === authStore.user?.id
      )

      if (currentDoctor.value) {
        // Cargar solo las citas de este doctor
        await appointmentStore.fetch({ doctor_id: currentDoctor.value.id })
      }
    } else {
      // Admin ve todas las citas
      await appointmentStore.fetch()
    }

    // Cargar servicios y doctores para referencias
    await Promise.all([
      serviceStore.fetch(),
      doctorStore.fetch(),
    ])

    // Suscribirse a cambios en tiempo real
    appointmentStore.subscribeRealtime()
  } catch (error) {
    console.error("Error loading doctor dashboard:", error)
  } finally {
    loading.value = false
  }
})

// Limpiar al desmontar
onUnmounted(() => {
  appointmentStore.unsubscribe()
})

// Confirmar cita
const handleConfirm = async (id: string) => {
  await appointmentStore.confirmAppointment(id)
}

// Cancelar cita
const handleCancel = async (id: string) => {
  await appointmentStore.cancelAppointment(id)
}

// Completar cita
const handleComplete = async (id: string) => {
  await appointmentStore.completeAppointment(id)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white mb-1">
          {{ isDoctorView ? "Mi Agenda" : "Gestión de Citas" }}
        </h1>
        <p class="text-slate-400 text-sm">
          {{ isDoctorView
            ? "Visualiza y gestiona tus citas programadas"
            : "Administra todas las citas médicas veterinarias"
          }}
        </p>
      </div>

      <!-- Toggle View -->
      <div class="flex rounded-lg bg-slate-800 p-1">
        <button
          @click="activeView = 'calendar'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-all"
          :class="
            activeView === 'calendar'
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-sm">calendar_month</span>
        </button>
        <button
          @click="activeView = 'list'"
          class="px-4 py-2 rounded-md text-sm font-medium transition-all"
          :class="
            activeView === 'list'
              ? 'bg-cyan-500 text-white'
              : 'text-slate-400 hover:text-white'
          "
        >
          <span class="material-symbols-outlined text-sm">view_list</span>
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando...</p>
    </div>

    <!-- Doctor info (solo para doctores) -->
    <div
      v-else-if="isDoctorView && currentDoctor"
      class="glass-card rounded-xl p-6 border border-cyan-500/20"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          {{ currentDoctor.name?.charAt(0) || "D" }}
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-white">
            {{ currentDoctor.name }}
          </h2>
          <p class="text-slate-400">
            {{ currentDoctor.specialty || "Especialidad no especificada" }}
          </p>
          <div class="flex items-center gap-4 mt-2 text-sm text-slate-400">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">email</span>
              {{ currentDoctor.email || "Sin email" }}
            </span>
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">phone</span>
              {{ currentDoctor.phone || "Sin teléfono" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <AppointmentStats v-if="!loading" :stats="stats" />

    <!-- Content -->
    <div class="glass-card rounded-xl p-6">
      <!-- Calendar View -->
      <DoctorCalendar
        v-if="activeView === 'calendar'"
        :appointments="filteredAppointments"
        :is-doctor-view="isDoctorView"
      />

      <!-- List View -->
      <DoctorAppointmentsList
        v-else
        :appointments="filteredAppointments"
        :loading="appointmentStore.loading"
        :is-doctor-view="isDoctorView"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        @complete="handleComplete"
      />
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
