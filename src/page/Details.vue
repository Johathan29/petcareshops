<script lang="ts" setup >

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
import { And } from 'typeorm';

//const datos=ref({});

/*datos.value=[
  {
    Id:Number,
    Email:'',
    FirstName:'',
  }
];*/


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
}
);
/*const datails =computed( 
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
    */

</script>
<template>
  <BreadCrum :name="breadCrumUrl" ></BreadCrum>
  <section>
    <div class="py-[4rem] bg-[#0798ca30]">
      <div class="max-w-screen-xl md:mx-auto px-5 ">
          <h1 class="text-left text-[2rem] text-[#18489b] font-[emoji]">Registered users</h1>
        </div>
    </div>
    <div class="max-w-screen-xl md:mx-auto px-5 my-3 py-[2rem]">
      <div  class="">
        <div  class=" flex gap-12 flex-wrap w-full justify-between p-5  rounded-lg border-2 border-[#e5e7eb6b] " style="">
          <div class="brightness-50 w-1/5">
              <h1 class="capitalize text-white text-[1.5rem] flex items-center gap-1" > {{userregistered['firstName']}}<div :class="['h-2 w-2 rounded-full relative ', userregistered['id']===User['id'] ? 'bg-green-500' : 'bg-red-500','me-4']"></div> </h1>
              <div class="p-3 border-[1px] border-white w-max rounded-full bg-white">
                  <img v-bind:src="userregistered['image']" class="w-72  "/>
                  <h1>{{  }}</h1>
                  <p class="text-black font-[serif]">{{ userregistered['role'] }}</p>
              </div>
            </div>
          <!-- Modal toggle -->
            <div :class="[usuario['role']==='admin'?'px-5 relative ' : 'hidden']" >
              <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-gray-700 top-[10rem] right-[2rem]  hover:bg-blue-800 focus:outline-none hover:opacity-[1] opacity-[0.3] font-medium hover:bg-transparent rounded-lg text-sm   text-center " type="button" >
                <FontAwesomeIcon :icon="faEdit" class="mb-0"/>
              </button>
              <!-- Main modal -->
              <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-[58rem] max-h-full">
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
                        <form class="space-y-4 text-left" action="#">
                          <div class="grid gap-6 mb-6 md:grid-cols-2 text-left ">
                            <div class="">
                              <label for="first_name" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">First name<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                              <input type="text" id="first_name" name="first_name"  @input="event => first_name = event.target.value" :value="userregistered['firstName'] " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
                            </div>
                            <div>
                                <label for="last_name" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Last name<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                                <input type="text" id="last_name" name="last_name" @input="event => last_name = event.target.value" :value="userregistered['lastName']" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Doe" required />
                            </div>  
                          </div>
                          <div class="grid gap-6 mb-6 md:grid-cols-2 text-left"> 
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Phone number<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                                <input type="tel" id="phone" @input="event => phone = event.target.value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Email address<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                                <input type="email" id="email" name="email" @input="event => email = event.target.value" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " :value="userregistered['email']" placeholder="john.doe@company.com" required />
                            </div> 
                          </div>
                          <div class="grid gap-6 mb-6 md:grid-cols-2 text-left">
                            <div>
                                <label for="Age" class="block mb-2 text-sm font-medium text-[#0f49c5] dark:text-white">Age<sup class="top-[0px] text-sm font-medium text-red-500 dark:text-white">*</sup></label>
                                <input type="number" min="1" max="100" id="Age" name="age" @input="event => age = event.target.value" :value="userregistered['age']"
                                :class="[age!=='' ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ':'bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ']" placeholder="•••••••••" required />
                            </div>  
                          </div>
                          <button type="button" class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                          @click="update(userregistered['id'],first_name,last_name)">
                            Actualizar perfil
                          </button>    
                        </form>
                      </div>
                  </div>
                </div>
              </div> 
            </div>
            <div id="accordion-color" data-accordion="collapse" class="md:w-1/2 w-full" data-active-classes="bg-[#3F83F8] text-[#fff] mb-4" data-inactive-classes="mb-4 text-[#3F83F8] bg-[#fff]">
              <h2 id="accordion-color-heading-1" class="">
                <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border-r-0 border-l-0 border-t-0 !border-b-2 border-gray-200 focus:ring-4 focus:ring-blue-200 gap-3 " data-accordion-target="#accordion-color-body-1" aria-expanded="true" aria-controls="accordion-color-body-1">
                  <span>Datos Personales</span>
                  <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                  </svg>
                </button>
              </h2>
            <div id="accordion-color-body-1" class="hidden" aria-labelledby="accordion-color-heading-1">  
              <dl class="w-full text-gray-900 divide-y divide-gray-200 border-b-[1px] border-[#d6d1d1]">
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                  <dd class="text-lg font-semibold">{{userregistered['firstName']}}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                  <dd class="text-lg font-semibold">{{userregistered['lastName']}} {{ userregistered['maidenName'] }}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Age</dt>
                  <dd class="text-lg font-semibold">{{userregistered['age']}}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                  <dd class="text-lg font-semibold">{{userregistered['email']}}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone</dt>
                  <dd class="text-lg font-semibold">{{userregistered['phone']}}</dd>
                </div>
              </dl>
            </div>
            <h2 id="accordion-company">
              <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border-r-0 border-l-0 border-t-0 !border-b-2 border-gray-200 focus:ring-4 focus:ring-blue-200 gap-3 " data-accordion-target="#accordion-color-body-2" aria-expanded="false" aria-controls="accordion-color-body-2">
                <span>Company</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <div id="accordion-color-body-2" class="hidden" aria-labelledby="accordion-company">
              <dl class="w-full text-gray-900 divide-y divide-gray-200 border-b-[1px] border-[#d6d1d1]">
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Company Name</dt>
                  <dd class="text-lg font-semibold" v-for="name in userregistered">{{name['name'] }}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Department Name</dt>
                  <dd class="text-lg font-semibold" v-for="address in userregistered">{{address['department']}}</dd>
                </div>
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Address</dt>
                  <dd class="text-lg font-semibold" v-for="address in userregistered['company']">{{address.address}}</dd>
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">City </dt>
                  <dd class="text-lg font-semibold" v-for="address in userregistered['company']">{{address.city}}</dd>
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">State </dt>
                  <dd class="text-lg font-semibold" v-for="address in userregistered['company']">{{address.state}}</dd>
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Country </dt>
                  <dd class="text-lg font-semibold" v-for="address in userregistered['company']">{{address.country}}</dd>
                </div>
              </dl>
            </div>
            <h2 id="accordion-color-heading-3">
              <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right border-r-0 border-l-0 border-t-0 !border-b-2 border-gray-200 focus:ring-4 focus:ring-blue-200 gap-3 " data-accordion-target="#accordion-color-body-3" aria-expanded="false" aria-controls="accordion-color-body-3">
                <span>What are the differences between Flowbite and Tailwind UI?</span>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>
            </h2>
            <div id="accordion-color-body-3" class="hidden" aria-labelledby="accordion-color-heading-3">
              <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                <p class="mb-2  dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
                <p class="mb-2  dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
                <p class="mb-2  dark:text-gray-400">Learn more about these technologies:</p>
                <ul class="ps-5  list-disc dark:text-gray-400">
                  <li><a href="https://flowbite.com/pro/" class="text-blue-600 dark:text-blue-500 hover:underline">Flowbite Pro</a></li>
                  <li><a href="https://tailwindui.com/" rel="nofollow" class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" >
import BreadCrum from '../components/Breadcrum.vue'
import Conexion from '../components/Endpoints'
export default{
name:'Datails',
props:{
},
data()
{
    return{
      breadCrumUrl:'',
      clearUrl:'',
      User:'',
      userjson:'',
      userId:0,
      usuario:{},
      datos:[],
      userregistered:{}
        };
},  
methods:
{ 
 async updateUrl(){
    const endpoint= Conexion.methods.usersAll();
     endpoint
    const url=window.location;
    this.userjson=localStorage.getItem('usuario');
    this.User=JSON.parse(this.userjson);
    this.breadCrumUrl=url.hash.split("/");
    const resultuser= await Conexion.methods.usersAll();
    this.usuario=resultuser.find(item=>item.id===this.User.id);
     return this.breadCrumUrl;
    },
    /*breadCrumUrl(){
      
      const url=window.location;
      return url.hash[4]
     
    }*/
   async  update(index,firstname,lastname)
    {
      let update;
     /* updating lastName of user with id 2 */
        await fetch('https://dummyjson.com/users/'+index+'', {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstname,
          lastName: lastname
        })
      })
      .then(res => update=res.json())
      .then(console.log);
},
    async endpoint()
    {
      const url=window.location;
      const id = url.hash.split('/')
      const ruta=id[1];
      this.userId=parseInt(id[2]);
      const resultuser= await Conexion.methods.usersAll();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
      this.userregistered =resultuser.find(item=>item.id===this.userId);      
    }
  },
  mounted(){
    this.updateUrl();
    this.endpoint();
  },
  components:{
    BreadCrum,
    Conexion
  }
}
</script>
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
