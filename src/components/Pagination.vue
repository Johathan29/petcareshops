<template>
<nav aria-label="Page navigation example" class="py-[4rem] md:px-0 px-4">
  <ul class="flex flex-wrap items-center -space-x-px h-8 text-sm">
    <li class="mb-[0.3rem]" v-if="totalPages() > 0">
      <button  
      v-bind:disabled="showPreviousLink()"  
      v-on:click="updatePage(currentPage - 1)" 
      class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0 rounded-s-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"><span class="sr-only">Previous</span><svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"></path></svg>
      </button>
    </li>
      <li v-for="item in totalPages()" class="mb-[0.3rem]">
      <a  :class="['flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 border border-e-0   border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white',item==currentPage+1 ? 'bg-gray-700 text-white' : ' bg-gray-800 cursor-pointer']" v-on:click="updatePage(item-1)">{{ item  }}</a>
    </li>
   
    <li class="mb-[0.3rem]">
      <button  
      v-bind:disabled="showNextLink()" 
      v-on:click="updatePage(currentPage + 1)"  
      :class="['flex items-center justify-center px-4 h-8 leading-tight text-gray-500  border  rounded-e-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white',showNextLink()=='false'  ? 'cursor-not-allowed': 'cursor-pointer']">
        <span class="sr-only">Next</span>
        <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </li>
  </ul>
</nav>
<div class="title-section is-inverted"></div>
</template>
<style>


.title-section.is-inverted {
    background: linear-gradient(0deg, rgba(0, 56, 118, 0.85) 0%, rgba(0, 56, 118, 0.85) 100%), url(../assets/logo.png) no-repeat center / cover;
}
button[disabled] {
    cursor: no-drop;
    opacity: 0.7;
}
button[disabled]:hover {
  opacity: 0.7;
  color:rgb(107 114 128 / var(--tw-text-opacity));
}
</style>
<script src="./Pagination.js"></script>

