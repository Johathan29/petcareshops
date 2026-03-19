<template>
  <section class="bg-card-dark rounded-xl border border-border-dark overflow-hidden flex flex-col">
    <div class="px-6 py-5 border-b border-border-dark flex items-center justify-between">
      <h2 class="text-white text-xl font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-primary">history</span>
        Citas de Servicios
      </h2>
      <div class="flex items-center gap-3">
        <!-- Filtro de estado -->
        <select
          v-model="statusFilter"
          class="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        >
          <option value="all">Todos los estados</option>
          <option value="completed">Completada</option>
          <option value="in_progress">En Proceso</option>
          <option value="pending">No Confirmada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>
    </div>

    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead class="bg-background-dark/50 text-slate-400 text-xs uppercase tracking-wider sticky top-0">
          <tr>
            <th class="px-6 py-3 font-semibold">Fecha</th>
            <th class="px-6 py-3 font-semibold">Mascota</th>
            <th class="px-6 py-3 font-semibold">Servicio</th>
            <th class="px-6 py-3 font-semibold">Monto</th>
            <th class="px-6 py-3 font-semibold">Estado</th>
            <th class="px-6 py-3 font-semibold text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#204a4b]">
          <tr v-if="loading" class="loading-row">
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="flex items-center justify-center gap-3 text-slate-400">
                <span class="material-symbols-outlined animate-spin">progress_activity</span>
                Cargando citas...
              </div>
            </td>
          </tr>

          <tr v-else-if="filteredAppointments.length === 0" class="empty-row">
            <td colspan="6" class="px-6 py-12 text-center text-slate-400">
              <span class="material-symbols-outlined text-4xl mb-2 block">event_busy</span>
              No hay citas registradas
            </td>
          </tr>

          <tr
            v-for="appointment in filteredAppointments"
            :key="appointment.id"
            class="hover:bg-[#00ced10e] transition-colors"
          >
            <!-- Fecha -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-500 text-sm">calendar_today</span>
                <span class="text-sm text-slate-300">{{ formatDate(appointment.date) }}</span>
              </div>
              <div class="text-xs text-slate-500 ml-6">{{ formatTime(appointment.date) }}</div>
            </td>

            <!-- Mascota -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  v-if="appointment.pet?.image_url"
                  class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                  :style="{ backgroundImage: `url('${appointment.pet.image_url}')` }"
                ></div>
                <div v-else class="size-10 rounded-full bg-border-dark flex items-center justify-center">
                  <span class="material-symbols-outlined text-slate-500 text-sm">pets</span>
                </div>
                <div>
                  <p class="text-white text-sm font-bold">{{ appointment.pet?.name || 'N/A' }}</p>
                  <p class="text-slate-500 text-xs">{{ appointment.user_name || 'Usuario' }}</p>
                </div>
              </div>
            </td>

            <!-- Servicio -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div
                  v-if="appointment.services?.icon"
                  class="size-8 rounded-md bg-primary/10 flex items-center justify-center"
                >
                  <span class="material-symbols-outlined text-primary text-sm">{{ appointment.services.icon }}</span>
                </div>
                <div>
                  <p class="text-white text-sm font-medium">{{ appointment.services?.title || 'Servicio' }}</p>
                  <p class="text-slate-500 text-xs">{{ appointment.services?.category || 'General' }}</p>
                </div>
              </div>
            </td>

            <!-- Monto -->
            <td class="px-6 py-4">
              <span class="text-primary text-sm font-bold">${{ formatPrice(appointment.services?.price || 0) }}</span>
            </td>

            <!-- Estado -->
            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border"
                :class="getStatusClasses(appointment.status)"
              >
                {{ getStatusLabel(appointment.status) }}
              </span>
            </td>

            <!-- Acciones -->
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <button
                  v-if="appointment.status !== 'completed' && appointment.status !== 'cancelled'"
                  @click="updateStatus(appointment.id, 'completed')"
                  class="p-2 rounded-lg hover:bg-green-500/10 text-green-500 transition-colors"
                  title="Marcar como completada"
                >
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                </button>
                <button
                  v-if="appointment.status !== 'completed' && appointment.status !== 'cancelled'"
                  @click="updateStatus(appointment.id, 'in_progress')"
                  class="p-2 rounded-lg hover:bg-amber-500/10 text-amber-500 transition-colors"
                  title="Marcar en proceso"
                >
                  <span class="material-symbols-outlined text-sm">schedule</span>
                </button>
                <button
                  v-if="appointment.status !== 'completed' && appointment.status !== 'cancelled'"
                  @click="updateStatus(appointment.id, 'cancelled')"
                  class="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                  title="Cancelar cita"
                >
                  <span class="material-symbols-outlined text-sm">cancel</span>
                </button>
                <button
                  @click="viewDetails(appointment)"
                  class="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
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

    <!-- Paginación simple -->
    <div v-if="totalPages > 1" class="px-6 py-4 border-t border-border-dark flex items-center justify-between">
      <p class="text-slate-400 text-sm">
        Mostrando {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredAppointments.length) }} de {{ filteredAppointments.length }} citas
      </p>
      <div class="flex items-center gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
        >
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        <span class="text-slate-400 text-sm">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
        >
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  </section>

  <!-- Modal de detalles -->
  <div v-if="selectedAppointment" class="modal-overlay" @click.self="selectedAppointment = null">
    <div class="glass-card modal-details">
      <div class="modal-header">
        <h3 class="text-lg font-semibold text-white">Detalles de la Cita</h3>
        <button class="close-btn" @click="selectedAppointment = null">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="detail-row">
          <span class="detail-label">Fecha:</span>
          <span class="detail-value">{{ formatDate(selectedAppointment.date) }} - {{ formatTime(selectedAppointment.date) }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Mascota:</span>
          <span class="detail-value">{{ selectedAppointment.pet?.name || 'N/A' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Servicio:</span>
          <span class="detail-value">{{ selectedAppointment.services?.title || 'N/A' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Descripción:</span>
          <span class="detail-value">{{ selectedAppointment.services?.description || 'N/A' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Monto:</span>
          <span class="detail-value text-primary font-bold">${{ formatPrice(selectedAppointment.services?.price || 0) }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Estado:</span>
          <span
            class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border"
            :class="getStatusClasses(selectedAppointment.status)"
          >
            {{ getStatusLabel(selectedAppointment.status) }}
          </span>
        </div>
        <div v-if="selectedAppointment.notes" class="detail-row">
          <span class="detail-label">Notas:</span>
          <span class="detail-value">{{ selectedAppointment.notes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAppointmentStore } from '../../../stores/appointment.store'
import { usePetStore } from '../../../stores/pet.store'

const appointmentStore = useAppointmentStore()
const petStore = usePetStore()

const loading = ref(true)
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectedAppointment = ref<any>(null)

const appointments = computed(() => appointmentStore.appointments)

const filteredAppointments = computed(() => {
  let filtered = [...appointments.value]

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(app => app.status === statusFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const totalPages = computed(() => Math.ceil(filteredAppointments.value.length / itemsPerPage.value))

const paginatedAppointments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredAppointments.value.slice(start, end)
})

watch(statusFilter, () => {
  currentPage.value = 1
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price: number) => {
  return price
}

const getStatusClasses = (status: string) => {
  const classes: Record<string, string> = {
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    in_progress: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    pending: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
  }
  return classes[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: 'Completada',
    in_progress: 'En Proceso',
    pending: 'No Confirmada',
    cancelled: 'Cancelada'
  }
  return labels[status] || status
}

const updateStatus = async (id: string, status: string) => {
  await appointmentStore.updateStatus(id, status)
}

const viewDetails = (appointment: any) => {
  selectedAppointment.value = appointment
}

onMounted(async () => {
  loading.value = true
  await Promise.all([
    appointmentStore.fetch(),
    petStore.fetch()
  ])
  loading.value = false
})
</script>

<style scoped>
.bg-card-dark {
  --tw-bg-opacity: 1;
  background-color: #1a2e30;
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(32 74 75 / var(--tw-border-opacity, 1));
}

.bg-background-dark\/50 {
  background-color: rgb(15 35 35 / 0.5);
}

.text-primary {
  color: rgb(0, 206, 209) !important;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(32, 74, 75, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 206, 209, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 206, 209, 0.5);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.glass-card {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-details {
  width: 100%;
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.modal-body {
  padding: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
}

.detail-value {
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}
</style>
