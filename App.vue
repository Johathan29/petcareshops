<script setup>
import Header from './components/Header.vue';
import { onMounted } from 'vue'

</script>
<template>
  <header id="header">
    <div class="top-bar py-2">
      <div class="container">
        <div class="d-flex">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
              <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
          </div>
          <Header />
        </div>
      </div>
    </div>
  </header>
  <div class="overflow-x-none">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
