<script setup lang="ts">
import { onMounted } from 'vue'
import { useAdoptions } from '../../composables/useAdoptions'
import AdoptionStatusBadge from './AdoptionStatusBadge.vue'

const {
  adoptions,
  fetchAdoptions,
  deleteAdoption
} = useAdoptions()

onMounted(fetchAdoptions)

const handleDelete = async (id:string) => {
  await deleteAdoption(id)
  fetchAdoptions()
}
</script>

<template>
  <div class="bg-white shadow rounded-xl p-6">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b">
          <th>Mascota</th>
          <th>Tipo</th>
          <th>Usuario</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in adoptions" :key="item.id" class="border-b">
          <td>{{ item.pet_name }}</td>
          <td>{{ item.pet_type }}</td>
          <td>{{ item.profiles?.full_name }}</td>
          <td>
            <AdoptionStatusBadge :status="item.status" />
          </td>
          <td class="space-x-2">
            <button class="text-blue-600">Editar</button>
            <button
              class="text-red-600"
              @click="handleDelete(item.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
