<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  show: boolean
  type: 'success' | 'error'
  title: string
  message: string
  duration?: number // ms
}>()

const emit = defineEmits(['close'])

let timer: number | undefined

onMounted(() => {
  if (props.duration) {
    timer = window.setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>


<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">

        <!-- ICON -->
        <div
          class="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full"
          :class="type === 'success' ? 'bg-green-100' : 'bg-red-100'"
        >
          <svg v-if="type === 'success'" class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>

          <svg v-else class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- TEXT -->
        <h3 class="text-2xl font-bold mb-2">
          {{ title }}
        </h3>

        <p class="text-slate-600 mb-6">
          {{ message }}
        </p>

        <!-- ACTION -->
        <button
          @click="emit('close')"
          class="w-full py-3 rounded-xl font-bold text-white transition"
          :class="type === 'success'
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-red-600 hover:bg-red-700'"
        >
          Aceptar
        </button>

      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
