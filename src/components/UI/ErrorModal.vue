<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
}>()

const emit = defineEmits(["close"])
</script>

<template>
  <transition name="scale">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-2xl border border-red-500/20"
      >
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <span class="text-red-500 text-2xl">✕</span>
        </div>

        <h3 class="text-lg font-bold text-red-500 mb-2">
          Error
        </h3>

        <p class="text-slate-600 dark:text-slate-300 text-sm">
          {{ message }}
        </p>

        <button
          @click="emit('close')"
          class="mt-6 w-full h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
        >
          Cerrar
        </button>
      </div>
    </div>
  </transition>
</template>