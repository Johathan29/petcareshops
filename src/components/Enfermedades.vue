<script setup lang="ts">
import { onMounted } from "vue";
import Splide from "@splidejs/splide";

onMounted(() => {
  new Splide("#animal-diseases", {
    type: "loop",
    perPage: 4,
    gap: "1rem",
    arrows: false,
    pagination: false,
    breakpoints: {
      1280: { perPage: 4 },
      1024: { perPage: 3 },
      768: { perPage: 2 },
      640: { perPage: 1.2 }, // efecto moderno en mobile
    },
  }).mount();
});
</script>

<template>
  <section class="py-8 bg-secondary">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- HEADER -->
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white">
            Animal Diseases
          </h2>
          <p class="text-sm sm:text-base text-white/80">
            Educational resources to protect your pets.
          </p>
        </div>

        <!-- ARROWS -->
        <div class="hidden sm:flex gap-2">
          <button
            @click="$refs.splide?.go('<')"
            class="h-9 w-9 rounded-full border border-white/30 text-xl font-bold text-white hover:text-[#0F6CBD] hover:bg-white transition"
          >
            ‹
          </button>
          <button
            @click="$refs.splide?.go('>')"
            class="h-9 w-9 rounded-full border border-white/30 text-xl font-bold text-white hover:text-[#0F6CBD] hover:bg-white transition"
          >
            ›
          </button>
        </div>
      </div>

      <!-- SLIDER -->
      <div
        id="animal-diseases"
        ref="splide"
        class="splide overflow-hidden h-auto sm:h-[18rem] lg:h-[20rem]"
      >
        <div class="splide__track">
          <ul class="splide__list">

            <!-- CARD -->
            <li
              v-for="(disease, index) in diseases"
              :key="index"
              class="splide__slide px-2"
            >
              <div
                class="group bg-secondary-foreground/5 backdrop-blur-sm 
                       rounded-2xl p-4 sm:p-5 lg:p-6 
                       border border-secondary-foreground/10 
                       hover:bg-white hover:border-primary/30
                       transition-all duration-300 
                       h-full flex flex-col"
              >

                <!-- BADGE -->
                <div
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mb-3 w-fit text-white',
                    disease.badgeColor
                  ]"
                >
                  {{ disease.category }}
                </div>

                <!-- ICON -->
                <div class="text-4xl sm:text-5xl mb-3 sm:mb-4">
                  {{ disease.icon }}
                </div>

                <!-- TITLE -->
                <h3
                  class="text-lg sm:text-xl font-bold text-white 
                         group-hover:text-[#0F6CBD] transition-colors mb-3"
                >
                  {{ disease.title }}
                </h3>

                <!-- DESCRIPTION -->
                <p
                  class="text-xs sm:text-sm text-white/80 
                         group-hover:text-[#0F6CBD] mb-5 flex-grow"
                >
                  {{ disease.description }}
                </p>

                <!-- ACTION -->
                <a
                  :href="disease.link"
                  class="inline-flex items-center gap-2 text-sm font-medium text-white 
                         group-hover:text-[#0F6CBD] group-hover:underline transition"
                >
                  {{ disease.action }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>

              </div>
            </li>

          </ul>
        </div>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      diseases: [
        {
          category: "Viral",
          badgeColor: "bg-rose-500",
          icon: "🦠",
          title: "Canine Parvovirus",
          description:
            "A retrovirus that weakens the immune system. Regular testing and vaccination are essential.",
          action: "Learn Prevention",
          link: "/diseases/1",
        },
        {
          category: "Bacterial",
          badgeColor: "bg-amber-500",
          icon: "🔬",
          title: "Lyme Disease",
          description:
            "Transmitted by ticks. Watch for fever, swelling, and loss of appetite.",
          action: "View Symptoms",
          link: "/diseases/2",
        },
        {
          category: "Chronic",
          badgeColor: "bg-blue-500",
          icon: "💉",
          title: "Feline Diabetes",
          description:
            "Common in older cats. Signs include thirst, frequent urination and weight loss.",
          action: "Read Management",
          link: "/diseases/3",
        },
        {
          category: "Respiratory",
          badgeColor: "bg-emerald-500",
          icon: "🫁",
          title: "Kennel Cough",
          description:
            "Infectious bronchitis causing a persistent cough. Highly contagious.",
          action: "Treatment Options",
          link: "/diseases/4",
        },
      ],
    };
  },
};
</script>

<style scoped>
.splide__slide {
  display: flex;
}
</style>
