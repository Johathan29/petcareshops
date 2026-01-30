i<script setup>
import { ref, computed, onMounted } from 'vue';
const users = ref(null);
const capturar = ref(0);
const itemUser = ref([]);
const grupoItem = ref([]);
 const checkedItem = ref([]);
 const ruta=ref("/user/");
  //https://jsonplaceholder.typicode.com/users
onMounted(async () => 
{
    const response = await fetch('https://dummyjson.com/users');
    users.value = await response.json();
    users.value=users.value.users;
    itemUser.value=users.value.length/5;
    capturar.value=users.value.length;
}
);
const detalleUser =computed( 
    {
        get()
        {
            if (checkedItem.value === 0) 
            {
                Swal.fire(
                {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => 
                {
                     if (result.isConfirmed) 
                        {
                            Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            });
                            users.value.shift();
                            document.getElementById("checkbox-table-search-1").checked = false;
                        }
                    });
                    } else 
                    {
                        Swal.fire({
                        title: 'Estas seguro?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                        }).then((result) => 
                        {
                            if (result.isConfirmed) {
                                Swal.fire({
                                title: 'Deleted!',
                                text: 'Your file has been deleted.',
                                icon: 'success',
                                });
                                users.value.splice(checkedItem.value,1);
                                
                            }
                });
            }
        },
    });
  
</script>

<template>

 <div class="relative overflow-x-auto shadow-md  ">
  <div class="title mb-3">
    <div class="lg:container md:mx-auto px-5">
      <h2 class=" p-5 text-[2rem]">Listado de Usuarios</h2>
    </div>
  </div>
    <div class="lg:container md:mx-auto px-5">
        <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
                    <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span class="sr-only">Action button</span>
                        Action
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                            <li>
                                <a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                            </li>
                        </ul>
                        <div class="py-1">
                            <a @click="detalleUser" class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Delete User</a>
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users">
                </div>
        </div>
    </div>
    <section>
      <div class="lg:container md:mx-auto px-5">
<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                 <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Position
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody >
            <tr  v-for="(user, index) in users" :key="user.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4" >
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" :value="index" v-model="checkedItem" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class=" items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {{ user.id }}
                </th>
                <td  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" v-bind:src="user.image" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{ user.firstName }} {{ user.lastName }}</div>
                        <div class="font-normal text-gray-500">{{ user.email }}</div>
                    </div>  
                </td>
                <td class="px-6 py-4">
                    React Developer
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                    </div>
                </td>
                <td class="px-6 py-4">
                    <router-link aria-current="page" v-bind:to="'user/'+user.id" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</router-link>
                </td>
            </tr>
           
        </tbody>
    </table>
     <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">{{capturar}}</span></span>
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li >
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previus</a>
            </li>
            <li v-for="pagina in itemUser">
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{pagina}}</a>
            </li>
            
            <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
      </div>
    </section>
    
</div>

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
