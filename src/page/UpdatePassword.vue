<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { supabase } from "../config/supabase"

import SuccessModal from "../components/UI/SuccessModal.vue"
import ErrorModal from "../components/UI/ErrorModal.vue"

const router = useRouter()

const newPassword = ref("")
const confirmPassword = ref("")
const showPassword = ref(false)

const message = ref("")
const showSuccess = ref(false)
const showError = ref(false)
const loading = ref(false)

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    router.push("/")
  }
})

const updatePassword = async () => {
  try {
    if (!newPassword.value || !confirmPassword.value) {
      message.value = "Todos los campos son obligatorios."
      showError.value = true
      return
    }

    if (newPassword.value.length < 8) {
      message.value = "La contraseña debe tener mínimo 8 caracteres."
      showError.value = true
      return
    }

    if (newPassword.value !== confirmPassword.value) {
      message.value = "Las contraseñas no coinciden."
      showError.value = true
      return
    }

    loading.value = true

    const { error } = await supabase.auth.updateUser({
      password: newPassword.value,
    })

    if (error) {
      message.value = error.message
      showError.value = true
      loading.value = false
      return
    }

    message.value = "Contraseña actualizada correctamente 🎉"
    showSuccess.value = true
    loading.value = false

    setTimeout(() => {
      router.push("/")
    }, 2000)

  } catch (err) {
    message.value = "Error inesperado."
    showError.value = true
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-background-dark px-4">
    <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl">

      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-primary">
          Update Password 🔐
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">
          Ingresa tu nueva contraseña.
        </p>
      </div>

      <form @submit.prevent="updatePassword" class="space-y-5">

        <div>
          <label class="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Nueva contraseña
          </label>
          <input
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-base text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label class="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Confirmar contraseña
          </label>
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-base text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div class="flex items-center gap-2 text-sm text-slate-500">
          <input type="checkbox" v-model="showPassword" />
          <span>Mostrar contraseña</span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full h-12 bg-primary hover:bg-[#158cc7] text-white font-bold rounded-lg shadow-md shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center"
        >
          <span v-if="!loading">Actualizar contraseña</span>
          <span v-else>Actualizando...</span>
        </button>
      </form>
    </div>
  </div>

  <!-- Reusable Modals -->
  <SuccessModal
    :show="showSuccess"
    :message="message"
    @close="showSuccess = false"
  />

  <ErrorModal
    :show="showError"
    :message="message"
    @close="showError = false"
  />
</template>