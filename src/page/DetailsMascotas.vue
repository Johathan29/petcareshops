<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrum from '../components/Breadcrum.vue'
import { initAccordions, initTabs, initModals } from 'flowbite'

/* ================= ROUTE ================= */
const route = useRoute()
const petId = route.params.id as string

/* ================= INTERFACE ================= */
export interface Pet {
  id: string
  nombre: string
  especie: string
  raza: string
  peso: string
  genero: string
  estado: string
  color: string
  nacimiento: string
  microchip: string
  imagen: string
  fechaInyecion?: string
  owner: {
    nombre: string
    telefono: string
  }
}

/* ================= API ================= */
const API_URL = 'http://localhost:5000/api/animals'

/* ================= STATE ================= */
const pet = ref<Pet | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

/* ================= FETCH ================= */
const fetchPet = async () => {
  try {
    loading.value = true

    const res = await fetch(`${API_URL}/${petId}`)
    if (!res.ok) throw new Error('Mascota no encontrada')

    pet.value = await res.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

/* ================= COMPUTED ================= */
const breadCrumUrl = computed(() => [
  'mascotas',
  pet.value?.nombre ?? ''
])

const petAge = computed(() => {
  if (!pet.value?.nacimiento) return ''

  const today = new Date()
  const birth = new Date(pet.value.nacimiento)

  let years = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  const d = today.getDate() - birth.getDate()

  if (m < 0 || (m === 0 && d < 0)) years--

  if (years <= 0) {
    const months =
      today.getMonth() -
      birth.getMonth() +
      12 * (today.getFullYear() - birth.getFullYear())
    return `${months} Months`
  }

  return `${years} Years`
})

const petExpiredDate = computed(() => {
  if (!pet.value?.fechaInyecion) return ''

  const expiration = new Date(pet.value.fechaInyecion)
  expiration.setFullYear(expiration.getFullYear() + 1)

  return expiration.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
})

/* ================= LIFECYCLE ================= */
onMounted(async () => {
  await fetchPet()

  if (pet.value) {
    document.title = `PetCare - Adoption ${pet.value.nombre}`
  }

  initAccordions()
  initTabs()
  initModals()
})
</script>



<template>
  <BreadCrum :name="breadCrumUrl" ></BreadCrum>
  <section class="bg-slate-50 dark:bg-slate-900 py-12 ">
   <div class="flex flex-col max-w-screen-xl md:mx-auto px-[3.5rem] gap-6">
<div class="flex flex-col gap-4">

<div class="flex flex-wrap justify-between items-end gap-4">
<h1 class="text-text-main-light dark:text-text-main-dark text-3xl font-bold leading-tight tracking-tight">Pet Details: {{ pet?.nombre }}</h1>
<div class="flex gap-3">
<button class="px-5 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">print</span>
                             Print Record
                        </button>
<button class="px-5 py-2.5 rounded-lg bg-primary text-[#0d1b12] text-sm font-bold shadow-sm shadow-primary/20 hover:brightness-110 transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">edit</span>
                            Edit Pet
                        </button>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
<div class="lg:col-span-4 flex flex-col gap-6">
<div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 flex flex-col items-center text-center">
<div class="relative">
<div class="bg-center bg-no-repeat bg-cover rounded-full w-48 h-48 mb-4 ring-4 ring-offset-4 ring-primary/20 dark:ring-offset-card-dark" data-alt="Golden Retriever dog smiling at the camera" :style="{ backgroundImage: `url(${pet?.imagen})` }"></div>
<div class="absolute bottom-6 right-2 bg-white dark:bg-card-dark p-[2px] rounded-full shadow-md border border-border-light dark:border-border-dark">
<span class="material-symbols-outlined text-primary text-xl block"><svg viewBox="0 0 24 24" width="31px" fill="adasdas" xmlns="http://www.w3.org/2000/svg" class="stroke-[#9fc1fb]"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.01 21C13.52 21 13.06 20.77 12.68 20.57C12.44 20.45 12.15 20.3 12 20.3C11.85 20.3 11.55 20.45 11.32 20.57C10.84 20.82 10.24 21.12 9.59999 20.95C8.93999 20.78 8.57999 20.2 8.27999 19.74C8.14999 19.53 7.96999 19.25 7.84999 19.18C7.72999 19.11 7.40999 19.1 7.13999 19.08C6.59999 19.05 5.92999 19.02 5.44999 18.55C4.96999 18.06 4.93999 17.39 4.90999 16.85C4.89999 16.59 4.87999 16.26 4.80999 16.14C4.74999 16.03 4.45999 15.85 4.25999 15.72C3.79999 15.42 3.22999 15.05 3.04999 14.4C2.87999 13.76 3.17999 13.16 3.42999 12.68C3.54999 12.44 3.69999 12.15 3.69999 12C3.69999 11.85 3.54999 11.55 3.42999 11.32C3.17999 10.84 2.87999 10.24 3.04999 9.60002C3.21999 8.94002 3.79999 8.58002 4.25999 8.28002C4.46999 8.15002 4.74999 7.97002 4.81999 7.85002C4.88999 7.73002 4.89999 7.41002 4.91999 7.14002C4.94999 6.60002 4.97999 5.93002 5.44999 5.45002C5.93999 4.97002 6.60999 4.94002 7.14999 4.91002C7.40999 4.90002 7.73999 4.88002 7.85999 4.81002C7.96999 4.75002 8.14999 4.46002 8.27999 4.26002C8.57999 3.80002 8.94999 3.23002 9.59999 3.05002C10.24 2.88002 10.84 3.18002 11.32 3.43002C11.56 3.55002 11.85 3.70002 12 3.70002C12.15 3.70002 12.45 3.55002 12.68 3.43002C13.16 3.19002 13.76 2.88002 14.4 3.05002C15.06 3.22002 15.42 3.80002 15.72 4.26002C15.85 4.47002 16.03 4.75002 16.15 4.82002C16.27 4.89002 16.59 4.90002 16.86 4.92002C17.4 4.95002 18.07 4.98002 18.55 5.45002C19.03 5.94002 19.06 6.61002 19.09 7.15002C19.1 7.41002 19.12 7.74002 19.19 7.86002C19.25 7.97002 19.54 8.15002 19.74 8.28002C20.2 8.58002 20.77 8.95002 20.95 9.60002C21.12 10.24 20.82 10.84 20.57 11.32C20.45 11.56 20.3 11.85 20.3 12C20.3 12.15 20.45 12.45 20.57 12.68C20.82 13.16 21.12 13.76 20.95 14.4C20.78 15.06 20.2 15.42 19.74 15.72C19.53 15.85 19.25 16.03 19.18 16.15C19.11 16.27 19.1 16.59 19.08 16.86C19.05 17.4 19.02 18.07 18.55 18.55C18.06 19.03 17.39 19.06 16.85 19.09C16.59 19.1 16.26 19.12 16.14 19.19C16.03 19.25 15.85 19.54 15.72 19.74C15.42 20.2 15.05 20.77 14.4 20.95C14.27 20.99 14.14 21 14.01 21ZM9.99999 4.50002C9.99999 4.50002 9.99999 4.50002 9.98999 4.50002C9.88999 4.54002 9.65999 4.88002 9.54999 5.07002C9.30999 5.44002 9.03999 5.86002 8.60999 6.11002C8.16999 6.36002 7.66999 6.39002 7.21999 6.41002C6.99999 6.42002 6.58999 6.44002 6.49999 6.51002C6.43999 6.59002 6.41999 6.99002 6.40999 7.21002C6.38999 7.66002 6.35999 8.16002 6.10999 8.59002C5.85999 9.02002 5.43999 9.29002 5.06999 9.53002C4.87999 9.65002 4.53999 9.87002 4.49999 9.98002C4.48999 10.09 4.65999 10.43 4.75999 10.63C4.95999 11.03 5.19999 11.48 5.19999 11.99C5.19999 12.5 4.96999 12.95 4.75999 13.35C4.65999 13.55 4.47999 13.89 4.49999 14C4.53999 14.1 4.87999 14.33 5.06999 14.44C5.43999 14.68 5.85999 14.95 6.10999 15.38C6.35999 15.82 6.38999 16.32 6.40999 16.77C6.41999 16.99 6.43999 17.4 6.50999 17.49C6.58999 17.55 6.98999 17.57 7.20999 17.58C7.65999 17.6 8.15999 17.63 8.58999 17.88C9.01999 18.13 9.28999 18.55 9.52999 18.92C9.64999 19.11 9.86999 19.45 9.97999 19.49C10.08 19.52 10.43 19.33 10.63 19.23C11.03 19.03 11.48 18.79 11.99 18.79C12.5 18.79 12.95 19.02 13.35 19.23C13.55 19.33 13.87 19.52 14 19.49C14.1 19.45 14.33 19.11 14.44 18.92C14.68 18.55 14.95 18.13 15.38 17.88C15.82 17.63 16.32 17.6 16.77 17.58C16.99 17.57 17.4 17.55 17.49 17.48C17.55 17.4 17.57 17 17.58 16.78C17.6 16.33 17.63 15.83 17.88 15.4C18.13 14.97 18.55 14.7 18.92 14.46C19.11 14.34 19.45 14.12 19.49 14.01C19.5 13.9 19.33 13.56 19.23 13.36C19.03 12.96 18.79 12.51 18.79 12C18.79 11.49 19.02 11.04 19.23 10.64C19.33 10.44 19.5 10.1 19.49 9.99002C19.45 9.88002 19.1 9.66002 18.92 9.54002C18.55 9.30002 18.13 9.03002 17.88 8.60002C17.63 8.16002 17.6 7.66002 17.58 7.21002C17.57 6.99002 17.55 6.58002 17.48 6.49002C17.4 6.43002 17 6.41002 16.78 6.40002C16.33 6.38002 15.83 6.35002 15.4 6.10002C14.97 5.85002 14.7 5.43002 14.46 5.06002C14.34 4.87002 14.12 4.53002 14.01 4.49002C13.91 4.46002 13.56 4.65002 13.36 4.75002C12.96 4.95002 12.51 5.19002 12 5.19002C11.49 5.19002 11.04 4.96002 10.64 4.75002C10.44 4.65002 10.12 4.49002 9.99999 4.49002V4.50002ZM10.49 15.51C10.29 15.51 10.1 15.43 9.95999 15.29L7.44999 12.78C7.15999 12.49 7.15999 12.01 7.44999 11.72C7.73999 11.43 8.21999 11.43 8.50999 11.72L10.49 13.7L15.48 8.71002C15.77 8.42002 16.25 8.42002 16.54 8.71002C16.83 9.00002 16.83 9.48002 16.54 9.77002L11.02 15.29C10.88 15.43 10.69 15.51 10.49 15.51Z" fill="#a8a8a8"></path> </g></svg></span>
</div>
</div>
<h2 class="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-1">{{pet?.nombre}}</h2>
<p class="text-text-sec-light dark:text-text-sec-dark font-medium mb-4">Golden Retriever • {{petAge}}</p>
<div class="flex items-center gap-2 mb-6">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
<span class="w-2 h-2 rounded-full bg-green-500"></span>
                                Active
                            </span>
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
<span class="material-symbols-outlined text-[14px]">
  <template v-if="pet?.genero==='Male'">
  <svg viewBox="0 0 24 24" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0a19bc" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill="#0a19bc"></path> </g></svg>
</template>
<template v-else>
  <svg fill="#0a19bc" height="24px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.002 512.002" xml:space="preserve" stroke="#0a19bc" stroke-width="0.005120019999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M290.789,0C168.813,0,69.577,99.236,69.577,221.212c0,52.763,18.579,101.263,49.525,139.324l-44.065,44.065 l-37.755-37.755L4.919,399.208l37.756,37.755L0.001,479.639l32.363,32.363l42.674-42.674l37.757,37.757l32.363-32.363 l-37.756-37.757l44.065-44.065c38.059,30.945,86.559,49.524,139.322,49.524c121.976,0,221.212-99.236,221.212-221.212 S412.767,0,290.789,0z M290.789,396.656c-96.74,0-175.444-78.704-175.444-175.444S194.049,45.768,290.789,45.768 s175.444,78.704,175.444,175.444S387.53,396.656,290.789,396.656z"></path> </g> </g> </g></svg>
</template>
</span>

                                {{pet?.genero}}
                            </span>
</div>
<div class="w-full grid grid-cols-2 gap-3 border-t border-border-light dark:border-border-dark pt-6">
<div class="flex flex-col">
<span class="text-xs text-text-sec-light dark:text-text-sec-dark font-medium uppercase tracking-wider">Weight</span>
<span class="text-lg font-bold text-text-main-light dark:text-text-main-dark">{{pet?.peso}}</span>
</div>
<div class="flex flex-col border-l border-border-light dark:border-border-dark">
<span class="text-xs text-text-sec-light dark:text-text-sec-dark font-medium uppercase tracking-wider">Reg. ID</span>
<span class="text-lg font-bold text-text-main-light dark:text-text-main-dark">#{{ pet?.id }}</span>
</div>
</div>
</div>
<div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6">
<div class="flex items-center justify-between mb-4">
<h3 class="text-sm font-bold uppercase tracking-wider text-text-sec-light dark:text-text-sec-dark">Owner</h3>
<a class="text-xs font-bold text-[] hover:underline" href="#">View Profile</a>
</div>
<div class="flex items-center gap-4">
<div class="size-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
<span class="material-symbols-outlined">person</span>
</div>
<div>
<h4 class="text-base font-bold text-text-main-light dark:text-text-main-dark">{{pet?.owner.nombre}}</h4>
<div class="flex items-center gap-2 text-sm text-text-sec-light dark:text-text-sec-dark mt-0.5">
<span class="material-symbols-outlined text-[16px]">call</span>
<span>{{ pet?.owner.telefono }}</span>
</div>
</div>
</div>
</div>
</div>
<div class="lg:col-span-8 flex flex-col gap-6">
<div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8">
<h3 class="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary"><svg viewBox="0 0 24 24" width="24px" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#0a19bcad" stroke-width="1.5"></circle> <path d="M12 17V11" stroke="#0a19bcad" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#0a19bcad"></circle> </g></svg></span>
                            General Information
                        </h3>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Pet Name</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark">{{pet?.nombre}}</span>
</div>
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Species</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark ">
<span class="material-symbols-outlined text-sm">{{pet?.especie==='cat'?  ('pets'): pet?.especie==='dog'?('sound_detection_dog_barking'): pet?.especie==="bird" ? ('raven') : "" }}</span> {{pet?.especie}}
                                </span>
</div>
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Breed</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark">{{pet?.raza}}</span>
</div>
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Color</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark flex items-center gap-2 justify-center">
<div class="w-3 h-3 rounded-full bg-[#E5C76B] border border-gray-200"></div> Golden / Cream
                                </span>
</div>
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Date of Birth</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark">{{pet?.nacimiento}}</span>
</div>
<div class="flex flex-col gap-1">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Microchip ID</span>
<span class="text-base font-medium text-text-main-light dark:text-text-main-dark font-mono">985-120-334-11</span>
</div>
</div>
</div>
<div class="bg-card-light dark:bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8">
<div class="flex items-center justify-between mb-6">
<h3 class="text-xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
<span class="material-symbols-outlined text-primary">medical_services</span>
                                Medical History &amp; Health
                            </h3>
<button class="text-sm font-semibold text-primary hover:underline">View Full Records</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
<div class="bg-input-bg-light dark:bg-input-bg-dark rounded-lg p-5 border border-border-light dark:border-border-dark">
<div class="flex items-center justify-between mb-3">
<span class="text-sm font-bold text-text-main-light dark:text-text-main-dark">Vaccination Status</span>
<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
                                        Up to Date
                                    </span>
</div>
<div class="space-y-3">
  <div class="flex justify-between items-center text-sm">
<span class="text-text-sec-light dark:text-text-sec-dark">Fecha de ultima inspeccion </span>
<span class="text-text-main-light dark:text-text-main-dark font-medium">{{pet?.fechaInyecion}}</span>
</div>
<div class="flex justify-between items-center text-sm">
<span class="text-text-sec-light dark:text-text-sec-dark">Rabies</span>
<span class="text-text-main-light dark:text-text-main-dark font-medium">Expires: {{petExpiredDate}}</span>
</div>
<div class="flex justify-between items-center text-sm">
<span class="text-text-sec-light dark:text-text-sec-dark">Distemper</span>
<span class="text-text-main-light dark:text-text-main-dark font-medium">Expires: 05 Jun 2024</span>
</div>
<div class="flex justify-between items-center text-sm">
<span class="text-text-sec-light dark:text-text-sec-dark">Bordetella</span>
<span class="text-text-main-light dark:text-text-main-dark font-medium">Expires: 15 Dec 2024</span>
</div>
</div>
</div>
<div class="bg-input-bg-light dark:bg-input-bg-dark rounded-lg p-5 border border-border-light dark:border-border-dark">
<span class="text-sm font-bold text-text-main-light dark:text-text-main-dark block mb-3">Primary Veterinarian</span>
<div class="flex items-start gap-3">
<div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
<span class="material-symbols-outlined">stethoscope</span>
</div>
<div>
<p class="text-base font-bold text-text-main-light dark:text-text-main-dark">Dr. Emily Chen</p>
<p class="text-sm text-text-sec-light dark:text-text-sec-dark mb-1">City Paws Clinic</p>
<p class="text-xs text-text-sec-light dark:text-text-sec-dark flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">schedule</span> Last visit: 2 weeks ago
                                        </p>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-2">
<span class="text-xs font-bold text-text-sec-light dark:text-text-sec-dark uppercase tracking-wide">Medical Notes &amp; Alerts</span>
<div class="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 flex gap-3">
<span class="material-symbols-outlined text-yellow-600 dark:text-yellow-500 shrink-0">warning</span>
<div>
<p class="text-sm font-bold text-text-main-light dark:text-text-main-dark mb-1">Allergies &amp; Sensitivities</p>
<p class="text-sm text-text-main-light dark:text-text-main-dark">Allergic to chicken. Shows signs of itching and digestive issues. Please ensure all treats and food are chicken-free.</p>
</div>
</div>
<div class="mt-2 text-sm text-text-main-light dark:text-text-main-dark pl-1">
<p><span class="font-bold">Instructions:</span> Needs monthly flea prevention on the 1st of every month.</p>
</div>
</div>
</div>
</div>
</div>
</div>
  </section>
</template>


<style>
  .text-primary {
    color: #0f6cbdc5;
}
  .bg-card-light {
    background: white;
}
th {
    width: 135px!important;
}
td.alert.alert-primary {
  float: inline-start;
  margin-left: -17rem;
  background: aliceblue;
  height: 104px;
}
.title {
  color: #fff;
  background: #195062;
  font-family: ui-monospace;
  font-weight: 600;
  width: 100%;
}
.btn-info {
  color: #0a262f !important;
  font-family: system-ui;
  background-color: #0dcaf0;
  border-color: #0dcaf0;
  font-size: small;
  font-weight: 700;
  text-transform: capitalize;
}
</style>
