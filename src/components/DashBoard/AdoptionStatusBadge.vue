<script setup>
defineProps({
  status: String
})
</script>

<template>
  <span
    class="px-3 py-1 rounded-full text-xs font-semibold"
    :class="{
      'bg-yellow-100 text-yellow-700': status === 'pending',
      'bg-green-100 text-green-700': status === 'approved',
      'bg-red-100 text-red-700': status === 'rejected'
    }"
  >
    {{ status }}
  </span>
</template>
