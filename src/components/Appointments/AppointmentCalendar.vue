<script setup lang="ts">
import { ref, computed } from "vue"
import type { Appointment } from "../../stores/appointment.store"

interface Props {
  appointments: Appointment[]
  loading: boolean
}

const props = defineProps<Props>()

const currentDate = ref(new Date())

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

// Obtener días del mes
const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  // Días del mes anterior
  const firstDayWeekday = firstDay.getDay()
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = new Date(year, month, -i)
    days.push({ date: day, isCurrentMonth: false })
  }

  // Días del mes actual
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = new Date(year, month, i)
    days.push({ date: day, isCurrentMonth: true })
  }

  // Días del mes siguiente
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i)
    days.push({ date: day, isCurrentMonth: false })
  }

  return days
})

// Citas por día
const getAppointmentsForDay = (date: Date) => {
  const dateStr = date.toDateString()
  return props.appointments.filter((appt) => {
    return new Date(appt.date).toDateString() === dateStr
  })
}

// Navegación entre meses
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1
  )
}

const goToToday = () => {
  currentDate.value = new Date()
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

// Badge de estado
const statusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500",
    confirmed: "bg-green-500",
    cancelled: "bg-red-500",
    completed: "bg-blue-500",
    rejected: "bg-gray-500",
  }
  return colors[status] || colors.pending
}
</script>

<template>
  <div class="space-y-4">
    <!-- Calendar Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          @click="previousMonth"
          class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <span class="material-symbols-outlined text-white">chevron_left</span>
        </button>
        
        <h3 class="text-xl font-bold text-white">
          {{ monthNames[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}
        </h3>
        
        <button
          @click="nextMonth"
          class="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <span class="material-symbols-outlined text-white">chevron_right</span>
        </button>
      </div>

      <button
        @click="goToToday"
        class="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
      >
        Hoy
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="glass-card rounded-xl overflow-hidden">
      <!-- Day names header -->
      <div class="grid grid-cols-7 border-b border-slate-700">
        <div
          v-for="day in dayNames"
          :key="day"
          class="py-3 text-center text-sm font-semibold text-slate-400"
        >
          {{ day }}
        </div>
      </div>

      <!-- Days grid -->
      <div class="grid grid-cols-7">
        <div
          v-for="{ date, isCurrentMonth } in daysInMonth"
          :key="date.toDateString()"
          class="min-h-[100px] p-2 border-b border-r border-slate-700/50"
          :class="[
            !isCurrentMonth ? 'bg-slate-800/30' : '',
            isToday(date) ? 'bg-cyan-500/10' : ''
          ]"
        >
          <!-- Day number -->
          <div
            class="text-sm font-medium mb-1 flex items-center justify-between"
            :class="isCurrentMonth ? 'text-white' : 'text-slate-500'"
          >
            <span>{{ date.getDate() }}</span>
            <span
              v-if="isToday(date)"
              class="w-2 h-2 rounded-full bg-cyan-500"
            ></span>
          </div>

          <!-- Appointments -->
          <div class="space-y-1">
            <div
              v-for="appt in getAppointmentsForDay(date).slice(0, 3)"
              :key="appt.id"
              class="text-xs p-1 rounded truncate"
              :class="statusColor(appt.status)"
              :title="`${appt.services?.title} - ${appt.profiles?.first_name}`"
            >
              {{ new Date(appt.date).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) }}
            </div>
            <div
              v-if="getAppointmentsForDay(date).length > 3"
              class="text-xs text-slate-400 text-center"
            >
              +{{ getAppointmentsForDay(date).length - 3 }} más
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-4 justify-center">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span class="text-slate-400 text-sm">Pendiente</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-green-500"></span>
        <span class="text-slate-400 text-sm">Confirmada</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-red-500"></span>
        <span class="text-slate-400 text-sm">Cancelada</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-blue-500"></span>
        <span class="text-slate-400 text-sm">Completada</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
