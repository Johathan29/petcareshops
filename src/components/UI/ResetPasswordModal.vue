<script setup lang="ts">
import { ref } from "vue"
import { supabase } from "../../config/supabase"
import AppModal from "../UI/AppModal.vue"
import BaseModal from "./BaseModal.vue";

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(["close"])

const email = ref("")
const loading = ref(false)

const showSuccess = ref(false)
const showError = ref(false)
const message = ref("")

const sendResetEmail = async () => {
  if (!email.value) {
    message.value = "Debes ingresar tu correo."
    showError.value = true
    return
  }

  try {
    loading.value = true

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: "http://localhost:5173/update-password",
      }
    )

    if (error) {
      message.value = error.message
      showError.value = true
      return
    }

    message.value = "Te enviamos un enlace para restablecer tu contraseña 📩"
    showSuccess.value = true
    email.value = ""

    setTimeout(() => {
      emit("close")
    }, 1500)

  } catch {
    message.value = "Error inesperado."
    showError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- MAIN MODAL -->
  <BaseModal
   :show="show"
    title="Restablecer contraseña 🔐"
    type="info"
    @close="emit('close')"
  >
    <div class="space-y-4">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <input
        v-model="email"
        type="email"
        placeholder="name@example.com"
        class="w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
      />

      <button
        @click="sendResetEmail"
        :disabled="loading"
        class="w-full h-11 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all"
      >
        {{ loading ? "Enviando..." : "Enviar enlace" }}
      </button>
    </div>
  </BaseModal>

  <!-- SUCCESS -->
  <AppModal
    :show="showSuccess"
    type="success"
    title="Email enviado"
    :message="message"
    @close="showSuccess = false"
  />

  <!-- ERROR -->
  <AppModal
    :show="showError"
    type="error"
    title="Error"
    :message="message"
    @close="showError = false"
  />
</template>