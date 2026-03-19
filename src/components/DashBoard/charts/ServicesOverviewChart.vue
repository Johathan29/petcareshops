<template>
  <div class="glass-card services-overview-chart p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">Services Overview</h3>
      <span class="material-symbols-outlined text-gray-400">analytics</span>
    </div>
    
    <div v-if="loading" class="flex items-center justify-center h-48">
      <span class="material-symbols-outlined animate-spin text-blue-400">progress_activity</span>
    </div>
    
    <div v-else-if="overviewStats.length === 0" class="text-center py-8">
      <span class="material-symbols-outlined text-gray-500 text-4xl">inbox</span>
      <p class="text-gray-400 mt-2">No overview data available</p>
    </div>
    
    <div v-else class="overview-grid">
      <div 
        v-for="(stat, index) in overviewStats" 
        :key="index"
        class="overview-card"
      >
        <div class="overview-icon" :style="{ backgroundColor: stat.color + '20' }">
          <span class="material-symbols-outlined" :style="{ color: stat.color }">{{ stat.icon }}</span>
        </div>
        <div class="overview-content">
          <span class="overview-label">{{ stat.label }}</span>
          <span class="overview-value">{{ stat.value }}</span>
          <span class="overview-change" :class="stat.change >= 0 ? 'positive' : 'negative'">
            <span class="material-symbols-outlined text-xs">
              {{ stat.change >= 0 ? 'trending_up' : 'trending_down' }}
            </span>
            {{ Math.abs(stat.change) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface OverviewStat {
  label: string
  value: number
  change: number
  icon: string
  color: string
}

const loading = ref(true)
const overviewStats = ref<OverviewStat[]>([])

const loadOverviewData = async () => {
  loading.value = true
  // Simulated data - replace with actual API call
  setTimeout(() => {
    overviewStats.value = [
      { label: 'Total Services', value: 350, change: 12, icon: 'services', color: '#3b82f6' },
      { label: 'Active Appointments', value: 28, change: 5, icon: 'calendar_today', color: '#10b981' },
      { label: 'Completed Today', value: 45, change: -3, icon: 'check_circle', color: '#f59e0b' },
      { label: 'Pending Reviews', value: 12, change: 8, icon: 'rate_review', color: '#8b5cf6' }
    ]
    loading.value = false
  }, 500)
}

onMounted(() => {
  loadOverviewData()
})
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.overview-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.overview-card:hover {
  transform: translateY(-2px);
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.overview-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.overview-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.overview-value {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.overview-change {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.overview-change.positive {
  color: #10b981;
}

.overview-change.negative {
  color: #ef4444;
}
</style>
