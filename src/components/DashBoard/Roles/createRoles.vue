<template>
  <div class="glass-card create-roles p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white">Create New Role</h3>
    </div>
    
    <form @submit.prevent="handleSubmit" class="role-form">
      <div class="form-group">
        <label class="form-label">Role Name</label>
        <input 
          v-model="form.name" 
          type="text" 
          placeholder="Enter role name"
          class="form-input"
          required
        />
      </div>
      
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea 
          v-model="form.description" 
          placeholder="Describe the role responsibilities..."
          class="form-input form-textarea"
          rows="3"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label class="form-label">Permissions</label>
        <div class="permissions-grid">
          <div 
            v-for="(permission, index) in availablePermissions" 
            :key="index"
            class="permission-item"
          >
            <label class="permission-label">
              <input 
                type="checkbox" 
                :value="permission.value"
                v-model="form.permissions"
                class="permission-checkbox"
              />
              <span class="material-symbols-outlined">{{ permission.icon }}</span>
              <span>{{ permission.label }}</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Role Level</label>
        <select v-model="form.level" class="form-input">
          <option value="1">Level 1 - Basic</option>
          <option value="2">Level 2 - Standard</option>
          <option value="3">Level 3 - Advanced</option>
          <option value="4">Level 4 - Admin</option>
        </select>
      </div>
      
      <div class="form-group">
        <label class="form-label">
          <input 
            v-model="form.isActive" 
            type="checkbox" 
            class="form-checkbox"
          />
          Active Role
        </label>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn-cancel" @click="handleCancel">
          Cancel
        </button>
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">progress_activity</span>
          <span v-else class="material-symbols-outlined">add_task</span>
          Create Role
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface RoleForm {
  name: string
  description: string
  permissions: string[]
  level: string
  isActive: boolean
}

interface Permission {
  label: string
  value: string
  icon: string
}

interface Emits {
  (e: 'submit', data: RoleForm): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const form = ref<RoleForm>({
  name: '',
  description: '',
  permissions: [],
  level: '1',
  isActive: true
})

const availablePermissions: Permission[] = [
  { label: 'View Dashboard', value: 'view_dashboard', icon: 'dashboard' },
  { label: 'Manage Pets', value: 'manage_pets', icon: 'pets' },
  { label: 'Manage Services', value: 'manage_services', icon: 'services' },
  { label: 'Manage Appointments', value: 'manage_appointments', icon: 'calendar_today' },
  { label: 'Manage Users', value: 'manage_users', icon: 'people' },
  { label: 'View Reports', value: 'view_reports', icon: 'analytics' },
  { label: 'Manage Roles', value: 'manage_roles', icon: 'admin_panel_settings' },
  { label: 'System Settings', value: 'system_settings', icon: 'settings' }
]

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  setTimeout(() => {
    emit('submit', form.value)
    isSubmitting.value = false
    // Reset form
    form.value = {
      name: '',
      description: '',
      permissions: [],
      level: '1',
      isActive: true
    }
  }, 500)
}

const handleCancel = () => {
  form.value = {
    name: '',
    description: '',
    permissions: [],
    level: '1',
    isActive: true
  }
  emit('cancel')
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.role-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 600;
}

.form-input {
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

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.permission-item {
  display: flex;
  align-items: center;
}

.permission-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  width: 100%;
}

.permission-label:hover {
  background: rgba(255, 255, 255, 0.1);
}

.permission-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.permission-label .material-symbols-outlined {
  font-size: 18px;
  color: #3b82f6;
}

.form-checkbox {
  margin-right: 8px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
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
  border: none;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-cancel:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-submit {
  background: #3b82f6;
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
