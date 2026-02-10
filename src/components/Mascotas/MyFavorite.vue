<script setup lang="ts">
import { computed, defineProps } from 'vue'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faHeart } from '@fortawesome/free-solid-svg-icons'
interface Pet {
   id: number,
    nombre: string,
    especie: string,
    raza: string,
    edad: string,
    peso: string,
    registro: string,
    genero: string,
    estado: string,
    color: string,
    counterLike:number,
    nacimiento: string,
    microchip: string,
    imagen:string,
    owner: [ {
      nombre: string,
      telefono: string
    }]
}

const props = defineProps<{
  favorites: Pet[]
}>()
const sortedFavorites = computed(() => {
  return [...props.favorites].sort(
    (a, b) => b.counterLike - a.counterLike
  )
})
const formatLikes = (value: number): string => {
  if (value < 1_000) return value.toString()
  if (value < 1_000_000) return `${(value / 1_000).toFixed(1).replace('.0', '')}K`
  return `${(value / 1_000_000).toFixed(1).replace('.0', '')}M`
}
</script>

<template>
   <div class="max-w-screen-xl md:mx-auto px-5">
    <ul class="max-w-full divide-y divide-gray-400 dark:divide-gray-700">
  <TransitionGroup name="list" tag="div">
    <li
      v-for="(item, index) in sortedFavorites"
      :key="item.id"
      class="p-4"
    >
      <div
        class="group bg-white dark:bg-surface-dark rounded-xl shadow-md
               hover:shadow-lg transition-all duration-200
               border border-slate-300 dark:border-slate-800
               overflow-hidden flex flex-col sm:flex-row items-start sm:items-center"
      >
        <!-- IMAGE -->
        <div class="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 relative">
          <div
            class="w-full h-full bg-cover bg-center"
            :style="`background-image:url(${item.imagen})`"
          ></div>
          <div class="absolute inset-0 bg-black/10 sm:hidden"></div>
        </div>

        <!-- CONTENT -->
        <div
          class="flex-1 p-5 sm:py-3 sm:px-6 flex flex-col sm:flex-row
                 gap-4 sm:items-center justify-between w-full"
        >
          <!-- INFO -->
          <div class="flex flex-col">
            <div class="flex items-center gap-3">
              <h3
                class="text-lg font-bold text-slate-900 dark:text-white
                       group-hover:text-[#0F6CBD] transition-colors"
              >
                {{ item.nombre }}
              </h3>

              <!-- STATUS -->
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full
                       text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': item.estado === 'Healthy',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': item.estado === 'Checkup',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': item.estado === 'Vaccination',
                  'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300': 'inline-flex px-3 py-1 rounded-full text-xs font-bold border bg-red-100 text-red-800'
                }"
              >
                {{ item.estado || 'Unknown' }}
              </span>
            </div>

            <div
              class="flex flex-wrap items-center gap-x-4 gap-y-1
                     text-sm text-slate-500 dark:text-slate-400 mt-1 justify-between"
            >
              <span>{{ item.especie }}</span>
              <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <span>{{ item.edad }}  Old</span>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
              <div
                v-if="item.id"
                class="flex items-center gap-1 text-red-500"
              > 
                <span class="text-slate-400   ">{{  formatLikes(item.counterLike) }}</span>
                <FontAwesomeIcon :icon="faHeart"/>
                
               
        </div>
              
            </div>
          </div>

          <!-- ACTIONS -->
          <div
            class="flex items-center gap-3 sm:ml-auto w-full sm:w-auto
                   pt-3 sm:pt-0 border-t sm:border-t-0
                   border-slate-100 dark:border-slate-700"
          >
            <router-link
    
    :to="`/adoption/${item.id}`" class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2  dark:bg-slate-700/50 bg-primary hover:bg-[#2881cf]  text-white dark:text-slate-300 rounded-lg text-sm font-semibold transition-colors duration-400">
<span class="material-symbols-outlined text-[18px]">visibility</span>
<span class="sm:hidden lg:inline ">View Details</span>
<span class="hidden sm:inline lg:hidden">View</span>
            </router-link>

            <button
              @click="Delete(index)"
              class="flex-1 sm:flex-none flex items-center justify-center gap-2
                     px-4 py-2 bg-red-50 dark:bg-red-900/10
                     hover:bg-red-100 dark:hover:bg-red-900/30
                     text-red-600 dark:text-red-400
                     rounded-lg text-sm font-semibold transition-colors"
            >
              <span class="material-symbols-outlined text-[18px]">delete</span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  </TransitionGroup>
</ul>

    </div>
</template>

<style lang="css" scoped>
    .hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\:bg-primary:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(25 161 230 / var(--tw-bg-opacity, 1));
}
</style>