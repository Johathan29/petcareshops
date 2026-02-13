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
import supabase from '../components/supabase.vue';
const valores = ref([]);
data.value;
const activeclass = ref('active carousel-item');
valores.value = data.value;
valores.value.map((item) => item)
const detalleUser = () => {

};

</script>
<template>
  <section class="absolute hidden z-50 right-[4rem]">

    <FormUsers @emitter="captureData" />

    <h3>{{ messager.firstName }}</h3>

  </section>

  <HelloWorld></HelloWorld>
  <ServicePortada></ServicePortada>
  <Mascotas></Mascotas>
  <Testimonio></Testimonio>
  <Enfermedades></Enfermedades>
  <BirthDay></BirthDay>
  <supabase></supabase>
</template>

<script lang="ts">

export default {
  name: 'Home',
  props: {

    userId: Number,

  },

  data() {
    return {
      userId: 1,
      messager: 'johathan',
    }
  },
  methods: {
    captureData(mess) {

      this.messager = mess;

    }
  },
  components: {
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
