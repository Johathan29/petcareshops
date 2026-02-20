<script setup lang="ts">
import AdoptionChart from '../../components/DashBoard/charts/AdoptionChart.vue'
import ServicesChart from '../../components/DashBoard/charts/ServicesChart.vue'
import DashboardStats from '../../components/DashBoard/DashboardStats.vue'
import UserList from '../../components/DashBoard/Users/UserList.vue'
</script>

<template>
  <section class="space-y-8 w-full">

    <!-- Stats -->
    <DashboardStats />

    <!-- Charts Grid -->
    <div
      class="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        gap-6
        items-stretch
      "
    >
      <!-- Adoption Chart (ocupa más espacio en desktop) -->
      <div class="md:col-span-2 xl:col-span-2 h-max md:h-auto">
        <AdoptionChart class="h-full" />
      </div>

      <!-- Services Chart -->
      <div class="h-max md:h-max">
        <ServicesChart class="h-full" />
      </div>
    </div>

    <!-- User List Full Width -->
   

  </section>
</template>