<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAppointmentStore } from "../../stores/appointment.store"
import { useAuthStore } from "../../stores/auth.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useServicesStore } from "../../stores/service.store"
import { z } from "zod"

const emit = defineEmits<{
  close: []
  success: []
}>()

const appointmentStore = useAppointmentStore()
const authStore = useAuthStore()
const doctorStore = useDoctorStore()
const serviceStore = useServicesStore()

const loading = ref(false)
const errors = ref<string[]>([])

// Schema de validación
const appointmentSchema = z.object({
  doctor_id: z.string().uuid("Debe seleccionar un doctor"),
  service_id: z.string().uuid("Debe seleccionar un servicio"),
  date: z.string().datetime("Fecha inválida"),
  notes: z.string().max(500, "Las notas no pueden exceder 500 caracteres").optional(),
})

// Form data
const formData = ref({
  doctor_id: "",
  service_id: "",
  date: "",
  time: "",
  notes: "",
})

// Doctores disponibles
const doctors = computed(() => doctorStore.doctors)

// Servicios disponibles
const services = computed(() => serviceStore.services)

// Fecha mínima (hoy)
const minDate = new Date().toISOString().split("T")[0]

// Validar formulario
const validateForm = () => {
  errors.value = []

  if (!formData.value.doctor_id) {
    errors.value.push("Debe seleccionar un doctor")
  }

  if (!formData.value.service_id) {
    errors.value.push("Debe seleccionar un servicio")
  }

  if (!formData.value.date) {
    errors.value.push("Debe seleccionar una fecha")
  }

  if (!formData.value.time) {
    errors.value.push("Debe seleccionar una hora")
  }

  if (formData.value.notes.length > 500) {
    errors.value.push("Las notas no pueden exceder 500 caracteres")
  }

  return errors.value.length === 0
}

// Enviar formulario
const handleSubmit = async () => {
  errors.value = []

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // Combinar fecha y hora
    const dateTime = new Date(`${formData.value.date}T${formData.value.time}`)

    // Crear cita
    const result = await appointmentStore.create({
      user_id: authStore.user?.id || "",
      doctor_id: formData.value.doctor_id,
      service_id: formData.value.service_id,
      date: dateTime.toISOString(),
      status: "pending",
      notes: formData.value.notes || undefined,
    })

    if (result.success) {
      emit("success")
    } else {
      errors.value.push(result.error || "Error al crear la cita")
    }
  } catch (error: any) {
    console.error("Error creating appointment:", error)
    errors.value.push(error.message || "Error al crear la cita")
  } finally {
    loading.value = false
  }
}

// Cargar datos iniciales
onMounted(async () => {
  await Promise.all([
    doctorStore.fetch(),
    serviceStore.fetch(),
  ])
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div
      class="glass-card rounded-2xl w-full max-w-lg relative overflow-hidden"
      v-motion
      :initial="{ opacity: 0, scale: 0.95, y: 20 }"
      :enter="{ opacity: 1, scale: 1, y: 0 }"
      :leave="{ opacity: 0, scale: 0.95, y: 20 }"
    >
      <!-- Header -->
      <div class="p-6 border-b border-slate-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">event</span>
            Nueva Cita
          </h2>
          <button
            @click="emit('close')"
            class="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <span class="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <!-- Errores -->
        <div
          v-if="errors.length > 0"
          class="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-red-400 text-sm">error</span>
            <span class="text-red-400 font-medium text-sm">Errores:</span>
          </div>
          <ul class="text-sm text-red-300 space-y-1">
            <li v-for="(error, index) in errors" :key="index">• {{ error }}</li>
          </ul>
        </div>

        <!-- Doctor -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">person</span>
              Doctor *
            </span>
          </label>
          <select
            v-model="formData.doctor_id"
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            :class="{ 'border-red-500': errors.includes('Debe seleccionar un doctor') }"
          >
            <option value="">Seleccionar doctor</option>
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
              Servicio *
            </span>
          </label>
          <select
            v-model="formData.service_id"
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            :class="{ 'border-red-500': errors.includes('Debe seleccionar un servicio') }"
          >
            <option value="">Seleccionar servicio</option>
            <option
              v-for="service in services"
              :key="service.id"
              :value="service.id"
            >
              {{ service.title }}
            </option>
          </select>
        </div>

        <!-- Fecha -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">calendar_today</span>
              Fecha *
            </span>
          </label>
          <input
            v-model="formData.date"
            type="date"
            :min="minDate"
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            :class="{ 'border-red-500': errors.includes('Debe seleccionar una fecha') }"
          />
        </div>

        <!-- Hora -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">schedule</span>
              Hora *
            </span>
          </label>
          <input
            v-model="formData.time"
            type="time"
            min="08:00"
            max="20:00"
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            :class="{ 'border-red-500': errors.includes('Debe seleccionar una hora') }"
          />
          <p class="text-xs text-slate-500 mt-1">
            Horario disponible: 8:00 AM - 8:00 PM
          </p>
        </div>

        <!-- Notas -->
        <div>
          <label class="block text-sm text-slate-400 mb-2">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">note</span>
              Notas
            </span>
          </label>
          <textarea
            v-model="formData.notes"
            rows="3"
            maxlength="500"
            placeholder="Motivo de la consulta, síntomas, etc."
            class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
          ></textarea>
          <p class="text-xs text-slate-500 mt-1 text-right">
            {{ formData.notes.length }}/500
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-700 flex justify-end gap-3">
        <button
          @click="emit('close')"
          class="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25"
        >
          <span v-if="loading" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
          <span v-else class="material-symbols-outlined text-sm">check</span>
          {{ loading ? "Creando..." : "Crear Cita" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
