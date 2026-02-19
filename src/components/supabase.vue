
<script setup>
import { ref,onMounted } from 'vue';
  import { supabase } from '../config/supabase'
  const todos = ref([])

  async function getTodos() {
    const { data } = await supabase.from('animals').select()
    return data
  }
  /*async funtion setData(adoption){
    
  }*/

  onMounted(() => {
    getTodos()
  })

</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li>
  </ul>
</template>
