<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServicesStore } from '../../stores/service.store'
import { useAppointmentStore } from '../../stores/appointment.store'
import ServicesGrid from '../../components/DashBoard/Service/ServicesGrid.vue'
import ServicesTable from '../../components/DashBoard/Service/ServicesTable.vue'
import ServiceCreateModal from '../../components/DashBoard/Service/ServiceCreateModal.vue'

const servicesStore = useServicesStore()
const appointmentsStore = useAppointmentStore()

// UI State
const isModalOpen = ref(false)
const isEditing = ref(false)
const selectedService = ref<any>(null)
const activeTab = ref<'services' | 'appointments'>('services')

// Computed
const services = computed(() => servicesStore.services)
const loading = computed(() => servicesStore.loading)

// Methods
const appointmentStore = useAppointmentStore()

const statusFilter = ref('all')

const filteredAppointments = computed(() => {
  return appointmentStore.getByStatus(statusFilter.value)
})
const openCreateModal = () => {
  isEditing.value = false
  selectedService.value = null
  isModalOpen.value = true
}

const openEditModal = (service: any) => {
  isEditing.value = true
  selectedService.value = service
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  selectedService.value = null
}

const handleCreate = async (serviceData: any) => {
  await servicesStore.create(serviceData, [])
}

const handleUpdate = async (serviceData: any) => {
  await servicesStore.update(serviceData, [])
}

const handleDelete = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
    await servicesStore.remove(id)
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    servicesStore.fetch(),
    appointmentsStore.fetch()
  ])
})
</script>

<template>
  <section class="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
    <!-- Page Title & CTA -->
    <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div class="space-y-1">
        <h1 class="text-white text-4xl font-black leading-tight tracking-tight">
          Services &amp; Pricing
        </h1>
        <p class="text-slate-400 text-sm">
          Manage your clinic's offerings and standard rates.
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="flex items-center gap-2 px-6 py-2.5 bg-primary text-background-dark rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/10"
      >
        <span class="material-symbols-outlined text-[20px]">add</span>
        Agregar Servicio
      </button>
    </div>

    <!-- Segmented Control Toggle -->
    <div class="flex mb-8">
      <div
        class="flex h-12 w-full max-w-md items-center rounded-xl bg-card-dark p-1.5 border border-border-dark shadow-inner"
      >
        <label
          class="flex flex-1 cursor-pointer h-full items-center justify-center rounded-lg transition-all text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-background-dark text-slate-400"
        >
          <span class="truncate">Servicios</span>
          <input
            v-model="activeTab"
            checked=""
            class="hidden"
            type="radio"
            value="services"
          />
        </label>
        <label
          class="flex flex-1 cursor-pointer h-full items-center justify-center rounded-lg transition-all text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-background-dark text-slate-400"
        >
          <span class="truncate">Citas</span>
          <input
            v-model="activeTab"
            class="hidden"
            type="radio"
            value="appointments"
          />
        </label>
      </div>
    </div>

    <!-- Services Tab -->
    <Transition name="tab-fade" mode="out-in">
  <div :key="activeTab">
    
    <!-- Services -->
    <div v-if="activeTab === 'services'">
      <ServicesGrid
        :services="services"
        :loading="loading"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>

    <!-- Appointments -->
    <div v-else>
      <ServicesTable />
    </div>

  </div>
</Transition>
  </section>

  <!-- Create/Edit Modal -->
  <ServiceCreateModal
    :isOpen="isModalOpen"
    :isEditing="isEditing"
    :initialData="selectedService"
    @close="closeModal"
    @submit="isEditing ? handleUpdate : handleCreate"
  />
</template>

<style lang="css" scoped>
.bg-card-dark {
  --tw-bg-opacity: 1;
  background-color: #1a2e30;
}

.rounded-lg {
  border-radius: 0.5rem;
}
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.35s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.tab-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.tab-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.text-primary {
  color: rgb(0, 206, 209) !important;
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(32 74 75 / var(--tw-border-opacity, 1));
}

.hover\:border-primary\/50:hover {
  border-color: rgb(0 206 209 / 0.5);
}

.has-\[\:checked\]\:text-background-dark:has(:checked) {
  --tw-text-opacity: 1;
  color: rgb(15 35 35 / var(--tw-text-opacity, 1));
}

.has-\[\:checked\]\:bg-primary:has(:checked) {
  --tw-bg-opacity: 1;
  background-color: rgb(0 206 209 / var(--tw-bg-opacity, 1));
}

.text-background-dark {
  --tw-text-opacity: 1;
  color: rgb(15 35 35 / var(--tw-text-opacity, 1));
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(0 206 209 / var(--tw-bg-opacity, 1));
}

.bg-primary\/10 {
  background-color: rgb(0 206 209 / 0.1);
}
</style>
