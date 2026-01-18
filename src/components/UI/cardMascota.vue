<script setup lang="ts">
import { faHeartCircleCheck,faPaw} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faPaperPlane,} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { defineProps, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

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
  }
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

/* Cerrar modal */
const closeAdoptionModal = () => {
  showAdoptionModal.value = false
  selectedPet.value = null
}
const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  housing: '',
  experience: '',
  message: ''
})
const loading = ref(false)
const submitAdoption = async () => {
  if (!selectedPet.value) return

  try {
    loading.value = true

    await fetch('http://localhost:5000/api/adoption', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        petId: selectedPet.value.id,
        petName: selectedPet.value.nombre,
        
        userName: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
        housingType: form.value.housing,
        experience: form.value.experience,
        message: form.value.message
        
      })
    })
    await fetch(`http://localhost:5000/api/animals/${selectedPet.value.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id: selectedPet.value.id,
    status:"PENDING"
   })
})

// 3️⃣ Notificar admin
await fetch('http://localhost:5000/api/notifications', {
   headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({
     petId:selectedPet.value.id,
    requestId: 5
  })
})
    closeAdoptionModal()
    alert('Solicitud enviada correctamente 🐾')
  } catch (e) {
    alert('Error enviando solicitud')
  } finally {
    loading.value = false
  }
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
            class="group bg-white dark:bg-slate-800 rounded-2xl
                   border border-slate-200 dark:border-[#192e54b0]
                   overflow-hidden hover:shadow-2xl
                   transition-all duration-300
                   flex flex-col hover:-translate-y-1"
          >

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
  @click.prevent="toggleLike(items)"
>
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
          <button
  class="mt-4 w-full py-3 rounded-xl flex items-center gap-2 justify-center
         bg-[#0F6CBD] text-white font-bold
         hover:bg-[#0c5aa3] transition
         active:scale-95"
  @click.prevent="openAdoptionModal(items)"
>
  <FontAwesomeIcon :icon="faPaw"/> Solicitar Adopción
</button>
            </div>
            
          </router-link>

        </div>
      </TransitionGroup>

      <!-- ================= EMPTY STATE ================= -->
      <div v-else class="flex justify-center">
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
  <div
    class="bg-white rounded-3xl max-w-2xl w-full
           max-h-[90vh] overflow-y-auto p-8"
  >
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-3xl font-bold text-[#0F6CBD]">
        Solicitud de Adopción
      </h3>
      <button
        @click="closeAdoptionModal"
        class="text-4xl text-red-400 hover:text-red-600"
      >
        ×
      </button>
    </div>

    <!-- INFO -->
    <!-- INFO -->
<div class="bg-slate-100 p-6 rounded-2xl mb-6">
  <p class="text-sm text-slate-600 leading-relaxed">
    Estás solicitando adoptar a
    <strong class="text-[#0F6CBD]">
      {{ selectedPet?.nombre }}
    </strong>.
    Por favor completa el formulario para continuar con el proceso de adopción.
  </p>
</div>

<!-- FORM -->
<form class="space-y-6" @submit.prevent="submitAdoption">

  <!-- Nombre -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      Nombre completo <span class="text-red-500">*</span> 
    </label>
    <input
      type="text"
      v-model="form.name" 
      required
      placeholder="Tu nombre completo"
      class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
             focus:border-[#0F6CBD] focus:outline-none transition"
    />
  </div>

  <!-- Email / Teléfono -->
  <div class="grid md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
        Email <span class="text-red-500">*</span> 
      </label>
      <input
        type="email"
        v-model="form.email" 
        required
        placeholder="correo@ejemplo.com"
        class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
               focus:border-[#0F6CBD] focus:outline-none transition"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
        Teléfono <span class="text-red-500">*</span> 
      </label>
      <input
        type="tel"
        required
        v-model="form.phone" 
        placeholder="(000) 000-0000"
        class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
               focus:border-[#0F6CBD] focus:outline-none transition"
      />
    </div>
  </div>

  <!-- Dirección -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      Dirección completa <span class="text-red-500">*</span> 
    </label>
    <textarea
      rows="2"
      required
      v-model="form.address" 
      placeholder="Dirección donde vivirá la mascota"
      class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
             focus:border-[#0F6CBD] focus:outline-none transition resize-none"
    ></textarea>
  </div>

  <!-- Tipo de vivienda -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      Tipo de vivienda
    </label>
    <select v-model="form.housing" 
      class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
             focus:border-[#0F6CBD] focus:outline-none transition"
    >
      <option>Casa con jardín</option>
      <option>Apartamento</option>
      <option>Casa sin jardín</option>
      <option>Finca / Terreno grande</option>
    </select>
  </div>

  <!-- Experiencia -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      ¿Tienes experiencia previa con mascotas?
    </label>
    <div class="flex gap-6">
      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="radio" name="experience" class="w-4 h-4"  v-model="form.experience"/>
        Sí
      </label>
      <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="radio"  v-model="form.experience" name="experience" class="w-4 h-4" />
        No
      </label>
    </div>
  </div>

  <!-- Mensaje -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      ¿Por qué quieres adoptar esta mascota? <span class="text-red-500">*</span> 
    </label>
    <textarea
      rows="4"
       v-model="form.message"
      required
      placeholder="Cuéntanos por qué esta mascota sería ideal para tu familia..."
      class="w-full px-4 py-3 rounded-lg border-2 border-slate-200
             focus:border-[#0F6CBD] focus:outline-none transition resize-none"
    ></textarea>
  </div>

  <!-- ACTIONS -->
  <div class="flex gap-4 pt-4">
    <button  @click="closeAdoptionModal"
      type="button"
      class="flex-1 py-3 rounded-xl border font-semibold
             hover:bg-slate-50 transition"
    >
      Cancelar
    </button>

    <button
      type="submit"
      class="flex-1 flex items-center justify-center py-3 rounded-xl gap-4
             bg-[#0F6CBD] text-white font-bold group
             hover:bg-[#0c5aa0] transition"
    >
      Enviar Solicitud <FontAwesomeIcon :icon="faPaperPlane" class="group-hover:-translate-y-2 transition duration-300"/>
    </button>
  </div>

</form>
</div>
</div>
</template>



<style scoped>
    /* ===============================
   CONTAINER FADE (GRID ↔ EMPTY)
================================ */

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
