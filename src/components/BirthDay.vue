<template>
<div class="max-w-screen-xl md:mx-auto md:px-0 px-4"> 
      <h1 class="text-left text-[3rem] text-[#18489b] font-[emoji] capitalize birthday"  >Happy birthDay  </h1>
      <span class="text-left text-[1rem] text-[#18489b] font-[emoji] block  ">{{month}} {{  year}} </span>
      <hr class="mb-[2rem] mt-[0.4rem]"/>
      <ol class=" border-s border-gray-200 dark:border-gray-700">                  
            <li class="mb-10 ms-6" v-for="todo in orderTodos.filter(item=>item.date===month)"> 
                <div  class="flex items-center md:gap-[1rem]">
                  <span class="relative  flex items-center justify-center w-[3.5rem] h-[3.5rem] bg-blue-100 rounded-full start-[-2.75rem] md:start-[-3.2rem] ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <img class="rounded-full shadow-lg" :src="todo.image" alt="Bonnie image"/>
                  </span>
                  <div class="items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex dark:bg-gray-700 dark:border-gray-600">
                      <time class="mb-1 text-xs text-gray-400 font-bold text-right sm:order-last w-full sm:mb-0">{{todo.date}} {{year}}</time>
                      <div class="text-[1.2rem] w-full text-gray-500 dark:text-gray-300 w-full font-bold flex items-center gap-4">{{todo.name}}<span class="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">{{todo.cargo}}</span><span class="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">{{todo.departamento}}</span></div>
                </div>
              </div>         
            </li>
        </ol>
    </div>
   
</template>

<script  lang="">
import {ref} from 'vue';
 const response=ref([]);
    response.value = await fetch('https://dummyjson.com/users?limit=208');
    const users = await response.value.json();
    const categoryTitle=users.users.map(item=> item.company.title)
    const items = new Set(categoryTitle);
    const title = Array.from(items);
export default {
name: 'birthday',
props: ['todo',],
data(){
return{
    wordToword:'',
    counters:0,
    todos: users.users,
    usuario:[],
    validation:[],
    orderTodos:[],
    // date variable
    month:'',
    year:'',
    monthDay:'',
    dayhappy:'',
    }
},
methods: {
removeTodo() {
  this.$emit('todo:remove', this.todo.id);
},
getDateNow()
    {
      const options1 = {
        day:'numeric',
        month: "long",
        
      };
      const  date = new Date();
      let IntlDateTimeFormat=  new Intl.DateTimeFormat("es-span",options1)
      this.month=IntlDateTimeFormat.format(date);
      this.year=date.getFullYear();
      const day=date.getDay()+1;
      const mes=date.getMonth()+1;
      this.monthDay=mes+'-'+day
      const ordenar=  this.todos.sort((a,b)=> new Date(a.birthDate) - new Date(b.birthDate))
      this.orderTodos=ordenar.map(item=>  {
        const name=item.firstName +" "+ item.lastName  
        const date= IntlDateTimeFormat.format(new Date(item.birthDate))
        const image=item.image
        const cargo=item.company.title
        const departamento=item.company.department
        
       return {
        date,
        name,
        image,
        cargo,
        departamento
       }
      })
      console.log(ordenar.filter(item=>item.date===this.month))
     
      return this.year,this.month, this.monthDay,this.orderTodos;
    }
    
  },

mounted(){
  this.getDateNow()
   
    }
    
}

</script>
<style src="./todoItem.css"></style>
