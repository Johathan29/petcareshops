<script setup lang="ts">
import { reactive, ref, computed } from "vue"

interface MascotaForm {
  nombre: string
  especie: string
  raza: string
  edad: string
  peso: string
  registro: string
  genero: string
  estado: string
}

const mascota = reactive<MascotaForm>({
  nombre: "",
  especie: "",
  raza: "",
  edad: "",
  peso: "",
  registro: "",
  genero: "",
  estado: ""
})

const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const showConfirmModal = ref(false)
const showSuccessModal = ref(false)

const emit = defineEmits(["close"])

/* 🔎 VALIDACIÓN */
const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!mascota.nombre) errors.nombre = "El nombre es obligatorio"
  if (!mascota.especie) errors.especie = "Seleccione una especie"
  if (!mascota.raza) errors.raza = "La raza es obligatoria"
  if (!mascota.edad) errors.edad = "La edad es obligatoria"
  if (!mascota.peso) errors.peso = "El peso es obligatorio"
  if (!mascota.genero) errors.genero = "Seleccione un género"
  if (!mascota.estado) errors.estado = "Seleccione un estado"

  return Object.keys(errors).length === 0
}

/* 📨 ENVÍO */
const submitForm = () => {
  if (!validateForm()) return
  showConfirmModal.value = true
}

const confirmSend = async () => {
  showConfirmModal.value = false
  loading.value = true

  try {
    const response = await fetch("http://localhost:3000/api/mascotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mascota)
    })

    if (!response.ok) throw new Error()

    Object.keys(mascota).forEach(
      key => (mascota[key as keyof MascotaForm] = "")
    )

    showSuccessModal.value = true
  } catch {
    alert("Error al guardar la mascota")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="space-y-4 text-left"
  >
    <h2 class="text-2xl font-bold text-[#0f6cbdc5]">Registrar Mascota</h2>
<hr/>
    <!-- INPUT -->
    <div>
      <label class="label">Nombre</label>
      <input v-model="mascota.nombre" class="input" />
      <p v-if="errors.nombre" class="error">{{ errors.nombre }}</p>
    </div>

    <div>
      <label class="label">Especie</label>
      <select v-model="mascota.especie" class="input">
        <option value="">Seleccione</option>
        <option>Perro</option>
        <option>Gato</option>
        <option>Otro</option>
      </select>
      <p v-if="errors.especie" class="error">{{ errors.especie }}</p>
    </div>

    <div>
      <label class="label">Raza</label>
      <input v-model="mascota.raza" class="input" />
      <p v-if="errors.raza" class="error">{{ errors.raza }}</p>
    </div>

    <div>
      <label class="label">Edad</label>
      <input v-model="mascota.edad" class="input" />
      <p v-if="errors.edad" class="error">{{ errors.edad }}</p>
    </div>

    <div>
      <label class="label">Peso</label>
      <input v-model="mascota.peso" class="input" />
      <p v-if="errors.peso" class="error">{{ errors.peso }}</p>
    </div>

    <div>
      <label class="label">Registro</label>
      <input v-model="mascota.registro" class="input" />
    </div>

    <div>
      <label class="label">Género</label>
      <select v-model="mascota.genero" class="input">
        <option value="">Seleccione</option>
        <option>Macho</option>
        <option>Hembra</option>
      </select>
      <p v-if="errors.genero" class="error">{{ errors.genero }}</p>
    </div>

    <div>
      <label class="label">Estado</label>
      <select v-model="mascota.estado" class="input">
        <option value="">Seleccione</option>
        <option>Activo</option>
        <option>Inactivo</option>
        <option>Adoptado</option>
      </select>
      <p v-if="errors.estado" class="error">{{ errors.estado }}</p>
    </div>

    <div class="flex gap-4 pt-4">
      <button class="flex items-center gap-2 px-6 py-2.5 bg-[#0f6cbd] text-white rounded-[.5rem] hover:bg-[#2881cf] transition-colors" type="submit">
       <span class="material-symbols-outlined">
save
</span>
        Guardar Mascota
      </button>
      <button type="button" @click="emit('close')" class="bg-red-400 text-white px-6 rounded-[.5rem] hover:bg-red-700 ">
        Cancelar
      </button>
    </div>
  </form>
<!-- CONFIRM MODAL -->
<div v-if="showConfirmModal" class="modal-backdrop">
  <div class="modal scale-in">
    <h3 class="font-bold text-lg">Confirmar envío</h3>
    <p>¿Deseas registrar esta mascota?</p>

    <div class="flex justify-end gap-4 mt-6">
      <button @click="showConfirmModal = false">Cancelar</button>
      <button @click="confirmSend" class="btn-primary">
        Confirmar
      </button>
    </div>
  </div>
</div>

<!-- SUCCESS MODAL -->
<div v-if="showSuccessModal" class="modal-backdrop">
  <div class="modal scale-in">
    <h3 class="font-bold text-lg text-green-600">¡Registro exitoso! 🎉</h3>
    <button @click="showSuccessModal = false" class="btn-primary mt-4">
      Aceptar
    </button>
  </div>
</div>

</template>

<style scoped>
.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgb(78, 78, 78);
}
.input {
  width: 100%;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
}
input:focus-visible{
    outline: 1px #2563eb solid;
}
.error {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.2rem;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 400px;
}
.scale-in {
  animation: scaleIn .25s ease;
}
@keyframes scaleIn {
  from { transform: scale(.9); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: .6rem 1.2rem;
  border-radius: .5rem;
}
.btn-cancel {
  background: #f87171;
  color: white;
  padding: .6rem 1.2rem;
  border-radius: .5rem;
}
</style>
