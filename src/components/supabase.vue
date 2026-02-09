
<script setup>
import { ref,onMounted } from 'vue';
  import { supabase } from '../config/supabase'
  const todos = ref([])

  async function getTodos() {
    const { data } = await supabase.from('animals').select()
    console.log(data)
  }
  async funtion setData(adoption){
    const { error } = await supabase
  .from('adoption')
  .insert({ id: 1, name: 'Mordor' })
  }

  onMounted(() => {
    getTodos()
  })
console.log(  todos.value )
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li>
  </ul>
</template>
