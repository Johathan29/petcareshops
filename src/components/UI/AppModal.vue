<script setup lang="ts">
defineProps<{
  show: boolean
  type: "success" | "error" | "info"
  title: string
  message: string
}>()

const emit = defineEmits(["close"])

const typeStyles = {
  success: {
    icon: "✓",
    titleColor: "text-green-500",
    buttonColor: "bg-green-500 hover:bg-green-600",
    border: "border-green-500/20",
    bgIcon: "bg-green-500/10",
  },
  error: {
    icon: "✕",
    titleColor: "text-red-500",
    buttonColor: "bg-red-500 hover:bg-red-600",
    border: "border-red-500/20",
    bgIcon: "bg-red-500/10",
  },
  info: {
    icon: "i",
    titleColor: "text-primary",
    buttonColor: "bg-primary hover:bg-[#158cc7]",
    border: "border-primary/20",
    bgIcon: "bg-primary/10",
  },
}
</script>

<template>
  <BaseModal :show="show" @close="emit('close')">
    <div class="text-center">
      <div
        class="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
        :class="[typeStyles[type].bgIcon]"
      >
        <span class="text-2xl" :class="typeStyles[type].titleColor">
          {{ typeStyles[type].icon }}
        </span>
      </div>

      <h3
        class="text-lg font-bold mb-2"
        :class="typeStyles[type].titleColor"
      >
        {{ title }}
      </h3>

      <p class="text-slate-600 dark:text-slate-300 text-sm">
        {{ message }}
      </p>

      <button
        @click="emit('close')"
        class="mt-6 w-full h-11 text-white font-semibold rounded-lg transition-all"
        :class="typeStyles[type].buttonColor"
      >
        Cerrar
      </button>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import BaseModal from "./BaseModal.vue"
export default { components: { BaseModal } }
</script>