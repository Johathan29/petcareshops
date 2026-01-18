<script setup lang="ts">

import { computed,ref } from 'vue'
import ReserveModal from '../components/Doctor/ReserveModal.vue'
import { useRoute } from 'vue-router'
import Data from '../Data'
import DoctorCard from '../components/Doctor/DoctorCard.vue'
import Breadcrum from '../components/Breadcrum.vue'

/* ===============================
   TYPES
================================ */
interface Doctor {
  id: number
  name: string
  specialty: string[]
  avatar:string
  phone: string
  schedule: any
  processes:any
}

interface Service {
  title: string
  description:string
  procesos: string[]
}

/* ===============================
   ROUTE
================================ */
const route = useRoute()

const serviceSlug = computed(() =>
  route.params.service?.toString() ??
  route.fullPath.replace('/services/', '')
)

/* ===============================
   DATA
================================ */
const services: Service[] = Data.value[3]

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Laura Martínez',
    specialty: ['General Consultation', 'Preventive medicine'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
    processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-1234',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'Jueves',hour:'9-4'},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  },
  {
    id: 2,
    name: 'Dr. Carlos Gómez',
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
    specialty: ['Surgery', '24h Emergencies','Preventive medicine'],
    processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-5678',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:"10-6" }]
  },
  {
    id: 3,
    name: 'Dr. Ana Pérez',
    specialty: ['Laboratory', 'Vaccination', 'Deworming'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
       processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],

    phone: '+1 809-555-9012',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  },
  {
    id: 4,
    name: 'Dr. Miguel Santos',
    specialty: ['Veterinary Dentistry'],
     avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApt8_b4fUQYwS8prThyy-yPwh_H7W1fy9Kvj8iBVBcwRtJrgwynMNJw4tuWwqjoveKAe0rAlZ9QCMFSqGDB3hKzMzLcQpyH68XzrtsbQ2xCQG2eC0dCKcMi-Hdued46WGkDVcRwbiZAk3XzT4lputQePSj7EkAp4diRHPeSMMb1f9eorqo06CXH6qaxbtfM22EvsTLBXrt0EVomGwJydGRpEXhZ_Hs6lt1J14F2Ame1Wc5ATKH0aSRMXibHJrcF2K_ojC2eqRFeKkr',
     processes:[{title:'Soft Tissue Repair',price:1000},{title:"Endoscopy",price:1500},{title:'Biopsy',price:2000}],
    phone: '+1 809-555-3344',
    schedule: [{ day:'Lunes', hour: null},{ day:"Martes",hour:'10-6'},{day:'Miercoles', hour:'10-6'},{day:'jueves',hour:null},{day:'Viernes',hour:'10-6'},{day:'Sabados',hour:'9-2'},{day:'Domingos',hour:null }]
  }
]



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
const doctorsByService = computed(() => {
  const service = services.find(
    s => slugify(s.title) === serviceSlug.value
  )

  if (!service) return null

  const matchedDoctors = doctors
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
    doctors: matchedDoctors
  }
})

const breadCrumUrl = computed(() => [
  'Services',
 doctorsByService.value?.service || ''
])
</script>


<template>
    <Breadcrum :name="breadCrumUrl" ></Breadcrum>
    <section class="bg-slate-50 dark:bg-[#0F6CBD] py-12 border-b-2 border-gray-500/10 !max-w-full">
        <div class="max-w-screen-xl md:mx-auto px-[3.5rem]">
            <div class="flex-1 overflow-y-auto">

                <!-- Header -->
                <div class="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                <div>
                    <h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">
                    {{doctorsByService?.service}}
                    </h2>
                    <p class="text-slate-500 dark:text-slate-400 mt-1">
                    {{doctorsByService?.description}}
                    </p>
                </div>

                <button
                    class="flex items-center gap-2 px-4 py-2 bg-primary text-zinc-900 font-bold rounded-lg
                        hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                >
                    <span class="material-symbols-outlined text-lg">person_add</span>
                    Add Doctor
                </button>
                </div>

    <!-- Grid -->
    
     <div class="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
  <DoctorCard
    v-for="doctor in doctorsByService?.doctors"
    :key="doctor.id"
    :doctor="doctor"
    @reserve="openReservationModal"
  />
  <ReserveModal
  :open="showModal"
  :data="reservation"
  @close="showModal = false"
  @confirm="confirmReservation"
/>
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
