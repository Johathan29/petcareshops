<script setup lang="ts">
import Footer from '../components/footer.vue';
import Header from '../components/Header.vue';

</script>
<template>
    <Header></Header>
  <div >
    <!-- Navbar si tienes -->
    
    <router-view />
<Footer></Footer>
    <!-- Footer si tienes -->
  </div>
</template>
