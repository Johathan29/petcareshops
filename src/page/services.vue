<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Breadcrum from '../components/Breadcrum.vue';
import Data from '../Data';
import CardServices from '../components/Service/cardServices.vue';
const route = useRoute()

const isHome = computed(() => route.path)
const breadCrumUrl = computed(() => [
  'Services',
])
console.log(Data.value[3])
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
        <CardServices :data="Data.value[3]"/>
    </div>
</section>

</template>