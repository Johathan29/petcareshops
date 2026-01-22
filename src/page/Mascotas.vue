<script setup lang="ts">
/* =====================================================
   📦 IMPORTS
===================================================== */
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

/* Flowbite UI */
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite'

/* Components */
import BreadCrum from '../components/Breadcrum.vue'
import CardMascota from '../components/UI/cardMascota.vue'
import MyFavorite from '../components/MyFavorite.vue'
import Data from '../Data.js'
import RegistrarMascotas from '../components/RegistrarMascotas.vue'
import { nextTick } from 'vue'
import { supabase } from '../config/supabase'
onMounted(async () => {
  //await fetchPets()
  await nextTick()

  initAccordions(),
  initCarousels(),
  initCollapses(),
  initDials(),
  initDismisses(),
  initDrawers(),
  initDropdowns(),
  initModals(),
  initPopovers(),
  initTabs(),
  getTodos(),
  initTooltips()
})

/* =====================================================
   🧩 TYPES & INTERFACES
===================================================== */
interface Owner {
  nombre: string
  telefono: string
}

export interface Pet {
  id: number
  nombre: string
  especie: string
  raza: string
  edad: string
  peso: string
  registro: string
  genero: string
  estado: string
  color: string
  nacimiento: string
  microchip: string
  imagen: string
  owner: Owner[],
  id_doctor:[]
}


/* =====================================================
   🌐 API CONFIG
===================================================== */
const API_URL = 'http://localhost:5000/api/animals'

/* =====================================================
   📊 STATE (GLOBAL DEL COMPONENTE)
===================================================== */
const pets = ref<Pet[]>([])
const supabaseValue=ref<Pet[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

/* UI State */
const showModal = ref(false)

/* Search & Filters */
const searchQuery = ref('')
const activeFilter = ref<'all' | 'dog' | 'cat' | 'bird' | 'others'>('all')

/* Favorites */
const favorites = ref<Pet[]>([])
const favoriteIds = ref<Set<number>>(new Set())

/* =====================================================
   🧭 ROUTE STATE
===================================================== */
const route = useRoute()
const isHome = computed(() => route.path === '/')
async function getTodos() {
  try {
    loading.value=true
    const { data } = await supabase.from('animals').select()
    pets.value=isHome.value ?  data.slice(0, 4) :  data  
  } catch (error) {
    console.log(error)
  }
  finally{
loading.value=false
  }
    
  }
/**
 * Indica si estamos en la Home (/)
 * Se usa para limitar a 4 mascotas
 */
 console.log(pets.value)

//pets.value = isHome.value ?  supabaseValue.value.slice(0, 4) :  supabaseValue.value


/**
 * Indica si estamos viendo el detalle
 */
const isDetailView = computed(() => !!route.params.id)

/* =====================================================
   DATA FETCHING
===================================================== */
/*const fetchPets = async () => {
  try {
    loading.value = true

    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Error al cargar mascotas')

    const data: Pet[] = await res.json()

    // Home solo muestra 4 mascotas
    pets.value = isHome.value ? data.slice(0, 4) : data
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
*/

/* =====================================================
   🔍 FILTERS & SEARCH
===================================================== */
const filteredPets = computed(() => {
  let result = pets.value

  // Filtro por tipo
  if (activeFilter.value !== 'all') {
    result = result.filter(
      pet => pet.especie.toLowerCase() === activeFilter.value
    )
  }

  // Búsqueda por texto
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(pet =>
      pet.nombre.toLowerCase().includes(q) ||
      pet.raza.toLowerCase().includes(q) ||
      pet.especie.toLowerCase().includes(q) ||
      String(pet.id).includes(q)
    )
  }

  return result
})

const setFilter = (type: typeof activeFilter.value) => {
  activeFilter.value = type
}

/* =====================================================
   FAVORITES LOGIC
===================================================== */
const onLikePet = (pet: Pet) => {
  if (favoriteIds.value.has(pet.id)) return

  favorites.value.push(pet)
  favoriteIds.value.add(pet.id)
}

const removeFavorite = (index: number) => {
  favoriteIds.value.delete(favorites.value[index].id)
  favorites.value.splice(index, 1)
}

const isFavorite = (id: number) => favoriteIds.value.has(id)

/* =====================================================
   🪟 MODAL HANDLERS
===================================================== */
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

/* =====================================================
   🍞 BREADCRUMB
===================================================== */
const breadCrumUrl = computed(() => ['Adoption'])

/* =====================================================
   🚀 LIFECYCLE
===================================================== */
const orderedPets = computed(() => {
  return [...filteredPets.value].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
  )
})
</script>



<template>
<div v-if="!isDetailView">
  <section v-if="!isHome">
    <BreadCrum :name="breadCrumUrl" ></BreadCrum>
  </section>
   <section class="bg-slate-50 dark:bg-[#0F6CBD] py-12 border-b-2 border-gray-500/10">
    
    <div class="max-w-screen-xl md:mx-auto px-[3.5rem]">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
<div>
<h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">Find your ideal partner
</h2>
<p class="text-slate-500 dark:text-slate-400 text-left mt-2 max-w-2xl">All our pets are vaccinated, dewormed and ready to give you unconditional love.</p>
</div>
<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto" v-if="!isHome">
<div class="relative flex-grow md:w-72 lg:w-96 group">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
<span class="material-symbols-outlined text-[15px] rotate-90">
<FontAwesomeIcon :icon="faSearch"/>
</span>
</div>
<input  v-model="searchQuery" class="block w-full pl-[2rem] pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-surface-dark text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-[#0F6CBD] dark:text-white transition-all shadow-sm hover:border-slate-300 dark:hover:border-slate-600" placeholder="Search by name, breed, or ID..." type="text">
</div>
<button  @click="openModal"  class="hidden sm:flex shrink-0 items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-sm text-sm font-semibold whitespace-nowrap" >
  <span class="material-symbols-outlined text-[20px]" >
add_circle
</span>
  Register New Pet 
</button>
<button class="sm:hidden flex items-center justify-center shrink-0 p-2.5 bg-primary text-white rounded-xl shadow-sm hover:bg-primary-dark transition-colors">
<span class="material-symbols-outlined">add</span>
<span class="ml-2 font-medium">Add Pet</span>
</button>
</div>
</div>
<div class="mb-6 px-6" v-if="!isHome">
<div class="flex items-center justify-between ">
<h2 class="text-xl font-bold text-[#0F6CBD] dark:text-white tracking-tight">Browse by Type</h2>
</div>
 <div class="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-6 py-8">

      <!-- ALL PETS (ACTIVE) -->
      <button class="group flex shrink-0 items-center gap-3 px-6 py-3 rounded-full  border border-[#0F6CBD] shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        :class="`${activeFilter==='all' ? 'bg-[#0F6CBD] text-white':'bg-white text-slate-600 hover:text-[#0F6CBD]'}`"
               @click="setFilter('all')"
      >
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="30px" fill="currentColor" class="transition-colors duration-300 " :class="`${activeFilter==='all' ? 'group-hover:text-white fill-white ':' group-hover:fill-[#0F6CBD]  fill-slate-500'}`"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1 0-1-.5-2.2-1.5-2.2-1.3 0-2.1 1.9-2.1 3.1 0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3 6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1 0 .9.4 1.8 1.3 1.8 1.3 0 2.2-1.8 2.2-3.1 0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1-.9 0-1.3.9-1.3 1.8 0 1.3 1 3.1 2.2 3.1.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4 0 1 .7 1.3 1.5 1.3 1.2 0 2.1-.8 3.2-.8 1 0 1.9.8 3 .8.8 0 1.7-.2 1.7-1.3 0-2.2-2.7-5.4-4.7-5.4z"></path> </g> </g></svg>
        <span class="font-semibold text-sm whitespace-nowrap">
          All Pets
        </span>
      </button>

      <!-- DOGS -->
      <button id="buttonPet"
        class="group flex shrink-0 items-center gap-3 px-6 py-3 rounded-full  border border-[#0F6CBD] shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        :class="`${activeFilter==='dog' ? 'bg-[#0F6CBD] text-white':'bg-white text-slate-600 hover:text-[#0F6CBD]'}`"
                @click="setFilter('dog')"
      >
      <svg  width="25px"  fill="currentColor" class="transition-colors duration-300 " :class="`${activeFilter==='dog' ? 'group-hover:text-white fill-white ':' group-hover:fill-[#0F6CBD]  fill-slate-500'}`" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M298.06,224,448,277.55V496a16,16,0,0,1-16,16H368a16,16,0,0,1-16-16V384H192V496a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V282.09C58.84,268.84,32,233.66,32,192a32,32,0,0,1,64,0,32.06,32.06,0,0,0,32,32ZM544,112v32a64,64,0,0,1-64,64H448v35.58L320,197.87V48c0-14.25,17.22-21.39,27.31-11.31L374.59,64h53.63c10.91,0,23.75,7.92,28.62,17.69L464,96h64A16,16,0,0,1,544,112Zm-112,0a16,16,0,1,0-16,16A16,16,0,0,0,432,112Z"></path></g></svg>
       <span class="font-semibold text-sm whitespace-nowrap">  
      Dogs
      </span>
      </button>

      <!-- CATS -->
      <button id="buttonPet"
         class="group flex shrink-0 items-center gap-3 px-6 py-3 rounded-full  border border-[#0F6CBD] shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        :class="`${activeFilter==='cat' ? 'bg-[#0F6CBD] text-white':'bg-white text-slate-600 hover:text-[#0F6CBD]'}`"
               @click="setFilter('cat')"
      >
      <svg  width="24px" fill="currentColor" class="transition-colors duration-300 " :class="`${activeFilter==='cat' ? 'group-hover:text-white fill-white ':'group-hover:fill-[#0F6CBD]  fill-slate-500'}`" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1077 923 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-827.3,979.5c0,0-2.2-13.1-5.2-17.1c-3.8-5.1-16.4-12.1-16.4-12.1c-2.6,3.7,3.6-9.8,7.3-22.7c0,0-24.2,3.2-46.8,27.6 c-6.4,7-17.8,38.6-17.8,38.6l-44.7,20.5c-31.1,12.9-82.7,26.2-82.7,97.7v30.5c-2.5-1.7-15.7-12.7-15.5-29.9 c0.1-13.6,1.9-27.5,3.6-39.9c3.1-22.7,5.5-47.1-3.7-57.6c-4.2-4.8-10.2-7.3-17.7-7.3c-4.9,0-8.9,4-8.9,8.9c0,4.9,4,8.9,8.9,8.9 c2.2,0,3.6,0.4,4.3,1.2c3.8,4.4,1.5,28.1-0.6,43.4c-1.7,12.9-3.7,27.5-3.7,42.2c0,16.2,5.6,31.4,15.7,42.8 c11.5,12.9,27.7,19.7,46.8,19.7c0,0,0,0,0,0h62.5h8.9h17.9c4.9,0,8.9-4,8.9-8.9s-4-8.9-8.9-8.9l-19.6,0l9.5-31.3 c0-4.5-1-8.8-2.7-12.6c-7.1-12.1-19.9-19.6-34-19.6c-6.2,0-12,1.4-17.5,4.1l-2.9-5.8c6.4-3.2,13.2-4.8,20.4-4.8 c16.8,0,32.3,9.2,40.3,24l0,0l0,0c0,0,33.1,50.7,36.4,57.9c0,0.1,0.1,0.1,0.1,0.2c0.9,2.7,3.1,4.7,5.9,5.3c0.1,0,0.2,0,0.3,0.1 c0.5,0.1,0.9,0.3,1.4,0.3h9.8c4.4,0,8.1-3.6,8.1-8.1c0-4.4-3.6-8.1-8.1-8.1h0.2c0,0-26.6-47.4-21.4-64.2 c23.7-37.2,36.5-72.5,36.5-72.5c5.1-11.6,18.2-20.5,20-21.7c4-2.7,9.5-6.1,10-11.3C-822.2,986.7-826,981.7-827.3,979.5z"></path> </g></svg>
         <span class="font-semibold text-sm whitespace-nowrap">Cats</span>
    </button>

      <!-- BIRDS -->
      <button
         class="group flex shrink-0 items-center gap-3 px-6 py-3 rounded-full  border border-[#0F6CBD] shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        :class="`${activeFilter==='bird' ? 'bg-[#0F6CBD] text-white':'bg-white text-slate-600 hover:text-[#0F6CBD]'}`"
               @click="setFilter('bird')"
      >
<svg  viewBox="0 0 24 24"  width="24px" fill="#0000000"  class="transition-colors duration-300 !bg-transparent " :class="`${activeFilter==='bird' ? 'group-hover:text-white fill-white ':'bg-white group-hover:fill-[#0F6CBD]  fill-slate-500'}`"   xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.7,3.55a1,1,0,0,1,0,1.422L18.77,8.862a9.542,9.542,0,0,1-.682,12.849,1,1,0,0,1-1.406,0L11.5,16.59,9.046,21.451a1,1,0,0,1-.732.536.959.959,0,0,1-.16.013,1,1,0,0,1-.7-.289L1.3,15.624a1,1,0,0,1,.26-1.607l4.9-2.422L1.3,6.493a1,1,0,0,1,0-1.422,9.733,9.733,0,0,1,10.642-2.05,1,1,0,1,1-.773,1.843,7.748,7.748,0,0,0-7.7.964l5.388,5.33a1,1,0,0,1-.26,1.608L3.7,15.188l4.181,4.135,2.457-4.861a1,1,0,0,1,1.6-.26l5.406,5.347a7.541,7.541,0,0,0-.658-10.012,1,1,0,0,1,0-1.422l3.785-3.744a3.392,3.392,0,0,0-3.918.6L12.7,8.776a1,1,0,0,1-1.7-.607,1.051,1.051,0,0,1,.446-.967L15.143,3.55A5.4,5.4,0,0,1,22.7,3.55Z"></path></g></svg>        
 <span class="font-semibold text-sm whitespace-nowrap">
  Birds</span>
      </button>

      <!-- OTHERS -->
      <button
        class="group flex shrink-0 items-center gap-3 px-6 py-3 rounded-full  border border-[#0F6CBD] shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        :class="`${activeFilter==='others' ? 'bg-[#0F6CBD] text-white hover:text-white ':'bg-white text-slate-600 hover:text-[#0F6CBD] '}`"
               @click="setFilter('others')"
      >
        <svg
         
          viewBox="0 0 24 24"
          fill="currentColor"
           width="24px"  class="transition-colors duration-300 !bg-transparent " :class="`${activeFilter==='others' ? 'group-hover:text-white fill-white ':'bg-white group-hover:fill-[#0F6CBD]  fill-slate-500'}`"
        >
          <path d="M12 5l7 7-7 7-7-7z" />
        </svg>
         <span class="font-semibold text-sm whitespace-nowrap">
        Others</span>
      </button>

    </div>
</div>


    <!-- GRID -->
 
    <CardMascota :data="orderedPets"   @like="onLikePet" :loading="loading"></CardMascota>
    
    <template v-if="isHome">
      <div  class="flex items-center justify-center py-6">
          <router-link to="/adoption" class="group flex items-center hover:text-[#0F6CBD] hover:shadow-[#0F6CBD]/30  justify-center gap-2 px-8 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-white transition-colors shadow-sm hover:shadow-md"> 
            View more 
            <span class="material-symbols-outlined group-hover:translate-x-1 duration-600 transition">
arrow_forward
</span>
          </router-link>
          
      </div>
    </template>
    <!-- Main modal -->
 <!-- MODAL -->
<div
  v-if="showModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
>
  <div class="bg-white dark:bg-slate-900 rounded-xl w-full max-w-xl p-6 relative">

    <!-- Close -->
    <button
      @click="closeModal"
      class="absolute top-3 right-3 text-gray-500 hover:text-red-500"
    >
      ✕
    </button>

    <!-- FORM -->
    <RegistrarMascotas @close="closeModal" />
  </div>
</div>


  </div>
</section>

  <section class="bg=white" v-if="!isHome">
   <div class="max-w-screen-xl md:mx-auto px-[3.5rem] py-8 space-y-4">
    <div >
      <h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">My Favorites</h2>
<p class="text-slate-500 dark:text-slate-400 text-base mt-2 text-left">manage the pets you are tracking and monitoring.</p>

    </div>

<template v-if="favorites.length!==0">
<MyFavorite :favorites="favorites"></MyFavorite>
</template>
<template v-else>
<div class="p-6 border-2 bg-white text-red-500 rounded-xl flex gap-4">
          <span>No posee mascotas favoritas</span>
        </div>
</template>
</div>
  </section>
</div>

  <router-view v-else></router-view>

 </template>

<style scoped>

/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style scoped>
.col-md-6 {
  height: 33rem;
  list-style: none;
}
.card {
  height: 32rem;
  max-height: 34rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.card-img,
.card-img-bottom,
.card-img-top {
  width: 100%;
  height: 258px;
}
.col-md-6 {
  flex: 0 0 auto;
  width: 33%;
  line-height: 0.9;
}
.card {
  height: 32rem;

  max-height: 34rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  padding: 0px;
  border-bottom: 3px solid #74aaff5e;
}
</style>

<!--<script setup lang="ts">

import data from './Data';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { onMounted } from 'vue'
import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})

import { ref, computed } from 'vue';
const counter = ref(0);
const classes = ref('card  d-none');
const valorId = ref([]);
const animalNames = ref({});
const dataupdate = ref([]);
const letra = 'siete';
const favoritoAnimales = ref([]);
const url=window.location;
const id=ref(0);
const breadcrum=ref();
id.value=url.hash.split('/');
console.log(id.value);
const ruta=ref()
ruta.value=url.pathname[1]+url.pathname[2]+url.pathname[3]+url.pathname[4]+url.pathname[5]+url.pathname[6]+url.pathname[7]+url.pathname[8];
let convertir = ref([]);
const contador = () => {
  letra;
  counter.value++;
};
animalNames.value = data.value;
const animales = () => {
  let nombre = '';
  let tipo = '';
};
const add = (id) => {
  const idmascosta = ref();
  const nombre = ref();
  const tipo = ref();
  const imagen = ref();
  const rasgos = ref();
  const mascota = ref([]);
  valorId.value.push(animalNames.value.find((animal) => animal.id === id).id);
  idmascosta.value = animalNames.value.find((animal) => animal.id === id).id;
  nombre.value = animalNames.value.find((animal) => animal.id === id).Nombre;
  tipo.value = animalNames.value.find((animal) => animal.id === id).Tipo;
  imagen.value = animalNames.value.find((animal) => animal.id === id).Imagen;
  rasgos.value=animalNames.value.find((animal) => animal.id === id).Rasgos;
  mascota.value = {
    Id: idmascosta.value,
    Nombre: nombre.value,
    Tipo: tipo.value,
    Imagen: imagen.value,
    Rasgos: rasgos.value,
  };

  return favoritoAnimales.value.push(mascota.value);
};
const Delete = (index) => {
  if (index === 0) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        favoritoAnimales.value.shift();
        valorId.value.shift();
      }
    });
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
        favoritoAnimales.value.splice(index,1);
    valorId.value.splice(index);
      }
    });
   
  }
};
const Update = (index) => {
  dataupdate.value = favoritoAnimales.value.find((item) => item.Id === index);
};
const auto = (id) => {
  const valorVerificar = valorId.value.find((item) => item === id);
  return valorVerificar ? true : false;
};
</script>

<template>
  <section>
    <BreadCrum :name="breadCrumUrl" ></BreadCrum>
    <div class="py-[4rem] bg-[#0798ca30]">
      <div class="max-w-screen-xl md:mx-auto px-5 ">
          <h1 class="text-left text-[2rem] text-[#18489b] font-[emoji]">List of animals</h1>
        </div>
  </div>
  </section>
   <section class="bg-[#2675d914]">
    <div class="max-w-screen-xl md:mx-auto">
      <div class="flex flex-wrap p-5 ">
        <div v-for="items in animalNames" :class="['hover:shadow-2xl md:w-[48%] w-full md:flex block bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% border m-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700',items.Tipo=='Gato'?'bg-sky-100':'' || items.Tipo=='Perro'?'bg`-blue-400':'']">
          <div href="#">
          <div :class="['md:rounded-l-[10px] md:rounded-r-[50%] rounded-t-lg bg-cover bg-center p-4  md:h-full h-[14rem] md:w-[14rem]']" :style="['background-image:url('+items.Imagen+')']">
             
            </div>
          </div>
        <div class="p-5 ">
          <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ items.Nombre }}</h5>
          </a>
          <span class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {{ items.Tipo }}</span>
                <p class="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Observacion: {{ items.Observacion }}</p>
                <p class="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Ubicacion: {{ items.Ubicacion }}</p>
                <p class="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Rasgos: {{ items.Rasgos }}</p>
          <p class="text-left mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          <button @click="add(items.id)"
                   :disabled="auto(items.id)"
                   :class="['inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#068896cc] rounded-lg hover:bg-[#068896] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',auto(items.id)?'cursor-not-allowed opacity-[0.3]': '']">
                                Favorito
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
           </button>
        </div>
      </div>
    </div>
  </div>
</section>
  <section>
    <div class="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 mb-3 text-white">
        <div class="lg:container md:mx-auto px-5">
         <h3 class="p-5 text-[1.6rem]">Mis favoritos</h3>
        </div>
      </div>
    <div class="max-w-screen-xl md:mx-auto px-5">
     <ul class="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <li class="p-4" v-for="(item, index) in favoritoAnimales" :key="item.Id">
            <div class="flex items-center  w-full  rtl:space-x-reverse">
              <div class="flex-shrink-0 z-40">
                  <img class="w-36 h-36 rounded-full" v-bind:src="item.Imagen"  alt="Neil image">
              </div>
              <div :class="['h-[7rem] gap-16  rounded-r-[12px] flex flex-1 min-w-0 m-[-2rem] z-30 w-full', item.Tipo=='Gato'?'bg-sky-100':'' || item.Tipo=='Perro'?'bg-blue-400':''] ">
                  <p class="inline-flex m-[3rem] items-center  text-sm font-medium text-gray-900 truncate dark:text-white">
                    {{ item.Nombre }}
                  </p>
                  <p class="inline-flex items-center text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ item.Tipo }}
                  </p>
                  <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {{ item.Rasgos }}
              </div>
              <div class="inline-flex items-center " >
               <a @click="Delete(index)" class="z-50 focus:outline-none cursor-pointer text-red-600  hover:text-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-[14px] px-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><FontAwesomeIcon :icon="faTrashAlt" class="mb-0"/></a>
              <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"  class="block focus:outline-none cursor-pointer text-yellow-400  hover:text-yellow-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-[14px]  px-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><FontAwesomeIcon :icon="faSquarePen" class="mb-0"/></button>
                <a @click="Update(item.Id)" class="focus:outline-none cursor-pointer text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Modificar</a>
              </div>
              </div>
              
              
            </div>
            
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" >
import BreadCrum from './components/Breadcrum.vue'
export default{
name:'Datails',
props:{
  


},
data()
{
    return{
      breadCrumUrl:'',
      clearUrl:'',
      User:'',
      userjson:'',
      userId:0,
      datos:[],
      userregistered:{}
        };
},  
async mounted() {

},
methods:
{ 
  updateUrl(){
    const url=window.location;
    this.userjson=localStorage.getItem('usuario');
    this.User=JSON.parse(this.userjson);
    this.breadCrumUrl=url.hash.split("/");
    console.log(this.User)
     return this.breadCrumUrl;
    },
    /*breadCrumUrl(){
      
      const url=window.location;
      return url.hash[4]
     
    }*/
   
  },
  mounted(){
    this.updateUrl();

  },
  components:{
    BreadCrum
  }
}
</script>
<style scoped>
.col-md-6 {
  height: 33rem;
  list-style: none;
}
.card {
  height: 32rem;
  max-height: 34rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.card-img,
.card-img-bottom,
.card-img-top {
  width: 100%;
  height: 258px;
}
.col-md-6 {
  flex: 0 0 auto;
  width: 33%;
  line-height: 0.9;
}
.card {
  height: 32rem;

  max-height: 34rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  padding: 0px;
  border-bottom: 3px solid #74aaff5e;
}
</style>
-->
