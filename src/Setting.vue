<script setup>

import { ref, computed, onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEdit} from '@fortawesome/free-solid-svg-icons'
import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'
const users = ref(null);
const url=window.location;
const id=ref(0);
const breadcrum=ref();
id.value=url.hash.split('/');
const ruta=ref()
ruta.value=id.value[1];
id.value=parseInt(id.value[2]);
const userregistered=ref([]);
const datos=ref([]);
datos.value=[
  {
    Id:Number,
    Email:'',
    FirstName:'',
  }
];


// initialize components based on data attribute selectors
onMounted(() => 
{
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})
  //https://jsonplaceholder.typicode.com/users
onMounted(async () => 
    {
    const response = await fetch('https://dummyjson.com/users');
    users.value = await response.json();
    users.value=users.value.users;
    userregistered.value=users.value.find(item=>item.id===id.value);
    datos.value.push(datos.value.Email=userregistered.value.email,datos.value.FirstName=userregistered.value.firstName,datos.value.Id=userregistered.value.id);
    breadcrum.value=datos.value.FirstName;
    console.log(datos.value);

    }
);
const datails =computed( 
    {
        get()
        {
        users.value.find(item=>item.id===id.value);
        },
        

    });
   const detailsUser=(index)=>
    {
        alert(users.value.find(item=>item.id===index).firstName);
    }
    const update=(index,firstname)=>
    {
      userregistered.value.push(userregistered.value.firstName=firstname)
      datos.value.push(datos.value.FirstName=firstname);
     
    }

</script>
<template>
    <section>
        <div class="py-[4rem] bg-[#0798ca30]">
    <div class="max-w-screen-xl md:mx-auto px-5 ">
        <h1 class="text-left text-[2rem] text-[#18489b] font-[emoji]">Setting in Profile</h1>
      </div>
</div>
    </section>
  <section>
    <div class="max-w-screen-xl md:mx-auto px-5 my-3">
        <div  class="">
            <div  class=" flex gap-12 w-full  p-5  rounded-lg border-2 border-[#e5e7eb6b] " style="">
              <div class="brightness-50">
                  <h1 class="capitalize text-white text-[1.5rem] flex items-center gap-1" > {{userregistered.firstName}}<div :class="['h-2 w-2 rounded-full relative ', userregistered.role==='admin'?'bg-green-500' : 'bg-red-500','me-4']"></div> </h1>
                  <div class="p-3 border-[1px] border-white w-max rounded-full bg-white">
                      <img v-bind:src="userregistered.image" class="w-72  "/>
                      <p class="text-black font-[serif]">{{ userregistered.role }}</p>
                  </div>
              </div>

            
        </div>
    </div>
    </div>


<!-- Modal toggle -->
<div class="max-w-screen-xl md:mx-auto px-5 relative bottom-[33rem]">
<button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white top-[10rem] right-[2rem]  hover:bg-blue-800 focus:outline-none hover:opacity-[1] opacity-[0.3] font-medium hover:bg-transparent rounded-lg text-sm   text-center  absolute" type="button" >
  <FontAwesomeIcon :icon="faEdit" class="mb-0"/>
</button>

<!-- Main modal -->
<div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
                <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
                <form class="space-y-4" action="#">
                  <div>
                    
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input  name="firstname"  @input="event => firstname = event.target.value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                  
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" :value="datos.Email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div class="flex justify-between">
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <button type="button" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="update(datos.Id,firstname)">Login to your account</button>
                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div> 
</div>
</section>


</template>

<style>
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
