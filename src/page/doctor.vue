<script setup lang="ts">
import skeletom from '../components/Doctor/skeletom.vue'
import { computed, onMounted, ref, toValue } from 'vue'
import ReserveModal from '../components/Doctor/ReserveModal.vue'
import { useRoute } from 'vue-router'
import Data from '../Data'
import DoctorCard from '../components/Doctor/DoctorCard.vue'
import Breadcrum from '../components/Breadcrum.vue'
import { supabase } from '../config/supabase'

/* ===============================
   TYPES
================================ */
interface Doctor {
  id: number
  name: string
  specialty: []
  avatar: string
  phone: string
  schedule: []
  processes: []
  id_animals: []
}

interface Service {
  title: string
  description: string
  procesos: []
}

/* ===============================
   ROUTE
================================ */
const route = useRoute()

const serviceSlug = computed(() =>
  route.params.service?.toString() ??
  route.fullPath.replace('/services/', '')
)
const loading = ref(false)
const doctors = ref<Doctor[]>([])

onMounted(async () => {

  loadingchanges(true)
  doctors.value = await getDoctors()
  getService()
  loadingchanges(false)
})
/*const loading = ref(true)
onMounted(async() => {
  loading.value=false
  getDoctors()
  getService() 
  loading.value=true
});*/
/* ===============================
   DATA
================================ */
//const services: Service[] = Data.value[3]

const loadingchanges = (Value: boolean) => {
  loading.value = !Value ? false : true
}
const services = ref<Service[]>([])
console.log(loading.value)
async function getService() {
  try {

    const { data } = await supabase.from('services').select()
    services.value = data?.find(s => slugify(s.title) === serviceSlug.value);
  } catch (error) {
    console.log(error)
  }
  finally {

  }

}

async function getDoctors() {
  try {

    const { data } = await supabase.from('doctors').select()
    return data;
  } catch (error) {
    console.log(error)
  }
  finally {

  }

}
const matchedDoctors=ref()
const doctorsByService = computed(() => {

  const service = services.value

  if (!service) return null

  matchedDoctors.value= doctors.value
    .filter(doc =>
      doc.specialty.includes(service.title)
    )
    .map(doc => ({
      ...doc,
      availableToday: Boolean(
        doc.schedule[normalizeDay(todayKey)]
      )
    }))

  return {
    service: service.title,
    description: service.description,
    procesos: service.procesos,
    doctors: matchedDoctors.value,

  }
})

const reservation = ref(null)
const showModal = ref(false)

const openReservationModal = (payload: any) => {
  reservation.value = payload
  showModal.value = true
}

const confirmReservation = (data: any) => {
  console.log('Reservado:', data)
  showModal.value = false
}

/* ===============================
   HELPERS
================================ */
const todayKey = new Date().toLocaleDateString('es-ES', {
  weekday: 'long'
})

const normalizeDay = (day: string) =>
  day.charAt(0).toUpperCase() + day.slice(1)

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '')

/* ===============================
   COMPUTED
================================ */


const breadCrumUrl = computed(() => [
  'Services',
  doctorsByService.value?.service || ''
])

const roleUser = ref('user');
const filterbyDoctor = ref()
function filterDoctor(doctor) {
  matchedDoctors.value = doctors.value.find(item=> item.name === doctor)
  
 
}
 
</script>


<template>
  <Breadcrum :name="breadCrumUrl"></Breadcrum>
  <section class="bg-slate-50 dark:bg-[#0F6CBD] min-h-[51rem] py-12 border-b-2 border-gray-500/10 !max-w-full">
    <div class="max-w-screen-xl md:mx-auto px-[1.5rem] md:px-[3.5rem]">
      <div class="flex-1 overflow-y-auto">

        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
          <div>
            <h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">
              {{ services.title }}
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-1">
              {{ doctorsByService?.description }}
            </p>
          </div>

          <button v-if="roleUser === 'admin'" class="flex items-center gap-2 px-4 py-2 bg-primary text-zinc-900 font-bold rounded-lg
                        hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
            <span class="material-symbols-outlined text-lg">person_add</span>
            Add Doctor
          </button>
          <div class="flex items-center flex-col space-y-2 mx-[1rem] justify-start" v-else>
            <label for="" class="font-bold text-[#106cbd]"> Filtrar por Doctores</label>
            <select name="doctor" class=" px-8 py-2 form-select resize-none overflow-hidden text-zinc-900 border-slate-200 font-bold rounded-lg 
                        hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm" @change="filterDoctor(doctor)" id="doctor" v-model="doctor">
              <option disabled selected> Selectiona un Doctor</option>
              <option :value="doctor.name" v-for="doctor in doctorsByService?.doctors"> {{ doctor.name }}</option>
              
            </select>
          </div>

        </div>

        <!-- Grid -->

        <div class="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
          <skeletom v-if="loading"></skeletom>
          <DoctorCard v-else :doctor="doctorsByService?.doctors" :loading="loading" @reserve="openReservationModal" />
          <ReserveModal :open="showModal" :data="reservation" @close="showModal = false"
            @confirm="confirmReservation" />
        </div>


      </div>
    </div>
  </section>
</template>


<style scoped>
section {
  max-width: 1100px;
  margin: auto;
}
</style>
