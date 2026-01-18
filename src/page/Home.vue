<script setup lang="ts">
import data from '../Data';
import fetch from '../AboutView.vue';
import FormUsers from '../components/FormUsers.vue';
import Registra from '../components/Registrar.vue';
import { ref } from 'vue';
//import { Splide, SplideSlide } from '@splidejs/vue-splide';
import HelloWorld from '../components/HelloWorld.vue';
import BirthDay from '../components/BirthDay.vue';
import Slidershow from '../components/UI/Slidershow.vue';
import CardMascota from '../components/UI/cardMascota.vue';
import Mascotas from './Mascotas.vue';
import Testimonio from './testimonio.vue';
import Enfermedades from '../components/Enfermedades.vue';
import ServicePortada from '../components/Service/service-portada.vue';
const valores = ref([]);
console.log(data.value);
const activeclass = ref('active carousel-item');
valores.value = data.value;
console.log(valores.value.map((item) => item));
const detalleUser = () => {
  console.log('users.value');
};

</script>
<template>

  <!--<div id="animation-carousel" class="relative w-full" data-carousel="slide">
    // Carousel wrapper 
    <div class="relative h-[23rem] overflow-hidden rounded-lg  min-h-56 max-h-[25rem]">
         //start loop  
      <div class="hidden duration-200 ease-linear" data-carousel-item  v-for="(item, index) in valores.slice(0, 5)"
        :key="index" :class="[index == 0 ? activeclass : 'carousel-item']" data-bs-interval="10000" >
        <img  v-bind:src="item.Imagen" class="-z-10 absolute object-cover block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        <div class="z-50 items-end flex p-[5rem] h-full justify-center ">
          <h3 class="text-gray-600 text-[2rem] w-full text-center" >{{ item.Nombre }}</h3>
          <p></p>
        </div>
      </div>
    </div>
   //Slider controls 
    <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>-->
<section class="absolute hidden z-50 right-[4rem]" >

<FormUsers  @emitter="captureData" />

<h3 >{{messager.firstName}}</h3>

</section>
<HelloWorld></HelloWorld>
<ServicePortada></ServicePortada>
<Mascotas></Mascotas>
<Testimonio></Testimonio> 
<Enfermedades></Enfermedades>
  <BirthDay></BirthDay>
</template>

<script  lang="ts">

export default{
  name:'Home',
props:{

userId: Number, 

},

data(){
return{
userId:1,
messager:'johathan',
  }
},
methods:{
captureData(mess)
{

this.messager=mess;

  }
},
components:{
FormUsers
}

}
</script>
<style scoped>
.bg-secondary {
  background-color: hsl(var(--secondary));
}

.text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

* {
  border-color: hsl(var(--border));
}
</style>
