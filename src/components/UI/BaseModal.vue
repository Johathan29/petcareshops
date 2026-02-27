<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits(["close"])
</script>

<template>
  <transition name="scale">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-slate-200 dark:border-slate-800"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>