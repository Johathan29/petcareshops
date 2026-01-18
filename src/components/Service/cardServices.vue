<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { animate, stagger, inView } from 'motion'

/* ------------------------------------
   Types
------------------------------------ */
interface Service {
  title: string
  description: string
  icon: any
  link: string
  bg: string
  color: string
  procesos: Record<string, string>
}

const props = defineProps<{ data: Service[] }>()

/* ------------------------------------
   Route state
------------------------------------ */
const route = useRoute()
const isHome = computed(() => route.path === '/')

/* ------------------------------------
   Derived state
------------------------------------ */
const visibleServices = computed(() =>
  isHome.value ? props.data.slice(0, 3) : props.data.slice(1)
)

const CardWrapper = computed(() => (isHome.value ? RouterLink : 'div'))

const gridClasses = computed(() =>
  isHome.value
    ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid gap-6 grid-cols-1 lg:grid-cols-2'
)

const cardHoverClass = computed(() =>
  isHome.value ? 'hover:-translate-y-2' : 'hover:shadow-md cursor-default'
)

/* ------------------------------------
   Utils
------------------------------------ */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '')

/* ------------------------------------
   Animations
------------------------------------ */
onMounted(() => {
  inView(
    '.service-card',
    ({ target }) => {
      animate(
        target,
        {
          opacity: [0, 1],
          transform: ['translateY(30px)', 'translateY(0px)']
        },
        {
          duration: 0.6,
          easing: 'ease-out',
          delay: stagger(0.12)
        }
      )
    },
    { once: true }
  )
})
</script>

<template>
  <div :class="gridClasses">
    <component
      :is="CardWrapper"
      v-for="service in visibleServices"
      :key="service.title"
      :id="slugify(service.title)"
      v-bind="isHome ? { to: service.link } : {}"
      class="service-card group flex gap-4 h-full bg-card rounded-3xl p-8
             border border-border/50 relative shadow-card
             hover:shadow-hover transition-all duration-300
             bg-white/50 hover:bg-white"
      :class="cardHoverClass"
    >
      <!-- ICON -->
      <div
        class="w-min h-min p-[4px] rounded-md transition-transform
               duration-300 ease-out will-change-transform
               group-hover:scale-110"
        :class="[service.bg, service.color]"
      >
        <FontAwesomeIcon :icon="service.icon" class="w-8 h-8" />
      </div>

      <div class="w-fit">
        <!-- TITLE -->
        <h3
          class="text-xl font-bold mb-3 text-black text-left
                 group-hover:text-[#0f6cbdc5] transition duration-300"
        >
          {{ service.title }}
        </h3>

        <!-- DESCRIPTION -->
        <p class="text-muted-foreground leading-relaxed mb-4 text-left pb-[1rem] border-b-[1px] border-gray-500/20 group-hover:border-[#0f6cbdc5]">
          {{ service.description }}
        </p>

        <!--<hr class="my-2 group-hover:bg-[#0f6cbdc5] h-[0.1rem]" />-->

        <!-- CTA / PROCESOS -->
        <template v-if="isHome">
          <div
            class="flex items-center text-primary font-semibold text-sm
                   absolute bottom-[1rem] gap-2
                   group-hover:gap-3 transition-all"
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
              class="w-4 h-4 transition-transform
                     group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </template>

        <template v-else>
          <ul class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <li
              v-for="(value, i) in service.procesos"
              :key="i"
              class="flex w-max items-center gap-2 text-sm
                     text-slate-500 group-hover:text-black"
            >
             <span
  class="w-1.5 h-1.5 rounded-full
         bg-gray-400
         group-hover:bg-[#0f6cbdc5]
         transition-transform duration-300
         group-hover:scale-125"
></span>
              {{ value }}
            </li>
          </ul>
          <RouterLink :to="`/services/${slugify(service.title)}`">ver mas</RouterLink>
        </template>
      </div>
    </component>
  </div>

  <!-- CTA HOME -->
  <div v-if="isHome" class="pt-[4rem] text-center">
    <RouterLink
      to="/services"
      class="inline-flex items-center justify-center gap-2
             font-semibold bg-sky-500 text-white shadow-md
             hover:shadow-hover transition-all duration-300
             group h-14 rounded-2xl px-8 text-base"
    >
      Ver todos los servicios
      <FontAwesomeIcon
        :icon="faArrowRight"
        class="w-4 h-4 group-hover:translate-x-1.5
               transition duration-300"
      />
    </RouterLink>
  </div>
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
