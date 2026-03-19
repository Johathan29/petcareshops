<script setup lang="ts">
import { ref, computed } from "vue"
import { useDoctorStore } from "../../stores/doctor.store"
import { useServiceStore } from "../../stores/service.store"

interface Filters {
  date_from: string
  date_to: string
  doctor_id: string
  service_id: string
  status: string
  user_id: string
}

const props = defineProps<{
  filters: Filters
}>()

const emit = defineEmits<{
  apply: [filters: Filters]
  clear: []
}>()

const doctorStore = useDoctorStore()
const serviceStore = useServiceStore()

// Filtros locales
const localFilters = ref<Filters>({ ...props.filters })

// Opciones de estado
const statusOptions = [
  { value: "", label: "Todos los estados" },
  { value: "pending", label: "Pendientes" },
  { value: "confirmed", label: "Confirmadas" },
  { value: "cancelled", label: "Canceladas" },
  { value: "completed", label: "Completadas" },
  { value: "rejected", label: "Rechazadas" },
]

// Doctores
const doctors = computed(() => doctorStore.doctors)

// Servicios
const services = computed(() => serviceStore.services)

// Aplicar filtros
const applyFilters = () => {
  emit("apply", localFilters.value)
}

// Limpiar filtros
const clearFilters = () => {
  localFilters.value = {
    date_from: "",
    date_to: "",
    doctor_id: "",
    service_id: "",
    status: "",
    user_id: "",
  }
  emit("clear")
}

// Resetear filtros locales cuando cambian los props
const resetLocalFilters = () => {
  localFilters.value = { ...props.filters }
}
</script>

<template>
  <div class="glass-card rounded-xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">filter_list</span>
        Filtros
      </h3>
      <button
        @click="clearFilters"
        class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
      >
        <span class="material-symbols-outlined text-sm">clear_all</span>
        Limpiar
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Fecha desde -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">calendar_today</span>
            Desde
          </span>
        </label>
        <input
          v-model="localFilters.date_from"
          type="date"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
        />
      </div>

      <!-- Fecha hasta -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">calendar_month</span>
            Hasta
          </span>
        </label>
        <input
          v-model="localFilters.date_to"
          type="date"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
        />
      </div>

      <!-- Doctor -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">person</span>
            Doctor
          </span>
        </label>
        <select
          v-model="localFilters.doctor_id"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
        >
          <option value="">Todos los doctores</option>
          <option
            v-for="doctor in doctors"
            :key="doctor.id"
            :value="doctor.id"
          >
            {{ doctor.name }} - {{ doctor.specialty }}
          </option>
        </select>
      </div>

      <!-- Servicio -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">medical_services</span>
            Servicio
          </span>
        </label>
        <select
          v-model="localFilters.service_id"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
        >
          <option value="">Todos los servicios</option>
          <option
            v-for="service in services"
            :key="service.id"
            :value="service.id"
          >
            {{ service.title }}
          </option>
        </select>
      </div>

      <!-- Estado -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">status</span>
            Estado
          </span>
        </label>
        <select
          v-model="localFilters.status"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm"
        >
          <option
            v-for="option in statusOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Botón aplicar -->
      <div class="flex items-end">
        <button
          @click="applyFilters"
          class="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
        >
          <span class="material-symbols-outlined text-sm">search</span>
          Filtrar
        </button>
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
