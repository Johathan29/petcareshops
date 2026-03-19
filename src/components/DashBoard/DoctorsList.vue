<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useDoctorStore } from "../../stores/doctor.store"
import { useAuthStore } from "../../stores/auth.store"

interface Props {
  selectable?: boolean
  adminView?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  adminView: false,
})

const emit = defineEmits<{
  (e: "select", doctor: any): void
}>()

const doctorStore = useDoctorStore()
const authStore = useAuthStore()

const loading = ref(false)
const searchQuery = ref("")
const selectedDoctorId = ref<string | null>(null)

const doctors = computed(() => {
  let filtered = doctorStore.doctors

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((d) => {
      return (
        d.name?.toLowerCase().includes(query) ||
        d.specialty?.toLowerCase().includes(query)
      )
    })
  }

  return filtered
})

const handleSelect = (doctor: any) => {
  if (props.selectable) {
    selectedDoctorId.value = doctor.id
    emit("select", doctor)
  }
}

onMounted(async () => {
  loading.value = true
  await doctorStore.fetch()
  loading.value = false
})
</script>

<template>
  <div class="glass-card rounded-2xl p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">medical_services</span>
        {{ adminView ? "Todos los Doctores" : "Doctores Disponibles" }}
      </h2>
      <div class="relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          search
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar doctor..."
          class="pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
        progress_activity
      </span>
      <p class="text-slate-400 mt-4">Cargando doctores...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="doctors.length === 0" class="text-center py-12">
      <span class="material-symbols-outlined text-4xl text-slate-600">
        person_off
      </span>
      <p class="text-slate-400 mt-4">No hay doctores disponibles</p>
    </div>

    <!-- Doctors grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="doctor in doctors"
        :key="doctor.id"
        @click="handleSelect(doctor)"
        :class="[
          'p-4 rounded-xl bg-slate-800/50 border transition-all cursor-pointer',
          selectedDoctorId === doctor.id
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-slate-700 hover:border-cyan-500/30',
        ]"
      >
        <!-- Header -->
        <div class="flex items-start gap-3 mb-3">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
            {{ doctor.first_name?.charAt(0) || doctor.name?.charAt(0) || "D" }}
          </div>
          <div class="flex-1">
            <h3 class="text-white font-bold">
              {{ doctor.name || `Dr. ${doctor.first_name || ""} ${doctor.last_name || ""}` }}
            </h3>
            <p class="text-cyan-400 text-sm">{{ doctor.specialty || "Especialidad" }}</p>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-slate-400">
            <span class="material-symbols-outlined text-sm">email</span>
            <span>{{ doctor.email || "Sin email" }}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="material-symbols-outlined text-sm">phone</span>
            <span>{{ doctor.phone || "Sin teléfono" }}</span>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
          <div class="text-center">
            <p class="text-lg font-bold text-cyan-400">{{ doctor.appointments_count || 0 }}</p>
            <p class="text-xs text-slate-400">Citas</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-green-400">{{ doctor.reviews_count || 0 }}</p>
            <p class="text-xs text-slate-400">Reseñas</p>
          </div>
          <div class="text-center">
            <p class="text-lg font-bold text-yellow-400">{{ doctor.rating || "N/A" }}</p>
            <p class="text-xs text-slate-400">Rating</p>
          </div>
        </div>

        <!-- Admin actions -->
        <div v-if="adminView" class="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2">
          <button class="flex-1 px-3 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium transition-colors">
            Ver Detalles
          </button>
          <button class="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm transition-colors">
            <span class="material-symbols-outlined text-sm">edit</span>
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
