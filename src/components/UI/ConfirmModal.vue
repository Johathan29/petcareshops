<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  message: string
}>()

const emit = defineEmits(["confirm", "close"])
</script>

<template>
  <BaseModal :show="show" @close="emit('close')">
    <div class="text-center">
      <h3 class="text-lg font-bold text-red-500 mb-3">
        {{ title }}
      </h3>

      <p class="text-slate-600 dark:text-slate-300 text-sm mb-6">
        {{ message }}
      </p>

      <div class="flex gap-4">
        <button
          @click="emit('close')"
          class="flex-1 h-11 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          Cancelar
        </button>

        <button
          @click="emit('confirm')"
          class="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
        >
          Confirmar
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import BaseModal from "./BaseModal.vue"
export default { components: { BaseModal } }
</script>