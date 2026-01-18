<script setup lang="ts">
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
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div
      class="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl
             w-full max-w-md p-6 animate-scale-in"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-black text-zinc-900 dark:text-white">
          Confirm Appointment
        </h3>
        <button @click="emit('close')" class="text-slate-400 hover:text-red-500">
          ✕
        </button>
      </div>

      <!-- Info -->
      <div class="space-y-3 text-sm">
        <p><strong>Doctor:</strong> {{ data?.doctor.name }}</p>
        <p><strong>Day:</strong> {{ data?.day }}</p>
        <p><strong>Hour:</strong> {{ data?.hour }}</p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-4 py-2 rounded-lg border text-sm"
          @click="emit('close')"
        >
          Cancel
        </button>

        <button
          class="px-4 py-2 rounded-lg bg-primary text-black font-bold text-sm"
          @click="emit('confirm', data)"
        >
          Confirm
        </button>
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
