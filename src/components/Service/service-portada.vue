<script setup lang="ts">
import Data from '../../Data';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CardServices from './cardServices.vue'
import {useServicesStore} from '../../stores/service.store'
import { computed, onMounted } from 'vue';
const services = computed(() => servicesStore.services)
const servicesStore = useServicesStore()
onMounted(async () => {
  await Promise.all([
    servicesStore.fetch(),
  
  ])
})
/* ------------------------------------
   Icon Resolver - Dynamic FontAwesome
------------------------------------ */
const getServiceIcon = (iconName: any) => {
  if (!iconName) return faHeart
  // If it's already a FontAwesome icon object, return it directly
  if (typeof iconName === 'object' && iconName !== null) {
    return iconName
  }
  // If it's a string, return as array format for FontAwesome
  return ['fas', String(iconName)]
}

</script>

<template>
  <section class="py-16 bg-secondary">
    <div class="max-w-screen-xl mx-auto px-5">
      <!-- HEADER -->
      <header class="mb-16 text-left">
        <span
          class="inline-block font-semibold text-sm uppercase tracking-wider mb-4 text-white border-b-2 border-white p-2 "
        >
          Our Services
        </span>

        <h2
          class="font-display text-3xl md:text-4xl font-bold text-white mb-2"
        >
          Everything for the care of your pet
        </h2>

        <p class="text-gray-400 text-lg max-w-2xl">
          We offer comprehensive veterinary services with the best professional equipment and cutting-edge technology.
        </p>
      </header>

      <!-- GRID -->
     
      <CardServices :data="services"></CardServices>
    </div>
  </section>
</template>
<style scoped>
    .bg-terracotta-light {
    background: #ff00007a;
    color: #a30b0b;
}
.bg-sage-light {
    background: #87cefa66;
}
.bg-sky\/10 {
    background: lightgoldenrodyellow;
    color: #645a09;
}
</style>