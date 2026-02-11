<script setup lang="ts">
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faPaperPlane, } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  open: boolean
  data: {
    doctor: any
    day: string
    hour: string
  } | null
}>()

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[1.5rem] md:px-[3.5rem]">
    <div class="bg-red-200 dark:bg-zinc-900 rounded-2xl shadow-xl space-y-4
             w-full max-w-md p-6 animate-scale-in">
      <!-- Header -->
      <div class="flex items-center gap-4 text-red-900">
        <FontAwesomeIcon :icon="faCircleExclamation" class="w-8 h-8" />
        <h4 class="text-red-900 text-[1.4rem] flex items-center gap-4 text-center">

          Error
        </h4>
      </div>


      <!-- Info -->
      <div class="bg-slate-100 p-6 rounded-2xl mb-6">
        <p class="text-sm text-slate-600 leading-relaxed">
          No se puede adoptar sin registrarse o iniciar sesion en la plataforma
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-4 py-2 rounded-lg border hover:border-red-700 border-red-400 bg-red-400  hover:bg-red-700 text-sm text-white"
          @click="emit('close')">
          Cancel
        </button>

        <router-link to="/auth"
          class="px-4 py-2 rounded-lg bg-primary hover:bg-[#0f6cbddb] font-bold text-sm text-white">
          Iniciar sesion
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
</style>
