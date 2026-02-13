<script setup lang="ts">
import { ref, onMounted } from "vue"
import Splide from "@splidejs/splide"
import data from '../Data'
const splideRef = ref<HTMLDivElement | null>(null)
let splide: Splide
interface desiases {
  id: number,
  title: string,
  description: string,
  type: string,
  color: string,
  action: string,
  image: string
}
const original = data.value[2];
onMounted(() => {
  splide = new Splide(splideRef.value!, {
    type: "loop",
    perPage: 4,
    perMove: 1,

    arrows: false,
    pagination: false,
    speed: 700,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 },
    },
  })

  splide.mount()
})

const next = () => splide.go(">")
const prev = () => splide.go("<")
</script>
<template>
  <section class="py-8 bg-secondary">
    <div class="max-w-screen-xl md:mx-auto px-5">

      <!-- HEADER -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-3xl font-bold  text-left text-white">Animal Diseases</h2>
          <p class="text-left text-white">
            Educational resources to protect your pets.
          </p>
        </div>

        <!-- CONTROLES -->
        <div class="flex gap-2">
          <button @click="prev" class="h-10 w-10 rounded-full border text-[1.6rem] font-bold text-white hover:!text-[#0F6CBD] hover:bg-white
                   transition">
            ‹
          </button>
          <button @click="next" class="h-10 w-10 text-white hover:!text-[#0F6CBD] hover:bg-white  text-[1.6rem] font-bold  rounded-full border border-secondary-foreground/20
                   hover:bg-secondary-foreground/10 transition">
            ›
          </button>
        </div>
      </div>

      <!-- SLIDER -->
      <div ref="splideRef" class="splide overflow-hidden h-[20rem]">
        <div class="splide__track h-full">
          <ul class="splide__list flex items-center">

            <!-- CARD -->
            <li v-for="(value, i) in original" :key="i"
              class="splide__slide min-w-0 shrink-0 grow-0
                     basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 hover:-translate-y-2  duration-300 transition">
              <div class=" h-full">
                <div class="group hover:cursor-pointer hover:bg-white text-left bg-secondary-foreground/5 backdrop-blur-sm
                         rounded-3xl p-6 border border-secondary-foreground/10
                         hover:border-primary/30 transition-all duration-500
                         h-full flex flex-col">
                  <!-- BADGE -->
                  <div class="inline-flex items-center rounded-full px-2.5 py-0.5
                           text-xs font-semibold mb-4 w-fit text-white " :class="value.color">
                    {{ value.type }}
                  </div>

                  <!-- ICON -->
                  <div class="text-5xl mb-4">
                    {{ value.image }}
                  </div>

                  <!-- TITLE -->
                  <h3 class="text-xl font-bold text-white  mb-3  group-hover:!text-[#0F6CBD] transition-colors">
                    {{ value.title }}
                  </h3>

                  <!-- DESCRIPTION -->
                  <p class="text-white  group-hover:!text-[#0F6CBD] text-sm mb-6 flex-grow">
                    {{ value.description }}
                  </p>

                  <!-- ACTION -->
                  <router-link :to="`diseases/${value.id}`" class="inline-flex items-center gap-2 text-white  group-hover:!text-[#0F6CBD]  group-hover:underline
                           font-medium text-sm group/link">
                    {{ value.action }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 transition-transform
                             group-hover/link:translate-x-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>

    </div>
  </section>
</template>
