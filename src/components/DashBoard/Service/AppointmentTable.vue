<template>
  <div class="glass-card appointment-table p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">Service Appointments</h3>
      <div class="flex items-center gap-2">
        <div class="search-box">
          <span class="material-symbols-outlined text-gray-400">search</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search..." 
            class="search-input"
          />
        </div>
        <button class="filter-btn" @click="showFilters = !showFilters">
          <span class="material-symbols-outlined">filter_list</span>
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="filters-panel mb-4">
      <div class="filter-group">
        <label class="filter-label">Status</label>
        <select v-model="selectedStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="filter-group">
        <label class="filter-label">Service</label>
        <select v-model="selectedService" class="filter-select">
          <option value="">All Services</option>
          <option value="veterinary">Veterinary</option>
          <option value="grooming">Grooming</option>
          <option value="training">Training</option>
          <option value="boarding">Boarding</option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="flex items-center justify-center h-48">
      <span class="material-symbols-outlined animate-spin text-blue-400">progress_activity</span>
    </div>
    
    <div v-else-if="filteredAppointments.length === 0" class="text-center py-8">
      <span class="material-symbols-outlined text-gray-500 text-4xl">event_busy</span>
      <p class="text-gray-400 mt-2">No appointments found</p>
    </div>
    
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Pet</th>
            <th>Service</th>
            <th>Date & Time</th>
            <th>Professional</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filteredAppointments" :key="appointment.id">
            <td>
              <div class="pet-info">
                <span class="pet-name">{{ appointment.petName }}</span>
                <span class="pet-type">({{ appointment.petType }})</span>
              </div>
            </td>
            <td>{{ formatService(appointment.service) }}</td>
            <td>
              <div class="datetime">
                <span class="material-symbols-outlined text-sm">calendar_today</span>
                <span>{{ appointment.date }}</span>
              </div>
              <div class="datetime">
                <span class="material-symbols-outlined text-sm">schedule</span>
                <span>{{ appointment.time }}</span>
              </div>
            </td>
            <td>{{ appointment.professional }}</td>
            <td>
              <span class="status-badge" :class="appointment.status">{{ appointment.status }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="action-btn" title="View" @click="$emit('view', appointment)">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
                <button class="action-btn" title="Edit" @click="$emit('edit', appointment)">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="action-btn" title="Cancel" @click="$emit('cancel', appointment)">
                  <span class="material-symbols-outlined">cancel</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Appointment {
  id: number
  petName: string
  petType: string
  service: string
  date: string
  time: string
  professional: string
  status: string
}

interface Props {
  appointments?: Appointment[]
}

const props = withDefaults(defineProps<Props>(), {
  appointments: () => []
})

defineEmits<{
  (e: 'view', appointment: Appointment): void
  (e: 'edit', appointment: Appointment): void
  (e: 'cancel', appointment: Appointment): void
}>()

const loading = ref(false)
const searchQuery = ref('')
const showFilters = ref(false)
const selectedStatus = ref('')
const selectedService = ref('')

const filteredAppointments = computed(() => {
  return props.appointments.filter(apt => {
    const matchesSearch = apt.petName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         apt.professional.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || apt.status === selectedStatus.value
    const matchesService = !selectedService.value || apt.service === selectedService.value
    return matchesSearch && matchesStatus && matchesService
  })
})

const formatService = (service: string) => {
  return service.charAt(0).toUpperCase() + service.slice(1)
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 6px 12px;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  width: 150px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.filter-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  color: white;
}

.filters-panel {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.filter-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  font-size: 13px;
}

td {
  color: white;
  font-size: 14px;
}

.pet-info {
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-weight: 600;
}

.pet-type {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.datetime {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  text-transform: capitalize;
}

.status-badge.pending {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.status-badge.confirmed {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.status-badge.completed {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.status-badge.cancelled {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
