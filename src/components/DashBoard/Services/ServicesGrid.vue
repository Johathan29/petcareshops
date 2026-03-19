<script setup lang="ts">

import ServiceCard from "./ServiceCard.vue"

const props = defineProps({
    services: Array
})

const emit = defineEmits(["edit"])

</script>

<template>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

        <ServiceCard v-for="service in services" :key="service.id" :service="service" @edit="emit('edit', service)" />

    </div>

</template>