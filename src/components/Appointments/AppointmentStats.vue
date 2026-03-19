<script setup lang="ts">
interface Stats {
  total: number
  pending: number
  confirmed: number
  cancelled: number
  completed: number
  rejectionRate: string
}

const props = defineProps<{
  stats: Stats
}>()

const statCards = [
  {
    title: "Total",
    value: props.stats.total,
    icon: "event",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    title: "Pendientes",
    value: props.stats.pending,
    icon: "schedule",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    title: "Confirmadas",
    value: props.stats.confirmed,
    icon: "check_circle",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    title: "Completadas",
    value: props.stats.completed,
    icon: "done_all",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    title: "Canceladas",
    value: props.stats.cancelled,
    icon: "cancel",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <div
      v-for="stat in statCards"
      :key="stat.title"
      class="glass-card rounded-xl p-4 border"
      :class="[stat.bgColor, stat.borderColor]"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-slate-400 text-xs font-medium">{{ stat.title }}</span>
        <span
          class="material-symbols-outlined text-sm"
          :class="`text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`"
        >
          {{ stat.icon }}
        </span>
      </div>
      <p
        class="text-2xl font-bold text-transparent bg-clip-text"
        :class="`bg-gradient-to-r ${stat.color}`"
      >
        {{ stat.value }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
}
</style>
