<script setup lang="ts">
import { onMounted, computed, ref, h } from "vue";
import { useAuthStore } from "../../stores/auth.store";
import { usePetStore } from "../../stores/pet.store";
import { useAppointmentStore } from "../../stores/appointment.store";
import { useAdoptionStore } from "../../stores/adoption.store";
import StatCard from "./UI/StatCard.vue";
import { useServicesStore } from "../../stores/service.store";
const userStore = useAuthStore();
const petStore = usePetStore();
const appointmentStore = useAppointmentStore();
const adoptionStore = useAdoptionStore();
const services=useServicesStore()
const loading = ref(true);

onMounted(async () => {
  await Promise.all([
    userStore.fetchUsers(),
    petStore.fetch(),
    services.fetch(),
    adoptionStore.fetch(),
  ]);
  loading.value = false;
});

/* ===============================
   COMPUTED METRICS
================================= */

const totalUsers = computed(() => {
  return userStore.fetchUsers.length
}
);
const totalServices = computed(() => {
  return services.services.length
}
);
console.log(totalUsers)
const activePets = computed(() =>
  petStore.pets.length
);

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split("T")[0];

  return appointmentStore.appointments.filter((a) =>
    a.date?.startsWith(today)
  ).length;
});

const totalAdoptions = computed(() =>
  adoptionStore.adoptions.filter((a) => a.status === "approved").length
);
</script>

<template>
    
  <div v-if="loading" class="text-white">Loading dashboard...</div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    
    <!-- USERS -->
    <StatCard
      title="Total Users"
      :value="userStore.users.length"
      icon="person"
      growth="+5.2%"
      subtitle="registered users"
    />

    <!-- PETS -->
    <StatCard
      title="Active Pets"
      :value="activePets"
      icon="pets"
      growth="+2.1%"
      subtitle="available now"
    />

    <!-- APPOINTMENTS -->
    <StatCard
      title="Today's Appointments"
      :value="totalServices"
      icon="event"
      growth="-3.4%"
      subtitle="today"
      negative
    />

    <!-- ADOPTIONS -->
    <StatCard
      title="Approved Adoptions"
      :value="totalAdoptions"
      icon="favorite"
      growth="+8.7%"
      subtitle="completed"
    />
  </div>
</template>
