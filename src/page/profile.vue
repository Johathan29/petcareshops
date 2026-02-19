<script setup lang="ts">
import {ref } from 'vue'
interface Profile {
app_metadata:[]
identities:[]
is_anonymous: Boolean 
phone: string 
role:string 
user_metadata: []

}
const profile = ref<Profile[]>([])
const role = ref()
const user = ref()
user.value = JSON.parse(sessionStorage.getItem('user') || '') 
profile.value = user.value.data.user.user_metadata
role.value = user.value.data.user.app_metadata;

</script>
<template>
    
        <h1> {{ profile?.first_name }}</h1>


</template>