<script setup lang="ts">
import Data from '../../Data';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CardServices from './cardServices.vue';



</script>

<template>
  <section class="py-16 bg-secondary">
    <div class="max-w-screen-xl mx-auto px-5">
      <!-- HEADER -->
      <header class="mb-16 text-left">
        <span
          class="inline-block font-semibold text-sm uppercase tracking-wider mb-4 text-gray-400 shadow-md"
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
      <div
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <a
          v-for="service in services"
          :key="service.title"
          :href="`${service.link}/#${service.title.replace(' ','').toLocaleLowerCase()}`"
          class="group block h-full bg-card rounded-3xl p-8 border border-border/50
                 shadow-card hover:shadow-hover transition-all duration-300
                 hover:-translate-y-2"
        >
          <!-- ICON -->
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                   transition-transform duration-300 group-hover:scale-110"
            :class="[service.bg, service.color]"
          >
          <FontAwesomeIcon :icon="service.icon"/>
            
          </div>

          <!-- TITLE -->
          <h3
            class="font-display text-xl font-bold text-foreground mb-3
                   group-hover:text-primary transition-colors"
          >
            {{ service.title }}
          </h3>

          <!-- DESCRIPTION -->
          <p class="text-muted-foreground leading-relaxed mb-4 text-left">
            {{ service.description }}
          </p>

          <!-- CTA -->
          <div
            class="flex items-center text-primary font-semibold text-sm
                   gap-2 group-hover:gap-3 transition-all"
          >
            Saber más
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-4 h-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </a>
      </div>
      <CardServices :data="Data.value[3]"></CardServices>
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