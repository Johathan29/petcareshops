<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import ServicePortada from '../components/Service/service-portada.vue';
import Mascotas from './Mascotas.vue';
import Testimonio from './testimonio.vue';
import supabase from '../components/supabase.vue';

const activeclass = ref('active carousel-item');
</script>

<template>
  <HelloWorld></HelloWorld>
  <ServicePortada></ServicePortada>
  <Mascotas></Mascotas>
  <Testimonio></Testimonio>
  <supabase></supabase>
</template>

<script lang="ts">
export default {
  name: 'Home'
}
</script>

<style scoped>
.bg-secondary {
  background-color: hsl(var(--secondary));
}

.text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

* {
  border-color: hsl(var(--border));
}
</style>
