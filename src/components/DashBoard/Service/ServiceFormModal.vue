<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="glass-card modal-content">
      <div class="modal-header">
        <h3 class="text-lg font-semibold text-white">
          {{ isEditing ? 'Edit Service' : 'Create Service' }}
        </h3>
        <button class="close-btn" @click="closeModal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label class="form-label">Service Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Enter service name"
            class="form-input"
            required
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea 
            v-model="form.description" 
            placeholder="Enter service description"
            class="form-input form-textarea"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select v-model="form.category" class="form-input">
              <option value="">Select category</option>
              <option value="veterinary">Veterinary</option>
              <option value="grooming">Grooming</option>
              <option value="training">Training</option>
              <option value="boarding">Boarding</option>
              <option value="daycare">Daycare</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Price</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              placeholder="0.00"
              class="form-input"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Duration (minutes)</label>
          <input 
            v-model.number="form.duration" 
            type="number" 
            placeholder="60"
            class="form-input"
            min="15"
            required
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">
            <input 
              v-model="form.isActive" 
              type="checkbox" 
              class="form-checkbox"
            />
            Active
          </label>
        </div>
      </form>
      
      <div class="modal-footer">
        <button type="button" class="btn-cancel" @click="closeModal">
          Cancel
        </button>
        <button type="submit" class="btn-submit" @click="handleSubmit" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">progress_activity</span>
          {{ isEditing ? 'Update' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface ServiceForm {
  id?: number
  name: string
  description: string
  category: string
  price: number
  duration: number
  isActive: boolean
}

interface Props {
  isOpen: boolean
  isEditing: boolean
  initialData?: ServiceForm
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: ServiceForm): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({
    name: '',
    description: '',
    category: '',
    price: 0,
    duration: 60,
    isActive: true
  })
})

const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const form = ref<ServiceForm>({
  name: '',
  description: '',
  category: '',
  price: 0,
  duration: 60,
  isActive: true
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  setTimeout(() => {
    emit('submit', form.value)
    isSubmitting.value = false
    closeModal()
  }, 500)
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
  max-width: 500px;
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

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-checkbox {
  margin-right: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-submit {
  background: #3b82f6;
  border: none;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background: #2563eb;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
