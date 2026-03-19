<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="glass-card modal-content">
      <div class="modal-header">
        <h3 class="text-lg font-semibold text-white">
          {{ isEditing ? 'Editar Servicio' : 'Nuevo Servicio' }}
        </h3>
        <button class="close-btn" @click="closeModal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <!-- Título -->
        <div class="form-group">
          <label class="form-label">Título *</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Ej: Consulta Veterinaria"
            class="form-input"
            required
          />
        </div>

        <!-- Descripción -->
        <div class="form-group">
          <label class="form-label">Descripción *</label>
          <textarea
            v-model="form.description"
            placeholder="Descripción del servicio..."
            class="form-input form-textarea"
            rows="3"
            required
          ></textarea>
        </div>

        <!-- Link -->
        <div class="form-group">
          <label class="form-label">Link</label>
          <input
            v-model="form.link"
            type="text"
            placeholder="/services/consulta"
            class="form-input"
          />
        </div>

        <!-- Icono -->
        <div class="form-group">
          <label class="form-label">Icono (Material Symbols) *</label>
          <input
            v-model="form.icon"
            type="text"
            placeholder="Ej: stethoscope, vaccines, memory"
            class="form-input"
            required
          />
          <p class="form-hint">Nombre del icono de Material Symbols</p>
        </div>

        <!-- Background y Color -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Background</label>
            <input
              v-model="form.bg"
              type="text"
              placeholder="bg-primary/10"
              class="form-input"
            />
            <p class="form-hint">Clase Tailwind para el fondo</p>
          </div>

          <div class="form-group">
            <label class="form-label">Color</label>
            <input
              v-model="form.color"
              type="text"
              placeholder="text-primary"
              class="form-input"
            />
            <p class="form-hint">Clase Tailwind para el color</p>
          </div>
        </div>

        <!-- Procesos (JSON) -->
        <div class="form-group">
          <label class="form-label">Procesos</label>
          <div class="procesos-container">
            <div v-for="(proceso, index) in form.procesos" :key="index" class="proceso-item">
              <input
                v-model="form.procesos[index]"
                type="text"
                placeholder="Paso del proceso"
                class="form-input proceso-input"
              />
              <button
                type="button"
                @click="removeProceso(index)"
                class="proceso-remove"
              >
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
            <button
              type="button"
              @click="addProceso"
              class="add-proceso-btn"
            >
              <span class="material-symbols-outlined">add</span>
              Agregar Proceso
            </button>
          </div>
        </div>
      </form>

      <div class="modal-footer">
        <button type="button" class="btn-cancel" @click="closeModal">
          Cancelar
        </button>
        <button type="submit" class="btn-submit" @click="handleSubmit" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="material-symbols-outlined animate-spin">progress_activity</span>
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface ServiceForm {
  id?: number
  title: string
  description: string
  link: string | null
  bg: string | null
  color: string | null
  procesos: string[]
  icon: string
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
    title: '',
    description: '',
    link: null,
    bg: null,
    color: null,
    procesos: [],
    icon: ''
  })
})

const emit = defineEmits<Emits>()

const isSubmitting = ref(false)
const form = ref<ServiceForm>({
  title: '',
  description: '',
  link: null,
  bg: null,
  color: null,
  procesos: [],
  icon: ''
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = {
      ...newData,
      link: newData.link ?? null,
      bg: newData.bg ?? null,
      color: newData.color ?? null,
      procesos: Array.isArray(newData.procesos) ? newData.procesos : []
    }
  }
}, { immediate: true })

const addProceso = () => {
  form.value.procesos.push('')
}

const removeProceso = (index: number) => {
  form.value.procesos.splice(index, 1)
}

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
  max-width: 550px;
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
  font-weight: 600;
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
  border-color: #00ced1;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-hint {
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  margin-top: 4px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Procesos */
.procesos-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.proceso-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.proceso-input {
  flex: 1;
}

.proceso-remove {
  background: rgba(239, 68, 68, 0.2);
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.proceso-remove:hover {
  background: rgba(239, 68, 68, 0.3);
}

.add-proceso-btn {
  background: rgba(0, 206, 209, 0.2);
  border: 1px dashed rgba(0, 206, 209, 0.5);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  color: #00ced1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  transition: background 0.2s;
}

.add-proceso-btn:hover {
  background: rgba(0, 206, 209, 0.3);
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
  background: #00ced1;
  border: none;
  color: rgb(15, 35, 35);
}

.btn-submit:hover:not(:disabled) {
  background: #00a8a9;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
