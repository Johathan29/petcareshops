<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../../stores/auth.store"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name?: string
  phone?: string
  avatar_url?: string
  bio?: string
  role?: {
    name: string
  }
}

const props = defineProps<{
  user: UserProfile | null
}>()

const authStore = useAuthStore()

const editing = ref(false)
const formData = ref({
  first_name: "",
  last_name: "",
  phone: "",
  bio: "",
  avatar_url: "",
})

const loading = ref(false)
const error = ref("")
const success = ref("")

// Inicializar formulario
const initializeForm = () => {
  if (props.user) {
    formData.value = {
      first_name: props.user.first_name || "",
      last_name: props.user.last_name || "",
      phone: props.user.phone || "",
      bio: props.user.bio || "",
      avatar_url: props.user.avatar_url || "",
    }
  }
}

// Activar edición
const startEditing = () => {
  initializeForm()
  editing.value = true
  error.value = ""
  success.value = ""
}

// Cancelar edición
const cancelEditing = () => {
  editing.value = false
  error.value = ""
  success.value = ""
}

// Guardar cambios
const saveChanges = async () => {
  loading.value = true
  error.value = ""
  success.value = ""

  try {
    const result = await authStore.updateProfile(formData.value)

    if (result.success) {
      success.value = "Perfil actualizado correctamente"
      editing.value = false
    } else {
      error.value = result.error || "Error al actualizar perfil"
    }
  } catch (err: any) {
    error.value = err.message || "Error al actualizar perfil"
  } finally {
    loading.value = false
  }
}

// Subir avatar
const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Aquí iría la lógica para subir a Supabase Storage
  // Por ahora solo mostramos una notificación
  alert("Funcionalidad de subida de avatar en implementación")
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">person</span>
        Información Personal
      </h2>
      <button
        v-if="!editing"
        @click="startEditing"
        class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors flex items-center gap-2"
      >
        <span class="material-symbols-outlined text-sm">edit</span>
        Editar
      </button>
    </div>

    <!-- Messages -->
    <div
      v-if="success"
      class="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-green-400 text-sm">check_circle</span>
      <span class="text-green-400 text-sm">{{ success }}</span>
    </div>

    <div
      v-if="error"
      class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-red-400 text-sm">error</span>
      <span class="text-red-400 text-sm">{{ error }}</span>
    </div>

    <!-- Profile Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Avatar -->
      <div class="md:col-span-2">
        <div class="flex items-center gap-4">
          <div
            v-if="user?.avatar_url"
            class="w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/30"
          >
            <img
              :src="user.avatar_url"
              :alt="user.first_name"
              class="w-full h-full object-cover"
            />
          </div>
          <div
            v-else
            class="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold border-2 border-cyan-500/30"
          >
            {{ user?.first_name?.charAt(0) || "U" }}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-white">{{ user?.first_name }} {{ user?.last_name }}</h3>
            <p class="text-slate-400 text-sm">{{ user?.role?.name || "Usuario" }}</p>
            <button
              v-if="editing"
              @click="handleAvatarUpload"
              class="mt-2 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Cambiar avatar
            </button>
          </div>
        </div>
      </div>

      <!-- First Name -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">Nombre</label>
        <input
          v-if="editing"
          v-model="formData.first_name"
          type="text"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
        <p v-else class="text-white">{{ user?.first_name || "Sin nombre" }}</p>
      </div>

      <!-- Last Name -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">Apellido</label>
        <input
          v-if="editing"
          v-model="formData.last_name"
          type="text"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
        <p v-else class="text-white">{{ user?.last_name || "Sin apellido" }}</p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">Email</label>
        <p class="text-white">{{ user?.email || "Sin email" }}</p>
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm text-slate-400 mb-2">Teléfono</label>
        <input
          v-if="editing"
          v-model="formData.phone"
          type="tel"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
        <p v-else class="text-white">{{ user?.phone || "Sin teléfono" }}</p>
      </div>

      <!-- Bio -->
      <div class="md:col-span-2">
        <label class="block text-sm text-slate-400 mb-2">Biografía</label>
        <textarea
          v-if="editing"
          v-model="formData.bio"
          rows="3"
          class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
        ></textarea>
        <p v-else class="text-white">{{ user?.bio || "Sin biografía" }}</p>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="editing" class="flex justify-end gap-3 pt-6 border-t border-slate-700">
      <button
        @click="cancelEditing"
        class="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
      >
        Cancelar
      </button>
      <button
        @click="saveChanges"
        :disabled="loading"
        class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all disabled:opacity-50 flex items-center gap-2"
      >
        <span v-if="loading" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
        <span v-else class="material-symbols-outlined text-sm">check</span>
        {{ loading ? "Guardando..." : "Guardar Cambios" }}
      </button>
    </div>
  </div>
</template>
