<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { animate, stagger, inView } from 'motion'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import Data from '../Data'
/* =========================
   PROPS
========================= */

  const slides= Data.value[0]


/* =========================
   SPLIDE OPTIONS
========================= */
const options = {
  type: 'loop',
  autoplay: 'playing',
  rewind: true,
  gap: '1rem',
  height: '100vh',
  heightRatio: 0.9,
  breakpoints: {
    640: { height: '100vh' },
    768: { height: '90vh' },
    1024: { height: '600px' },
  },
}

/* =========================
   PERFORMANCE STATE
========================= */
const heroVisible = ref(false)
const reducedMotion = window.matchMedia('(prefers-reduced-motion)').matches

const cache = new WeakMap<HTMLElement, any>()

const getNodes = (el: HTMLElement) => {
  if (cache.has(el)) return cache.get(el)

  const nodes = {
    badge: el.querySelectorAll('.badge-anim'),
    title: el.querySelectorAll('.title-anim'),
    desc: el.querySelectorAll('.desc-anim'),
    btns: el.querySelectorAll('.btn-anim'),
  }

  cache.set(el, nodes)
  return nodes
}

/* =========================
   ANIMATIONS
========================= */
const runAnimations = (el: HTMLElement) => {
  if (reducedMotion) return

  const { badge, title, desc, btns } = getNodes(el)

  animate(badge, { opacity: [0, 1], y: [-16, 0] }, { duration: 0.4 })
  animate(title, { opacity: [0, 1], x: [-32, 0] }, { duration: 0.5 })
  animate(desc, { opacity: [0, 1], y: [24, 0] }, { duration: 0.55 })
  animate(btns, { opacity: [0, 1], y: [20, 0] }, {
    duration: 0.4,
    delay: stagger(0.12),
  })
}

/* =========================
   LIFECYCLE
========================= */
onMounted(async () => {
  await nextTick()

  // Lazy animation (viewport)
  inView('.hero-slider', () => {
    heroVisible.value = true
  }, { margin: '-20%' })

  // Splide active slide
  const splide = document.querySelector('.splide')
  splide?.addEventListener('splide:active', (e: any) => {
    if (!heroVisible.value) return
    runAnimations(e.target)
  })
})
</script>

<template>
  <Splide
    class="hero-slider relative w-full h-full"
    :options="options"
    aria-label="Hero Slider"
  >
    <SplideSlide
      v-for="(item, index) in slides"
      :key="index"
      class="relative slide-anim"
    >
      <!-- Background -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('${item.imagen}')` }"
      >
      <div
        class="absolute inset-0 bg-gradient-to-r
               from-slate-900/95
               via-slate-900/70
               to-slate-900/30"
      >
</div>
      <!-- Content -->
      <div
        class="relative h-full flex flex-col justify-center
               max-w-[1280px] mx-auto
               px-4 sm:px-6 lg:px-10"
      >
        <div class="max-w-2xl">
          <!-- Badge -->
          <span
            class="badge-anim inline-block px-3 py-1 mb-6
                   text-xs font-semibold tracking-wider uppercase
                   bg-teal-50 text-teal-900 rounded-full"
          >
            {{ item.estado }}
          </span>

          <!-- Title -->
          <h1
            class="title-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                   font-bold text-white mb-6 leading-tight"
            style="text-shadow: 0 4px 20px rgba(0,0,0,.6)"
          >
            {{ item.nombre }}
          </h1>

          <!-- Description -->
          <p
            class="desc-anim text-base sm:text-lg md:text-xl
                   text-slate-200 mb-8 max-w-lg"
          >
            {{ item.description }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              v-for="(btn, i) in item.button"
              :key="i"
              class="btn-anim w-full sm:w-auto
                     px-6 sm:px-8 py-3 sm:py-4
                     font-semibold rounded-lg shadow-lg
                     transition-all flex items-center justify-center gap-2
                     text-white"
              :class="btn.type === 'action'
                ? 'bg-[#0968bb] hover:bg-[#074378]'
                : 'bg-white/10 hover:bg-white/20'"
            >
              {{ btn.title }}
            </button>
          </div>
        </div>
      </div>
      </div>
    </SplideSlide>
  </Splide>
</template>

<style scoped>
button.splide__arrow {
  background: rgba(15, 108, 189, 0.3) !important;
}
button.splide__arrow svg {
  fill: white;
}
</style>
