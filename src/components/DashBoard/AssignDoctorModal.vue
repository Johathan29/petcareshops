<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useAuthStore } from "../../stores/auth.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useRolesStore } from "../../stores/roles.store"
import { supabase } from "../../config/supabase"

const emit = defineEmits<{
  (e: "success"): void
  (e: "close"): void
}>()

const authStore = useAuthStore()
const doctorStore = useDoctorStore()
const rolesStore = useRolesStore()

const loading = ref(false)
const submitting = ref(false)
const users = ref<any[]>([])
const roles = ref<any[]>([])
const services = ref<any[]>([])

// Form data
const formData = ref({
  user_id: "",
  specialty: "",
  license: "",
  phone: "",
  bio: "",
  services: [] as string[],
})

// Validation errors
const errors = ref<Record<string, string>>({})

// Available specialties
const specialties = [
  "Medicina General",
  "Cirugía",
  "Dermatología",
  "Cardiología",
  "Neurología",
  "Oftalmología",
  "Pediatría",
  "Ginecología",
  "Ortopedia",
  "Oncología",
  "Radiología",
  "Anestesiología",
  "Psiquiatría",
  "Urgencias",
  "Veterinaria",
  "Odontología",
]

// Available services (checkboxes)
const availableServices = ref<any[]>([])

const selectedUser = computed(() => {
  return users.value.find((u) => u.id === formData.value.user_id)
})

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.user_id) {
    errors.value.user_id = "Debe seleccionar un usuario"
  }

  if (!formData.value.specialty) {
    errors.value.specialty = "La especialidad es requerida"
  }

  if (!formData.value.license) {
    errors.value.license = "El número de licencia es requerido"
  }

  if (!formData.value.phone) {
    errors.value.phone = "El teléfono es requerido"
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    // Create doctor record
    const doctorData = {
      user_id: formData.value.user_id,
      specialty: formData.value.specialty,
      license: formData.value.license,
      phone: formData.value.phone,
      bio: formData.value.bio || null,
      services: formData.value.services,
      created_at: new Date().toISOString(),
    }

    const { error: doctorError } = await supabase
      .from("doctors")
      .insert(doctorData)

    if (doctorError) throw doctorError

    // Update user profile to mark as doctor
    if (formData.value.user_id) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ is_doctor: true })
        .eq("id", formData.value.user_id)

      if (profileError) throw profileError
    }

    emit("success")
    emit("close")
  } catch (error: any) {
    console.error("[AssignDoctorModal] Submit error:", error)
    errors.value.submit = error.message || "Error al asignar doctor"
  } finally {
    submitting.value = false
  }
}

const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, first_name, last_name, phone, is_doctor")
      .eq("is_doctor", false)
      .order("first_name")

    if (error) throw error
    users.value = data || []
  } catch (error: any) {
    console.error("[AssignDoctorModal] Fetch users error:", error)
  }
}

const fetchServices = async () => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, title, description")
      .order("title")

    if (error) throw error
    availableServices.value = data || []
  } catch (error: any) {
    console.error("[AssignDoctorModal] Fetch services error:", error)
  }
}

const toggleService = (serviceId: string) => {
  const index = formData.value.services.indexOf(serviceId)
  if (index === -1) {
    formData.value.services.push(serviceId)
  } else {
    formData.value.services.splice(index, 1)
  }
}

onMounted(async () => {
  loading.value = true
  await fetchUsers()
  await fetchServices()
  loading.value = false
})
</script>

<template>
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div class="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <div>
          <h2 class="text-2xl font-bold text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">person_add</span>
            Asignar Doctor
          </h2>
          <p class="text-slate-400 text-sm mt-1">
            Asigna un usuario como doctor con sus especialidades y servicios
          </p>
        </div>
        <button
          @click="emit('close')"
          class="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span class="material-symbols-outlined text-white">close</span>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
          <span class="material-symbols-outlined text-4xl text-slate-600 animate-spin">
            progress_activity
          </span>
          <p class="text-slate-400 mt-4">Cargando datos...</p>
        </div>

        <!-- Form -->
        <template v-else>
          <!-- User selection -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Usuario <span class="text-red-400">*</span>
            </label>
            <select
              v-model="formData.user_id"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.user_id }"
            >
              <option value="">Seleccionar usuario...</option>
              <option
                v-for="user in users"
                :key="user.id"
                :value="user.id"
              >
                {{ user.first_name }} {{ user.last_name }} - {{ user.email }}
              </option>
            </select>
            <p v-if="errors.user_id" class="text-red-400 text-sm mt-1">
              {{ errors.user_id }}
            </p>
          </div>

          <!-- Selected user info -->
          <div v-if="selectedUser" class="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
                {{ selectedUser.first_name?.charAt(0) || "U" }}
              </div>
              <div>
                <p class="text-white font-medium">
                  {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                </p>
                <p class="text-slate-400 text-sm">{{ selectedUser.email }}</p>
              </div>
            </div>
          </div>

          <!-- Specialty -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Especialidad <span class="text-red-400">*</span>
            </label>
            <select
              v-model="formData.specialty"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.specialty }"
            >
              <option value="">Seleccionar especialidad...</option>
              <option
                v-for="spec in specialties"
                :key="spec"
                :value="spec"
              >
                {{ spec }}
              </option>
            </select>
            <p v-if="errors.specialty" class="text-red-400 text-sm mt-1">
              {{ errors.specialty }}
            </p>
          </div>

          <!-- License -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Número de Licencia <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.license"
              type="text"
              placeholder="Ej: 12345678"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.license }"
            />
            <p v-if="errors.license" class="text-red-400 text-sm mt-1">
              {{ errors.license }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Teléfono <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Ej: +1234567890"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="text-red-400 text-sm mt-1">
              {{ errors.phone }}
            </p>
          </div>

          <!-- Bio -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Biografía
            </label>
            <textarea
              v-model="formData.bio"
              rows="3"
              placeholder="Breve descripción profesional del doctor..."
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Services (checkboxes) -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-3">
              Servicios
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                v-for="service in availableServices"
                :key="service.id"
                class="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700 cursor-pointer hover:border-cyan-500/30 transition-colors"
              >
                <input
                  type="checkbox"
                  :checked="formData.services.includes(service.id)"
                  @change="toggleService(service.id)"
                  class="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                />
                <div>
                  <p class="text-white text-sm font-medium">{{ service.title }}</p>
                  <p class="text-slate-400 text-xs">{{ service.description }}</p>
                </div>
              </label>
            </div>
            <p v-if="availableServices.length === 0" class="text-slate-400 text-sm">
              No hay servicios disponibles
            </p>
          </div>

          <!-- Submit error -->
          <div v-if="errors.submit" class="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p class="text-red-400 text-sm">{{ errors.submit }}</p>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="flex gap-3 p-6 border-t border-white/10">
        <button
          @click="emit('close')"
          class="flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="handleSubmit"
          :disabled="submitting || loading"
          class="flex-1 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span v-if="submitting" class="material-symbols-outlined text-sm animate-spin">
            progress_activity
          </span>
          {{ submitting ? "Asignando..." : "Asignar Doctor" }}
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
