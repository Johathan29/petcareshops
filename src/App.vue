<script setup>
import Header from './components/Header.vue';
import Footer from './components/footer.vue';
import FormUsers from './components/FormUsers.vue'
import Registrar from './page/Registrar.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {} from '@fortawesome/free-regular-svg-icons'

import Img from './assets/user-plus-solid.svg';
import { faUser,faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref,watch } from 'vue'
import { initFlowbite } from 'flowbite'
import { useRoute } from 'vue-router';
const route = useRoute()

const captureUrl = () => {
  return route.fullPath
}

watch(
  () => route.fullPath,
  () => {
    captureUrl()
  }
)

onMounted(() => {
  captureUrl()
  initFlowbite()
})

</script>
<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  data(){
return{
userId:1,
messager:'',
  }
},
methods:{
  singOut(){
    localStorage.removeItem('usuario');
    location.reload(true);
  },
  captureData()
    {
      this.messager=JSON.parse(localStorage.getItem('usuario'));
 
    }
    
},
mounted(){
  this.captureData();
},
components:{
FormUsers,
}
};
</script>
