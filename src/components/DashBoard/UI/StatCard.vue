<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
  icon: string;
  growth: string;
  subtitle: string;
  negative?: boolean;
}>();
</script>

<template>
  <div class="glass-card rounded-xl p-6 relative overflow-hidden group">
    
    <!-- Icon -->
    <div
      class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity"
    >
      <span class="material-symbols-outlined text-6xl">
        {{ icon }}
      </span>
    </div>

    <!-- Content -->
    <p class="text-left text-slate-400 text-sm font-medium">
      {{ title }}
    </p>

    <h3 class="text-3xl text-left  font-bold text-white mt-1">
      {{ value }}
    </h3>

    <div class="flex items-center gap-1 mt-4 text-xs">
      <span
        :class="negative ? 'text-rose-500' : 'text-primary'"
        class="font-bold"
      >
        {{ growth }}
      </span>
      <span class="text-slate-500">
        {{ subtitle }}
      </span>
    </div>
  </div>
</template>
