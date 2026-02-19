<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { animate, stagger, inView } from "motion";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Data from "../Data";

/* =========================
   DATA
========================= */
const slides = Data.value[0] ?? [];

/* =========================
   SPLIDE OPTIONS
========================= */
const options = {
  type: "loop",
  autoplay: true,
  interval: 5000,
  pauseOnHover: false,
  rewind: true,
  gap: "1rem",
  height: "100vh",
  breakpoints: {
    640: { height: "100vh" },
    768: { height: "90vh" },
    1024: { height: "600px" },
  },
};

/* =========================
   PERFORMANCE
========================= */
const heroVisible = ref(false);
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const cache = new WeakMap<HTMLElement, any>();

const getNodes = (el: HTMLElement) => {
  if (cache.has(el)) return cache.get(el);

  const nodes = {
    badge: el.querySelectorAll(".badge-anim"),
    title: el.querySelectorAll(".title-anim"),
    desc: el.querySelectorAll(".desc-anim"),
    btns: el.querySelectorAll(".btn-anim"),
  };

  cache.set(el, nodes);
  return nodes;
};

/* =========================
   ANIMATIONS
========================= */
const runAnimations = (el: HTMLElement) => {
  if (reducedMotion) return;

  const { badge, title, desc, btns } = getNodes(el);

  animate(badge, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.4 });
  animate(title, { opacity: [0, 1], x: [-40, 0] }, { duration: 0.5 });
  animate(desc, { opacity: [0, 1], y: [30, 0] }, { duration: 0.5 });
  animate(
    btns,
    { opacity: [0, 1], y: [20, 0] },
    {
      duration: 0.4,
      delay: stagger(0.15),
    },
  );
};

/* =========================
   LIFECYCLE
========================= */
onMounted(async () => {
  await nextTick();

  inView(
    ".hero-slider",
    () => {
      heroVisible.value = true;
    },
    { margin: "-20%" },
  );
});
</script>

<template>
  <Splide
    class="hero-slider relative w-full h-full max-h-[45rem]"
    :options="options"
    aria-label="Hero Slider"
    @splide:active="(e) => heroVisible && runAnimations(e.slide)"
  >
    <SplideSlide
      v-for="(item, index) in slides"
      :key="index"
      class="relative slide-anim max-h-[45rem]"
    >
      <!-- Background -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url('${item.imagen}')` }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/30"
        ></div>

        <!-- Content -->
        <div
          class="relative h-full flex flex-col justify-center max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10"
        >
          <div class="max-w-2xl">
            <!-- Badge -->
            <span
              class="badge-anim inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase bg-teal-50 text-teal-900 rounded-full"
            >
              {{ item.estado }}
            </span>

            <!-- Title -->
            <h1
              class="title-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style="text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6)"
            >
              {{ item.title }}
            </h1>

            <!-- Description -->
            <p
              class="desc-anim text-base sm:text-lg md:text-xl text-slate-200 mb-8 mx-[4rem] truncate"
            >
              {{ item.description }}
            </p>

            <!-- Buttons -->
            
              <div  class="flex flex-col sm:flex-row gap-4 mx-[4rem] ">
                <div v-for="(btn, i) in item.button">
                   <router-link
                  
                  :key="i"
                  v-if="btn?.link"
                  :to="btn.link"
                  class="btn-anim w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white "
                  :class="
                    btn.type === 'action'
                      ? 'bg-primary text-white font-bold text-sm hover:bg-sky-700'
                      : 'bg-primary text-white font-bold text-sm hover:bg-sky-700'
                  "
                >
                  {{ btn.title }}
                </router-link>
                </div>
               
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
