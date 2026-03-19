<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../../stores/auth.store"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name?: string
}

const props = defineProps<{
  user: UserProfile | null
}>()

const authStore = useAuthStore()

// Cambio de contraseña
const showPasswordForm = ref(false)
const passwordData = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
})

const passwordLoading = ref(false)
const passwordError = ref("")
const passwordSuccess = ref("")

// Notificaciones
const notificationsEnabled = ref(true)
const emailNotifications = ref(true)

// Validar contraseñas
const validatePasswords = () => {
  if (passwordData.value.newPassword.length < 8) {
    passwordError.value = "La contraseña debe tener al menos 8 caracteres"
    return false
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    passwordError.value = "Las contraseñas no coinciden"
    return false
  }

  if (!/[A-Z]/.test(passwordData.value.newPassword)) {
    passwordError.value = "La contraseña debe tener al menos una mayúscula"
    return false
  }

  if (!/[a-z]/.test(passwordData.value.newPassword)) {
    passwordError.value = "La contraseña debe tener al menos una minúscula"
    return false
  }

  if (!/[0-9]/.test(passwordData.value.newPassword)) {
    passwordError.value = "La contraseña debe tener al menos un número"
    return false
  }

  if (!/[^A-Za-z0-9]/.test(passwordData.value.newPassword)) {
    passwordError.value = "La contraseña debe tener al menos un carácter especial"
    return false
  }

  return true
}

// Cambiar contraseña
const handleChangePassword = async () => {
  passwordError.value = ""
  passwordSuccess.value = ""

  if (!validatePasswords()) {
    return
  }

  passwordLoading.value = true

  try {
    const result = await authStore.changePassword({
      currentPassword: passwordData.value.currentPassword,
      newPassword: passwordData.value.newPassword,
      confirmPassword: passwordData.value.confirmPassword,
    })

    if (result.success) {
      passwordSuccess.value = "Contraseña actualizada correctamente"
      passwordData.value = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }
      showPasswordForm.value = false
    } else {
      passwordError.value = result.error || "Error al cambiar contraseña"
    }
  } catch (err: any) {
    passwordError.value = err.message || "Error al cambiar contraseña"
  } finally {
    passwordLoading.value = false
  }
}

// Cerrar sesión
const handleLogout = async () => {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    await authStore.logout()
    window.location.href = "/"
  }
}

// Eliminar cuenta
const handleDeleteAccount = async () => {
  if (confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
    // Aquí iría la lógica para eliminar la cuenta
    alert("Funcionalidad en implementación")
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <h2 class="text-xl font-bold text-white flex items-center gap-2">
      <span class="material-symbols-outlined text-cyan-400">settings</span>
      Configuración
    </h2>

    <!-- Messages -->
    <div
      v-if="passwordSuccess"
      class="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-green-400 text-sm">check_circle</span>
      <span class="text-green-400 text-sm">{{ passwordSuccess }}</span>
    </div>

    <div
      v-if="passwordError"
      class="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
    >
      <span class="material-symbols-outlined text-red-400 text-sm">error</span>
      <span class="text-red-400 text-sm">{{ passwordError }}</span>
    </div>

    <!-- Security Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">security</span>
        Seguridad
      </h3>

      <!-- Change Password -->
      <div class="glass-card rounded-xl p-4 border border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-white font-medium">Contraseña</h4>
            <p class="text-slate-400 text-sm">Cambia tu contraseña de forma segura</p>
          </div>
          <button
            @click="showPasswordForm = !showPasswordForm"
            class="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
          >
            {{ showPasswordForm ? "Cancelar" : "Cambiar" }}
          </button>
        </div>

        <div v-if="showPasswordForm" class="space-y-4 pt-4 border-t border-slate-700">
          <div>
            <label class="block text-sm text-slate-400 mb-2">Contraseña actual</label>
            <input
              v-model="passwordData.currentPassword"
              type="password"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm text-slate-400 mb-2">Nueva contraseña</label>
            <input
              v-model="passwordData.newPassword"
              type="password"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm text-slate-400 mb-2">Confirmar nueva contraseña</label>
            <input
              v-model="passwordData.confirmPassword"
              type="password"
              class="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <!-- Password requirements -->
          <div class="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <p class="text-slate-400 text-xs mb-2">La contraseña debe cumplir:</p>
            <ul class="text-xs text-slate-500 space-y-1">
              <li :class="passwordData.newPassword.length >= 8 ? 'text-green-400' : ''">
                <span class="material-symbols-outlined text-[10px] align-middle mr-1">
                  {{ passwordData.newPassword.length >= 8 ? "check" : "close" }}
                </span>
                Al menos 8 caracteres
              </li>
              <li :class="/[A-Z]/.test(passwordData.newPassword) ? 'text-green-400' : ''">
                <span class="material-symbols-outlined text-[10px] align-middle mr-1">
                  {{ /[A-Z]/.test(passwordData.newPassword) ? "check" : "close" }}
                </span>
                Una mayúscula
              </li>
              <li :class="/[a-z]/.test(passwordData.newPassword) ? 'text-green-400' : ''">
                <span class="material-symbols-outlined text-[10px] align-middle mr-1">
                  {{ /[a-z]/.test(passwordData.newPassword) ? "check" : "close" }}
                </span>
                Una minúscula
              </li>
              <li :class="/[0-9]/.test(passwordData.newPassword) ? 'text-green-400' : ''">
                <span class="material-symbols-outlined text-[10px] align-middle mr-1">
                  {{ /[0-9]/.test(passwordData.newPassword) ? "check" : "close" }}
                </span>
                Un número
              </li>
              <li :class="/[^A-Za-z0-9]/.test(passwordData.newPassword) ? 'text-green-400' : ''">
                <span class="material-symbols-outlined text-[10px] align-middle mr-1">
                  {{ /[^A-Za-z0-9]/.test(passwordData.newPassword) ? "check" : "close" }}
                </span>
                Un carácter especial
              </li>
            </ul>
          </div>

          <button
            @click="handleChangePassword"
            :disabled="passwordLoading"
            class="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span v-if="passwordLoading" class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            <span v-else class="material-symbols-outlined text-sm">check</span>
            {{ passwordLoading ? "Cambiando..." : "Cambiar Contraseña" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Section -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">notifications</span>
        Notificaciones
      </h3>

      <div class="glass-card rounded-xl p-4 border border-slate-700 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-white font-medium">Notificaciones push</h4>
            <p class="text-slate-400 text-sm">Recibe notificaciones en tu navegador</p>
          </div>
          <button
            @click="notificationsEnabled = !notificationsEnabled"
            class="w-12 h-6 rounded-full transition-colors"
            :class="notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-700'"
          >
            <div
              class="w-5 h-5 rounded-full bg-white transition-transform"
              :class="notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'"
            ></div>
          </button>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-white font-medium">Notificaciones por email</h4>
            <p class="text-slate-400 text-sm">Recibe actualizaciones por correo</p>
          </div>
          <button
            @click="emailNotifications = !emailNotifications"
            class="w-12 h-6 rounded-full transition-colors"
            :class="emailNotifications ? 'bg-cyan-500' : 'bg-slate-700'"
          >
            <div
              class="w-5 h-5 rounded-full bg-white transition-transform"
              :class="emailNotifications ? 'translate-x-6' : 'translate-x-0.5'"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-red-400 flex items-center gap-2">
        <span class="material-symbols-outlined">warning</span>
        Zona de Peligro
      </h3>

      <div class="glass-card rounded-xl p-4 border border-red-500/20">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-white font-medium">Cerrar sesión</h4>
            <p class="text-slate-400 text-sm">Finaliza tu sesión actual</p>
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div class="glass-card rounded-xl p-4 border border-red-500/20">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="text-white font-medium">Eliminar cuenta</h4>
            <p class="text-slate-400 text-sm">Esta acción es permanente e irreversible</p>
          </div>
          <button
            @click="handleDeleteAccount"
            class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
}
</style>
