<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="glass-card modal-content">
      <div class="modal-header">
        <h3 class="text-lg font-semibold text-white">Pet Details</h3>
        <button class="close-btn" @click="closeModal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div v-if="loading" class="flex items-center justify-center h-64">
        <span class="material-symbols-outlined animate-spin text-blue-400">progress_activity</span>
      </div>
      
      <div v-else-if="!pet" class="text-center py-8">
        <span class="material-symbols-outlined text-gray-500 text-4xl">pets</span>
        <p class="text-gray-400 mt-2">Pet not found</p>
      </div>
      
      <div v-else class="modal-body">
        <div class="pet-image">
          <img 
            v-if="pet.imageUrl" 
            :src="pet.imageUrl" 
            :alt="pet.name"
            class="pet-img"
          />
          <div v-else class="pet-placeholder">
            <span class="material-symbols-outlined">{{ petIcon }}</span>
          </div>
          <span class="adoption-badge" :class="pet.adoptionStatus">{{ formatStatus(pet.adoptionStatus) }}</span>
        </div>
        
        <div class="pet-info">
          <h2 class="pet-name">{{ pet.name }}</h2>
          <p class="pet-breed">{{ pet.breed }}</p>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="material-symbols-outlined">calendar_today</span>
              <div>
                <span class="info-label">Age</span>
                <span class="info-value">{{ pet.age }} years</span>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined">weight</span>
              <div>
                <span class="info-label">Weight</span>
                <span class="info-value">{{ pet.weight }} kg</span>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined">female</span>
              <div>
                <span class="info-label">Gender</span>
                <span class="info-value">{{ pet.gender }}</span>
              </div>
            </div>
            <div class="info-item">
              <span class="material-symbols-outlined">badge</span>
              <div>
                <span class="info-label">ID</span>
                <span class="info-value">#{{ pet.id }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="pet.description" class="description-section">
            <h4 class="section-title">About</h4>
            <p class="description">{{ pet.description }}</p>
          </div>
          
          <div v-if="pet.tags && pet.tags.length > 0" class="tags-section">
            <h4 class="section-title">Characteristics</h4>
            <div class="tags">
              <span 
                v-for="(tag, index) in pet.tags" 
                :key="index"
                class="tag"
              >{{ tag }}</span>
            </div>
          </div>
          
          <div class="medical-info" v-if="pet.medicalHistory">
            <h4 class="section-title">Medical History</h4>
            <ul class="medical-list">
              <li v-for="(item, index) in pet.medicalHistory" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary" @click="closeModal">
          Close
        </button>
        <button class="btn-primary" @click="$emit('adopt')">
          <span class="material-symbols-outlined">favorite</span>
          Adopt Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Pet {
  id: number
  name: string
  breed: string
  age: number
  weight: number
  gender: string
  description?: string
  imageUrl?: string
  adoptionStatus: string
  tags?: string[]
  medicalHistory?: string[]
}

interface Props {
  isOpen: boolean
  pet?: Pet
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

defineEmits<{
  (e: 'close'): void
  (e: 'adopt'): void
}>()

const petIcon = computed(() => {
  return 'pets'
})

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: white;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.modal-body {
  padding: 20px;
}

.pet-image {
  position: relative;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.pet-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pet-placeholder .material-symbols-outlined {
  font-size: 80px;
  color: rgba(255, 255, 255, 0.8);
}

.adoption-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.adoption-badge.available {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.adoption-badge.pending {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.adoption-badge.adopted {
  background: rgba(107, 114, 128, 0.9);
  color: white;
}

.pet-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pet-name {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.pet-breed {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.info-item .material-symbols-outlined {
  color: #3b82f6;
  font-size: 24px;
}

.info-label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.info-value {
  font-size: 14px;
  color: white;
  font-weight: 600;
}

.description-section,
.tags-section,
.medical-info {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.section-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 14px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 20px;
  font-size: 13px;
  color: #3b82f6;
}

.medical-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.medical-list li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.medical-list li:last-child {
  border-bottom: none;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary,
.btn-primary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  border: none;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-primary {
  background: #10b981;
  color: white;
}

.btn-primary:hover {
  background: #059669;
}
</style>
