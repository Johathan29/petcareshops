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

  <Header v-if="route.fullPath!=='/auth' && route.fullPath!=='/dashboard'" />
 <!-- <section >
  <div class="absolute z-50 right-[4rem] py-4  " v-if="messager==''">
    <div class="max-w-screen-xl  mx-auto " > 
      <div class=" border-b border-gray-200 dark:border-gray-700" >
        <ul class="flex flex-wrap  text-sm font-medium text-center text-gray-500 border-b border-gray-50 justify-between" id="default-styled-tab" 
        data-tabs-toggle="#default-styled-tab-content" 
        data-tabs-active-classes="bg-gray-50"
        data-tabs-inactive-classes="opacity-75"
        role="tablist">
            <li class="me-2 w-40" role="presentation">
                <button class="flex items-center  h-full w-full gap-2 p-4 text-blue-600 bg-gray-100 rounded-t-lg  " id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                  <FontAwesomeIcon :icon="faUser" class="mb-0"/>Iniciar Sesión
                </button>
            </li>
            <li class="w-40" role="presentation">
                <button class="flex items-center  h-full w-full gap-2 p-4 text-blue-600 bg-gray-100 rounded-t-lg   hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">
                  <FontAwesomeIcon :icon="faPersonCirclePlus" class="mb-0"/>Registrar
                </button>
            </li>
        </ul>
      </div>
    <div id="default-styled-tab-content" class="md:w-[21rem] w-full">
      <div class="hidden p-4 rounded-b-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
        <FormUsers  @emitter="captureData" />
      </div>
      <div class="hidden  rounded-b-lgbg-gray-50 dark:bg-gray-800" id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
        <Registrar   />    </div>
      <div class="hidden p-4 rounded-b-lgbg-gray-50 dark:bg-gray-800" id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
      <div class="hidden p-4 rounded-b-lgbg-gray-50 dark:bg-gray-800" id="styled-contacts" role="tabpanel" aria-labelledby="contacts-tab">
          <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
    </div>
  </div>
</div>
</div>
<div :class="[messager=='' ? 'absolute -z-10 right-[4rem]' : 'absolute z-50 md:right-[25.27rem] right-[1.2rem] ']" >
  <img id="avatarButton"  type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" :src="messager.image" alt="User dropdown">

    // Dropdown menu -
    <div id="userDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-b-lgshadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <span class="font-[ui-serif] text-[19px] text-[#575353]">{{messager.firstName}}</span>
        <div class="font-medium truncate">{{messager.email}}</div>
      </div>
      <ul class="py-2 text-sm text-left text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>

          <router-link v-bind:to="'user/'+messager.id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</router-link>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
      </ul>
      <div class="py-1">
        <button @click="singOut()" class="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
      </div>
    </div>
    </div>
    </section>-->
  <div class="h-min">
    <router-view @array="messager"></router-view>
  </div>
  
  <Footer v-if="route.fullPath!=='/auth'"/>
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
