<script setup lang="ts">
import { faHeartCircleCheck,faPaw} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import AdoptionForm from '../Mascotas/Adoption.form.vue'
import MessageModal from './messageModal.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineProps, ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useRoute } from 'vue-router'
/* =========================================================
   INTERFAZ DEL MODELO
   Define la estructura de cada mascota (Pet)
========================================================= */
interface Pet {
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
  owner: {
    nombre: string
    telefono: string
  },
  status:string
}
interface loading{
  value:boolean
}
/* =========================================================
   EMITS
   Permite notificar al padre cuando una mascota recibe like
========================================================= */
const emit = defineEmits<{
  (e: 'like', pet: Pet): void
}>()

/* =========================================================
   FAVORITES (estado local)
========================================================= */

// Guarda los IDs favoritos para marcar el corazón
const favoriteIds = ref<Set<number>>(new Set())

// Lista local (opcional si luego quieres persistir favoritos)
const favorites = ref<Pet[]>([])

/* ---------------------------------------------------------
   Alterna el estado de favorito y emite evento al padre
--------------------------------------------------------- */
const liked = ref(false)
const toggleLike = (pet: Pet) => {
  liked.value = !liked.value
  if (favoriteIds.value.has(pet.id)) {
    favoriteIds.value.delete(pet.id)
  } else {
    favoriteIds.value.add(pet.id)
    emit('like', pet) // 🔥 Avisamos al componente padre
  }
}

/* ---------------------------------------------------------
   Verifica si un item está en favoritos
--------------------------------------------------------- */
const isFavorite = (id: number) => favoriteIds.value.has(id)

/* =========================================================
   PROPS
   data = lista de mascotas (ya filtrada desde el padre)
========================================================= */
const props = defineProps<{
  loading: loading
  data: Pet[]
}>()

/* =========================================================
   INTERSECTION OBSERVER
   Controla la animación cuando las cards entran en viewport
========================================================= */
let observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        observer.unobserve(entry.target) // 🔥 solo una vez
      }
    })
  },
  {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  }
)
const userAuthed=JSON.parse(localStorage.getItem('user'))

/* ---------------------------------------------------------
   Observa todas las cards visibles en el DOM
   ✔ Resetea animación
   ✔ Fuerza reflow
   ✔ Vuelve a observar
--------------------------------------------------------- */
const observeCards = () => {
  nextTick(() => {
    const cards = document.querySelectorAll<HTMLElement>('.card-item')

    cards.forEach(card => {
      if (!card.classList.contains('observed')) {
        card.classList.add('observed')
        observer.observe(card)
      }
    })
  })
}


/* ---------------------------------------------------------
   Se ejecuta cuando el componente entra al DOM
--------------------------------------------------------- */
onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        // Cuando la card entra en pantalla
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    },
    {
      threshold: 0.2,                // 20% visible
      rootMargin: '0px 0px -10% 0px'  // activa un poco antes
    }
  )

  observeCards()
})
const route = useRoute()
const isHome = computed(() => route.path === '/')
/* ---------------------------------------------------------
   Watch:
   Se dispara cuando cambia el contenido (filtros)
   Usamos IDs para detectar cambios reales
--------------------------------------------------------- */
watch(
  () => props.data.map(p => p.id),
  () => {
    observeCards()
  }
)

/* ---------------------------------------------------------
   Limpieza al destruir el componente
--------------------------------------------------------- */
onUnmounted(() => {
  observer?.disconnect()
})
/* ===============================
   ADOPTION MODAL STATE
================================ */
const showAdoptionModal = ref(false)
const selectedPet = ref<Pet | null>(null)

/* Abrir modal */
const openAdoptionModal = (pet: Pet) => {
  selectedPet.value = pet
  showAdoptionModal.value = true
}
const showMessageAlert= ref(false)
const openMessageModal=()=>{
  showMessageAlert.value=true
}

</script>
<template>
  <!-- Transición entre grid y empty state -->
  <Transition name="container" mode="out-in">
    <div :key="data.length ? 'cards' : 'empty'">

      <!-- ================= GRID DE CARDS ================= -->
      <TransitionGroup
        v-if="data.length"
        :key="data.length + '-' + data[0]?.id"
        name="card"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <!-- Cada card -->
        <div
  v-for="(items, index) in data"
  :key="items.id"
  class="card-item"
  :style="`--i:${index}`"
>
          <!-- Card clickable -->
          <router-link
            :to="`/adoption/${items.id}`"
            class="group bg-white relative dark:bg-slate-800 rounded-2xl
                   border border-slate-200 dark:border-[#192e54b0]
                   overflow-hidden hover:shadow-2xl
                   transition-all duration-300
                   flex flex-col hover:-translate-y-1"
          >
          <div class="ribbon-wrapper">
<div class="ribbon-diagonal">
                {{items.status}}
            </div>
</div>
            <!-- IMAGEN -->
            <div
              class="relative h-56 w-full overflow-hidden"
              :style="`background-image:url(${items.imagen})`"
            >
              <!-- Zoom suave al hover -->
              <div
                class="absolute inset-0 bg-cover bg-center
                       transition-transform duration-700
                       group-hover:scale-110"
                :style="`background-image:url(${items.imagen})`"
              ></div>

              <!-- BADGES -->
              <div class="absolute top-4 right-4 flex justify-between w-full px-8">

                <!-- Estado -->
                <span
                  class="inline-flex px-3 py-1 rounded-full text-xs font-bold border"
                  :class="items.estado === 'Surgery'
                    ? 'bg-red-100 text-red-800'
                    : items.estado === 'Healthy'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'"
                >
                  {{ items.estado }}
                </span>

                <!-- Like -->
                <button
  class="group relative flex items-center justify-center
         
         active:scale-90 transition-transform duration-300"
  @click.prevent="userAuthed ? toggleLike(items) : openMessageModal()"
>
<span class="material-symbols-outlined text-red-700">
favorite
</span>
  <FontAwesomeIcon
    :icon="isFavorite(items.id) ? faHeartCircleCheck : faHeart"
    class="text-red-700 text-[20px]"
  />
</button>

              </div>
            </div>

            <!-- CONTENIDO -->
            <div class="p-6 flex-1 flex flex-col">

              <!-- HEADER -->
              <div class="flex justify-between mb-3">
                <div class="text-left w-full">
                  <div class="flex items-center justify-between w-full">
                    <div> 
                      <h3 class="text-xl font-bold text-[#0F6CBD] ">
                    {{ items.nombre }}
                  </h3>
                        <p class="text-sm text-slate-500">
                    {{ items.raza }}
                  </p>
                    </div>
                   
                  
                  <div class="w-min">
                    <span class="text-xs font-bold">Genero</span>
                    <template v-if="items.genero==='female'">
                      <span class="material-symbols-outlined text-md text-rose-500/50">
                        female
                      </span>
                    </template>
                    <template v-else>
                     <span class="material-symbols-outlined text-md text-blue-700/70">
                        male
                      </span>
                    </template>
                  </div>
                  </div>
                  
                
                </div>

                <!-- Icono de género -->
                <template v-if="items.genero.toLowerCase() === 'male'">
                  <!-- icon male -->
                </template>
                <template v-else>
                  <!-- icon female -->
                </template>
              </div>

              <!-- INFO -->
              <div class="flex text-xs border-t border-b py-4 items-start min-h-[5rem] divide-x-[1px] divide-[#e5e7eb]">
                <div class="flex-col flex-1 flex text-center">
                  <span class="font-bold">Age</span>
                  <span>{{ items.edad }}</span>
                </div>
                <div class="flex flex-col flex-1  text-center">
                  <span class="font-bold">Weight</span>
                  <span>{{ items.peso }}</span>
                </div>
                <div class="flex flex-col flex-1  text-center">
                  <span class="font-bold">Owner</span>
                  <span>{{ items.owner.nombre }}</span>
                </div>
              </div>
          <button v-if="!isHome"
  class="mt-4 w-full py-3 rounded-xl flex items-center gap-2 justify-center
         bg-[#0F6CBD] text-white font-bold
         hover:bg-[#0c5aa3] transition
         active:scale-95"
  @click.prevent="userAuthed ? openAdoptionModal(items) : openMessageModal()"
>
  <FontAwesomeIcon :icon="faPaw"/> Solicitar Adopción
</button>
            </div>
            
          </router-link>

        </div>
      </TransitionGroup>
      
      <!-- ================= EMPTY STATE ================= -->
      <div v-if="props.loading" class="flex justify-center">
        <div class="p-6">
          <div class="loader w-full"></div> 
          
        </div>
      </div>
      <div v-if="props.data.length===0 && !props.loading" class="flex justify-center">
        <div class="p-6 border-2 bg-white text-red-500 rounded-xl flex gap-4 shadow-md shadow-slate-500 ">
          <span class="text-2xl">No se encontraron mascotas</span>
        </div>
      </div>

    </div>
  </Transition>
  <!-- ================= MODAL ADOPCIÓN ================= -->
<div v-if="showAdoptionModal"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm
         flex items-center justify-center z-50 p-4"
>
  <AdoptionForm :mascota="selectedPet" @closed="showAdoptionModal=false"/>
</div>
<div v-if="showMessageAlert"
  class="fixed inset-0 bg-black/50 backdrop-blur-sm
         flex items-center justify-center z-50 p-4"
>
<MessageModal
  :open="showMessageAlert"
  @close="showMessageAlert = false"
  
/>
</div>

</template>



<style scoped>
    /* ===============================
   CONTAINER FADE (GRID ↔ EMPTY)
================================ */
.ribbon-diagonal::before {
    left: 0;
}


.ribbon-diagonal::before, .ribbon-diagonal::after {
    content: "";
    position: absolute;
    bottom: -5px;
    border-top: 5px solid #C2410C;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    z-index: -1;
}
.ribbon-diagonal {
    position: absolute;
    background: #F97316;
    color: white;
    text-align: center;
    padding: 10px 0;
    width: 225px;
    top: 35px;
    left: -55px;
    transform: rotate(-45deg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1rem;
    letter-spacing: 0.1em;
    z-index: 50;
}
.loader {
  width: 19px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
@keyframes l5 {
    0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
    33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
    66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
    100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
}
.card-item {
  
  animation-delay: calc(var(--i) * 60ms);

  opacity: 1;
  transform: translateY(12px) scale(0.98);
  
}
.card-item.in-view {
  animation: cardReveal 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.96);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
.card-item:not(.in-view) {
  opacity: 1;
  transform: translateY(28px) scale(0.96);
  
}
.card-item {
  animation: force-visible 0.01s forwards;
}

@keyframes force-visible {
  to {
    opacity: 1;
    transform: translateY(28px) scale(0.96);
  
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.6s ease;
  will-change: transform, opacity;
  }
}
.container-enter-active,
.container-leave-active {
  transition: 
    opacity 0.45s ease,
    transform 0.45s ease,
    filter 0.45s ease;
}

.container-enter-from {
  opacity: 0;
  transform: scale(0.98);
  filter: blur(4px);
}

.container-enter-to {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}

.container-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}

.container-leave-to {
  opacity: 0;
  transform: scale(0.98);
  filter: blur(4px);
}

    .empty-enter-active,
.empty-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.empty-enter-active {
  transition-delay: 120ms;
}
.empty-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

.empty-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.empty-leave-from {
  opacity: 1;
  transform: scale(1);
}

.empty-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.card-enter-active,
.card-leave-active {
  transition: all 0.4s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.card-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-leave-from {
  opacity: 1;
  transform: scale(1);
}

.card-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
