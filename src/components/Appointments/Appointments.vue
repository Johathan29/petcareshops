<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useAuthStore } from "../../stores/auth.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useServiceStore } from "../../stores/service.store"
import AppointmentFilters from "./AppointmentFilters.vue"
import AppointmentList from "./AppointmentList.vue"
import AppointmentCalendar from "./AppointmentCalendar.vue"
import AppointmentStats from "./AppointmentStats.vue"
import CreateAppointmentModal from "./CreateAppointmentModal.vue"

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const doctorStore = useDoctorStore()
const serviceStore = useServiceStore()

// Estado de la vista
const viewMode = ref<"list" | "calendar">("list")
const showFilters = ref(true)
const showStats = ref(true)
const showCreateModal = ref(false)

// Filtros activos
const activeFilters = ref({
  date_from: "",
  date_to: "",
  doctor_id: "",
  service_id: "",
  status: "",
  user_id: "",
})

// Paginación
const currentPage = ref(1)
const pageSize = ref(10)

// Citas filtradas
const filteredAppointments = computed(() => {
  let appointments = appointmentStore.appointments

  // Aplicar filtros
  if (activeFilters.value.date_from) {
    appointments = appointments.filter((a) => {
      return new Date(a.date) >= new Date(activeFilters.value.date_from)
    })
  }

  if (activeFilters.value.date_to) {
    appointments = appointments.filter((a) => {
      return new Date(a.date) <= new Date(activeFilters.value.date_to)
    })
  }

  if (activeFilters.value.doctor_id) {
    appointments = appointments.filter(
      (a) => a.doctor_id === activeFilters.value.doctor_id
    )
  }

  if (activeFilters.value.service_id) {
    appointments = appointments.filter(
      (a) => a.service_id === activeFilters.value.service_id
    )
  }

  if (activeFilters.value.status) {
    appointments = appointments.filter(
      (a) => a.status === activeFilters.value.status
    )
  }

  if (activeFilters.value.user_id) {
    appointments = appointments.filter(
      (a) => a.user_id === activeFilters.value.user_id
    )
  }

  return appointments
})

// Citas paginadas
const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredAppointments.value.slice(start, end)
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredAppointments.value.length / pageSize.value)
})

// Estadísticas
const stats = computed(() => {
  return appointmentStore.getStats()
})

// Verificar permisos
const canCreate = computed(() => {
  return authStore.hasAnyRole(["admin", "user"])
})

const canEdit = computed(() => {
  return authStore.hasAnyRole(["admin", "doctor"])
})

const canDelete = computed(() => {
  return authStore.isAdmin
})

const canConfirm = computed(() => {
  return authStore.hasAnyRole(["admin", "doctor"])
})

// Manejar filtros
const applyFilters = (filters: typeof activeFilters.value) => {
  activeFilters.value = filters
  currentPage.value = 1
}

const clearFilters = () => {
  activeFilters.value = {
    date_from: "",
    date_to: "",
    doctor_id: "",
    service_id: "",
    status: "",
    user_id: "",
  }
  currentPage.value = 1
}

// Manejar paginación
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Crear cita
const handleCreateSuccess = async () => {
  showCreateModal.value = false
  await appointmentStore.fetch()
}

// Actualizar estado
const handleStatusUpdate = async (id: string, status: string) => {
  await appointmentStore.updateStatus(id, status)
}

// Eliminar cita
const handleDelete = async (id: string) => {
  if (confirm("¿Estás seguro de eliminar esta cita?")) {
    await appointmentStore.delete(id)
  }
}

// Cargar datos iniciales
onMounted(async () => {
  await Promise.all([
    appointmentStore.fetch(),
    doctorStore.fetch(),
    serviceStore.fetch(),
  ])

  // Suscribirse a cambios en tiempo real
  appointmentStore.subscribeRealtime()
})

// Limpiar al desmontar
onUnmounted(() => {
  appointmentStore.unsubscribe()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white mb-1">
          Gestión de Citas
        </h1>
        <p class="text-slate-400 text-sm">
          Administra las citas médicas veterinarias
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Toggle View Mode -->
        <div class="flex rounded-lg bg-slate-800 p-1">
          <button
            @click="viewMode = 'list'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all"
            :class="
              viewMode === 'list'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-400 hover:text-white'
            "
          >
            <span class="material-symbols-outlined text-sm">view_list</span>
          </button>
          <button
            @click="viewMode = 'calendar'"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all"
            :class="
              viewMode === 'calendar'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-400 hover:text-white'
            "
          >
            <span class="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>

        <!-- Create Button -->
        <button
          v-if="canCreate"
          @click="showCreateModal = true"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25"
        >
          <span class="material-symbols-outlined text-sm">add</span>
          <span class="hidden sm:inline">Nueva Cita</span>
        </button>
      </div>
    </div>

    <!-- Stats -->
    <AppointmentStats v-if="showStats" :stats="stats" />

    <!-- Filters -->
    <AppointmentFilters
      v-if="showFilters"
      :filters="activeFilters"
      @apply="applyFilters"
      @clear="clearFilters"
    />

    <!-- Content -->
    <div class="glass-card rounded-xl p-6">
      <!-- List View -->
      <AppointmentList
        v-if="viewMode === 'list'"
        :appointments="paginatedAppointments"
        :loading="appointmentStore.loading"
        :can-edit="canEdit"
        :can-delete="canDelete"
        :can-confirm="canConfirm"
        @update-status="handleStatusUpdate"
        @delete="handleDelete"
      />

      <!-- Calendar View -->
      <AppointmentCalendar
        v-else
        :appointments="filteredAppointments"
        :loading="appointmentStore.loading"
      />

      <!-- Pagination -->
      <div
        v-if="viewMode === 'list' && totalPages > 1"
        class="mt-6 flex items-center justify-between border-t border-slate-700 pt-4"
      >
        <p class="text-slate-400 text-sm">
          Mostrando
          <span class="font-medium text-white">{{ paginatedAppointments.length }}</span>
          de
          <span class="font-medium text-white">{{ filteredAppointments.length }}</span>
          citas
        </p>

        <div class="flex items-center gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              class="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
              :class="
                currentPage === page
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              "
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
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
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
