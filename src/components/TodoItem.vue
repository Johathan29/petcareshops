<script lang="ts" setup >
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import { counter } from '@fortawesome/fontawesome-svg-core';
</script>
<template>

        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-[#d8ecf3] dark:hover:bg-gray-600" >
         <router-link  title=" " v-bind:to="{name:'profile', params: {iduser:counters,firstname:todo.firstName } }" class="hover:underline">
            <td  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" v-bind:src="todo.image" alt="Jese image">
                    <div class="ps-3">
                        <div class="text-base font-semibold">{{ todo.firstName }} {{ todo.lastName }}</div>
                        <div class="font-normal text-gray-500">{{ todo.email }}</div>
                    </div>     
                </td>
            </router-link>
                <td class="px-6 py-4">
                    <router-link  title=" " v-bind:to="{name:'profile', params: {iduser:counters,firstname:todo.firstName } }" class="hover:underline">
                    {{ todo.company.title }}
                    </router-link>
                </td>
                <td class="px-6 py-4">
                    <router-link  title=" " v-bind:to="{name:'profile', params: {iduser:counters,firstname:todo.firstName } }" class="hover:underline">
                    <div class="flex items-center">
                        <div :class="['h-2.5 w-2.5 rounded-full', todo.role=='admin'?'bg-green-500' : 'bg-red-500','me-2']" id="state"></div> Online
                    </div>
                    </router-link>
                </td>
                <td class="px-6 py-4 flex justify-around items-center gap-2">

                    <router-link  title=" " v-bind:to="{name:'profile', params: {iduser:counters,firstname:todo.firstName } }" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        <FontAwesomeIcon :icon="faEye" class="mb-0"/>
                        <span class="tooltiptext">Ver detalle</span>
                    </router-link>
                    <a  v-on:click="removeTodo()" v-if="validation['role']==='admin'" class="font-medium text-blue-600  hover:cursor-pointer"  title="">
                        <FontAwesomeIcon :icon="faDeleteLeft" class="mb-0"/>
                        <span class="tooltiptextDelete">Eliminar usuario </span>
                    
                    </a>
                </td>
         
            </tr>
    
       
           
      
</template>

<script  lang="ts">
import Conections from '../components/Endpoints'
export default {
    name: 'todoitem',
    props: ['todo',],
    data(){
    return{
        wordToword:'',
        counters:0,
        usuario:[],
        validation:[]
        }
    },
  methods: {
    removeTodo() {
      this.$emit('todo:remove', this.todo.id);
    },
    async counterWord(){
        let index=0;
        const endPoint=await Conections.methods.usersAll();
        this.usuario=localStorage.getItem('usuario');
        this.usuario=JSON.parse(this.usuario);
        this.validation=endPoint.find(item=> item.id===this.usuario.id)
       
        }
    },
    mounted(){
        this.counterWord();
        }
        
}

</script>
<style src="./todoItem.css"></style>
