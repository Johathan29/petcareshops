<template>
    <div
       
       class="bg-white dark:bg-zinc-900 rounded-xl border shadow-sm p-6 animate-pulse"
     >
       <div class="flex gap-4">
         <div class="size-16 rounded-xl bg-slate-200 dark:bg-zinc-700"></div>
   
         <div class="flex-1 space-y-2">
           <div class="h-4 w-40 bg-slate-200 dark:bg-zinc-700 rounded"></div>
           <div class="h-3 w-24 bg-slate-200 dark:bg-zinc-700 rounded"></div>
         </div>
       </div>
   
       <div class="mt-6 space-y-2">
         <div class="h-3 w-32 bg-slate-200 dark:bg-zinc-700 rounded"></div>
         <div class="flex gap-2">
           <div class="h-6 w-20 bg-slate-200 dark:bg-zinc-700 rounded"></div>
           <div class="h-6 w-24 bg-slate-200 dark:bg-zinc-700 rounded"></div>
           <div class="h-6 w-16 bg-slate-200 dark:bg-zinc-700 rounded"></div>
         </div>
       </div>
   
       <div class="mt-6 flex justify-between">
         <div
           v-for="i in 7"
           :key="i"
           class="flex flex-col items-center gap-2"
         >
           <div class="h-3 w-8 bg-slate-200 dark:bg-zinc-700 rounded"></div>
           <div class="size-8 rounded-full bg-slate-200 dark:bg-zinc-700"></div>
         </div>
       </div>
     </div>
       </template>