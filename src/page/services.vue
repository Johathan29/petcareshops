<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrum from '../components/Breadcrum.vue';
import Data from '../Data';
import CardServices from '../components/Service/cardServices.vue';
import { supabase } from '../config/supabase'
onMounted(async()=>{
    getService()
})
const route = useRoute()

const isHome = computed(() => route.path)
const breadCrumUrl = computed(() => [
  'Services',
])
interface Service {
    id: number,
  title :string,
  description :string,
  link :string,
  bg :string,
  color :string,
  procesos :[],
  id_doctor:[],
}
const service=ref<Service[]>([])
const loading = ref(false)
async function getService() {
  try {
    loading.value=true
    const { data } = await supabase.from('services').select()
    service.value=  data; 
  } catch (error) {
    console.log(error)
  }
  finally{
loading.value=false
  }
    
  }
  

</script>

<template>
     <section v-if="isHome!=='/'">
    <Breadcrum :name="breadCrumUrl" />
  </section>
<section class="bg-slate-50 dark:bg-[#0F6CBD] py-12 border-b-2 border-gray-500/10">
    <div class="max-w-screen-xl md:mx-auto px-[3.5rem]">
        <div class="mb-6">
            <h2 class="text-3xl font-bold text-[#0F6CBD] dark:text-white tracking-tight text-left">
                Our Services

            </h2>
            <p class="text-slate-500 dark:text-slate-400 text-left mt-2 ">
                Ofrecemos atención médica integral con el mejor equipo profesional y tecnología de punta para el cuidado de tu mascota.
            </p>
        </div>
        <CardServices :data="service"/>
    </div>
</section>

</template>