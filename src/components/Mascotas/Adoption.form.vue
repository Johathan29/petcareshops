<script setup lang="ts">
import { faHeartCircleCheck,faPaw} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faPaperPlane,} from '@fortawesome/free-regular-svg-icons'
import { supabase } from '../../config/supabase'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue';
const mascota=defineProps<{
    mascota:{
        id: number,
        nombre:string,
    }
}>()

const user=JSON.parse(localStorage.getItem('user'))
console.log(user.user)
const emit = defineEmits(['closed'])
/* Cerrar modal */
const closeAdoptionModal = () => {
  emit("closed")
  
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
const submitAdoption =  async() => {
  
console.log(formExperience1.value)
  /*const insertAdoption= await supabase
  .from('adoption')
  .insert({
    userName:formName.value,
    address: formAddress.value,
    email:user.user.email,
    experience: formExperience.value | formExperience1.value,
    housingType: formHousing.value,
    message:  formMessage.value,
    petId: mascota.mascota?.id,
    phone: formPhone.value,
    status: 'pending'})

    console.log(
        
    insertAdoption
        
      )*/
     
    
    

 
  
  
}
</script>
<template>
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
        @click="emit('closed')"
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
      {{ mascota.mascota?.nombre }}
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
      v-model="formName" 
      id="formName"
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
        disabled
        :value="user.user.email"
        required
        placeholder="correo@ejemplo.com"
        class="w-full px-4 py-3 rounded-lg bg-slate-100 border-2 border-slate-200
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
        v-model="formPhone" 
        id="formPhone"
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
      v-model="formAddress"
      id="formAddress" 
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
    <select v-model="formHousing"  id="formHousing"
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
      
        <select name="formExperience1" class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#0F6CBD] focus:outline-none transition"   v-model="formExperience1" id="formExperience1">
        <option value="" selected>Seleccione un a opcion</option>
        <option value="si">Si</option>
        <option value="no">No</option>
        </select>
      
     <!-- <label class="flex items-center gap-2 cursor-pointer text-sm">
        <input type="radio"  v-model="formExperience" name="formExperience1"  class="w-4 h-4" id="formExperience"/>
        No
      </label>-->
    </div>
  </div>

  <!-- Mensaje -->
  <div>
    <label class="block text-sm font-medium text-[#192e54b0] mb-2 text-left font-bold">
      ¿Por qué quieres adoptar esta mascota? <span class="text-red-500">*</span> 
    </label>
    <textarea
      rows="4"
       v-model="formMessage"
       id="formMessage"
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
      class="flex-1 py-3 rounded-xl border font-bold bg-red-500 
             hover:bg-red-700 transition duratution-300  text-white"
    >
      Cancelar
    </button>

    <button
      type="submit"
      class="flex-1 flex items-center justify-center py-3 rounded-xl gap-4
             bg-[#0F6CBD] text-white font-bold group
             hover:bg-[#0c5aa0] transition"
    >
      Enviar Solicitud <FontAwesomeIcon :icon="faPaperPlane" class="group-hover:-translate-y-2 group-hover:translate-x-8 transition duration-300"/>
    </button>
  </div>

</form>
</div>
</template>