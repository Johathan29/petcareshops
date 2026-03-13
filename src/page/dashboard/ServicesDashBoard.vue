<script setup lang="ts">

import { ref, computed, onMounted } from "vue"
import { useServicesStore } from "../../stores/service.store"

import ServicesGrid from "../../components/DashBoard/Services/ServicesGrid.vue"
import ServicesFilter from "../../components/DashBoard/Services/ServicesFilter.vue"
import ServiceFormModal from "../../components/DashBoard/Services/ServiceFormModal.vue"
import DoctorsByServiceTable from "../../components/DashBoard/Services/DoctorsByServiceTable.vue"
import TodayServicesTable from "../../components/DashBoard/Services/TodayServicesTable.vue"

const store = useServicesStore()

const search = ref("")
const showModal = ref(false)
const editing = ref(null)
const dataService = ref<any>(null)
onMounted(async () => {

  await store.fetchServices()
  //await store.fetchDoctorsByService()
  //await store.fetchTodayServices()

})
const roles = computed(() => {

  const allRoles = store.services ?? []

  return allRoles



})
console.log(roles.value)
/*
const filteredServices = computed(() => {

  return store.services.filter(s =>
    s.name.toLowerCase().includes(search.value.toLowerCase())
  )

})*/
dataService.value = store.fetchServices
console.log(dataService.value)
const openCreate = () => {
  editing.value = null
  showModal.value = true
}

const openEdit = (service) => {
  editing.value = service
  showModal.value = true
}

</script>

<template>

  <section class="max-w-[1300px] mx-auto space-y-10 p-6">

    <header class="flex justify-between items-center flex-wrap gap-4">

      <h1 class="text-white text-3xl font-black">
        Services
      </h1>

      <button @click="openCreate" class="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold">

        Add Service

      </button>

    </header>

    <ServicesFilter v-model="search" />

    <ServicesGrid :services="roles" @edit="openEdit" />

    <DoctorsByServiceTable :data="store.serviceDoctors" />

    <TodayServicesTable :data="store.todayServices" />

    <ServiceFormModal v-if="showModal" :service="editing" @close="showModal = false" />

  </section>

</template>