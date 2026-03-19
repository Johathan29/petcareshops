<template>
  <div class="glass-card service-card">
    <div v-if="loading" class="flex items-center justify-center h-48">
      <span class="material-symbols-outlined animate-spin text-blue-400">progress_activity</span>
    </div>
    
    <div v-else-if="!service" class="text-center py-8">
      <span class="material-symbols-outlined text-gray-500 text-4xl">service_outage</span>
      <p class="text-gray-400 mt-2">Service not available</p>
    </div>
    
    <div v-else class="card-content">
      <div class="card-header">
        <div class="service-icon" :style="{ backgroundColor: getCategoryColor() + '20' }">
          <span class="material-symbols-outlined" :style="{ color: getCategoryColor() }">{{ serviceIcon }}</span>
        </div>
        <span v-if="service.isActive" class="status-badge active">Active</span>
        <span v-else class="status-badge inactive">Inactive</span>
      </div>
      
      <div class="card-body">
        <h3 class="service-name">{{ service.name }}</h3>
        <p class="service-description">{{ service.description }}</p>
        
        <div class="service-details">
          <div class="detail-item">
            <span class="material-symbols-outlined text-sm">category</span>
            <span>{{ formatCategory(service.category) }}</span>
          </div>
          <div class="detail-item">
            <span class="material-symbols-outlined text-sm">schedule</span>
            <span>{{ service.duration }} min</span>
          </div>
        </div>
        
        <div class="service-price">
          <span class="price-label">Price</span>
          <span class="price-value">${{ service.price.toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="card-actions">
        <button class="action-btn primary" @click="$emit('book')">
          <span class="material-symbols-outlined">calendar_today</span>
          Book
        </button>
        <button class="action-btn secondary" @click="$emit('edit')">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="action-btn danger" @click="$emit('delete')">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Service {
  id: number
  name: string
  description: string
  category: string
  price: number
  duration: number
  isActive: boolean
}

interface Props {
  service?: Service
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (e: 'book'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const serviceIcon = computed(() => {
  const icons: Record<string, string> = {
    veterinary: 'local_hospital',
    grooming: 'content_cut',
    training: 'school',
    boarding: 'night_shelter',
    daycare: 'wb_sunny'
  }
  return icons[props.service?.category || ''] || 'services'
})

const getCategoryColor = () => {
  const colors: Record<string, string> = {
    veterinary: '#10b981',
    grooming: '#f59e0b',
    training: '#8b5cf6',
    boarding: '#3b82f6',
    daycare: '#ec4899'
  }
  return colors[props.service?.category || ''] || '#6b7280'
}

const formatCategory = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.card-content {
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.status-badge.inactive {
  background: rgba(107, 114, 128, 0.2);
  color: #9ca3af;
}

.card-body {
  margin-bottom: 16px;
}

.service-name {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.service-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
  line-height: 1.5;
}

.service-details {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.service-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.price-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.price-value {
  font-size: 20px;
  font-weight: bold;
  color: #10b981;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.action-btn.primary {
  flex: 1;
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-btn.danger {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.action-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
}
</style>
