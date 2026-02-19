<script setup lang="ts">
import { reactive } from 'vue'
import { useAdoptions } from '../../composables/useAdoptions'

const props = defineProps({
  editData: Object
})

const emit = defineEmits(['saved'])

const { createAdoption, updateAdoption } = useAdoptions()

const form = reactive({
  pet_name: '',
  pet_type: '',
  status: 'pending',
  user_id: ''
})

const handleSubmit = async () => {
  if (props.editData) {
    await updateAdoption(props.editData.id, form)
  } else {
    await createAdoption(form)
  }

  emit('saved')
}
</script>

<template>
  <div class="p-6">
    <input v-model="form.pet_name" placeholder="Nombre mascota" />
    <input v-model="form.pet_type" placeholder="Tipo" />

    <select v-model="form.status">
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>

    <button @click="handleSubmit">
      Guardar
    </button>
  </div>
</template>
