<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  doctor: {
    id: number
    name: string
    avatar: string
    specialty: string
    processes: string[]
    schedule: Record<string, string | null>
    availableToday: boolean
  } | null
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'reserve', payload: {
    doctor: any
    day: string
    hour: string
  }): void
}>()
const todayKey = new Date().toLocaleDateString('es-ES', {
  weekday: 'long'
})

const normalizeDay = (day: string) =>
  day.charAt(0).toUpperCase() + day.slice(1)

console.log(normalizeDay(todayKey))
const isToday = (day: string) =>
  day === normalizeDay(todayKey)


const getDayTooltip = (day: string, hour: string | null) => {
  if (!hour) return 'No labora este día'
  if (isToday(day)) return 'Disponible hoy'
  return 'Disponible este día'
}
const activeDay = ref<string | null>(null)

const toggleTooltip = (day: string) => {
  activeDay.value = activeDay.value === day ? null : day
}
</script>
<template>
  <div v-for="docto in doctor" class=" bg-white dark:bg-zinc-900 rounded-xl border overflow-hidden
           shadow-sm hover:shadow-xl transition-all flex flex-col
           border-slate-200 dark:border-zinc-800">
    <!-- Card Body -->
    <div class="p-6">

      <!-- Header -->
      <div class="flex justify-between items-start">
        <div class="flex gap-4">
          <div class="size-16 rounded-xl bg-cover bg-center border"
            :style="{ backgroundImage: `url(${docto?.avatar})` }"></div>

          <div>
            <h3 class="text-lg  text-left font-bold text-zinc-900 dark:text-white">
              {{ docto.name }}
            </h3>
            <div class="flex items-center gap-1 flex-wrap">
              <span class="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold uppercase rounded border tracking-wide"
                v-for="value in docto.specialty" :class="doctor.availableToday
    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
    : 'bg-[#eff6ff] dark:bg-zinc-800 text-[#0f6cbd] border-slate-200'">
                {{ value }}
              </span>
            </div>

          </div>
        </div>

        <!-- Tooltip -->
        <div class="relative group">
          <button class="size-8 rounded-lg bg-[#eff6ff] text-primary
                   hover:bg-[#d1e5ff] hover:text-sky-500  transition">
            <span class="material-symbols-outlined text-lg">info</span>
          </button>

          <div class="absolute right-0 top-10 w-48 p-3 bg-zinc-900 text-white text-xs
                   rounded-lg shadow-xl z-20 border border-zinc-700
                   opacity-0 scale-95 pointer-events-none
                   group-hover:opacity-100 group-hover:scale-100 transition">
            <p class="font-bold border-b border-zinc-700 pb-2 mb-2">
              Common Procedures
            </p>
            <ul class="space-y-1">
              <li v-for="p in docto.processes" :key="p" class="flex justify-between">
                • {{ p.title }} <span class="text-[#80ff11]">${{ p.price }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Procedures -->
      <div class="mt-6">
        <p class="text-xs text-left font-bold text-slate-400 uppercase tracking-widest mb-3">
          Focus Areas
        </p>
        <div class="flex flex-wrap gap-2">
          <span v-for="p in docto.processes" :key="p" class="px-3 py-1 text-xs rounded-lg border
                   bg-[#eff6ff] dark:bg-zinc-800 text-[#0f6cbd] border-slate-200">
            {{ p.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Schedule -->
    <div class="mt-auto px-6 py-4 bg-slate-50 dark:bg-zinc-800/50 border-t">
      <p class="text-xs font-bold text-left text-slate-400 uppercase tracking-widest mb-3">
        Weekly Schedule
      </p>

      <div class="flex justify-between">

        <!-- Schedule Item -->
        <div v-for="value in docto.schedule" :key="value.day" class="relative group flex flex-col items-center gap-1 ">
          <!-- Day -->
          <span :class="value.hour === null
    ? 'text-red-700 text-[10px]'
    : isToday(value.day)
      ? 'text-green-500 text-[10px]'
      : 'text-slate-500 text-[10px]'">
            {{ value.day }}
          </span>

          <!-- Hour -->
          <button class="size-8 flex items-center justify-center rounded-full
           text-[10px] font-bold cursor-pointer
           transition-colors" @click.stop="value.hour &&
    emit('reserve', {
      doctor,
      day: value.day,
      hour: value.hour
    })" :class="value.hour === null
    ? 'bg-red-500 text-white'
    : isToday(value.day)
      ? 'bg-green-500 text-black'
      : 'bg-slate-200 dark:bg-zinc-700 text-black'">
            {{ value.hour || '—' }}
          </button>

          <!-- Tooltip -->
          <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 group-last:left-[34%] group-first:left-[95%]
         px-2 py-1 rounded text-[10px] whitespace-nowrap
         opacity-0 translate-y-1 scale-95 
         group-hover:opacity-100
         group-hover:translate-y-0
         group-hover:scale-100
         transition-all duration-200
         pointer-events-none shadow-lg z-20" :class="value.hour === null
    ? 'bg-red-600 text-white'
    : isToday(value.day)
      ? 'bg-green-600 text-white'
      : 'bg-zinc-800 text-white'">
            {{ getDayTooltip(value.day, value.hour) }}

            <!-- Arrow -->
            <span class="absolute left-1/2 top-[1.2rem] -translate-x-1/2 group-first:left-[28%] group-first:left-[95%]
           w-2 h-2 rotate-45 " :class="value.hour === null
    ? 'bg-red-600'
    : isToday(value.day)
      ? 'bg-green-600'
      : 'bg-zinc-800'"></span>
          </span>

        </div>

      </div>
    </div>
  </div>




</template>
<style scoped>
.loader {
  width: 19px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
}
</style>