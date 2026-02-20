<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue"
import { Chart, registerables } from "chart.js"
import { useServicesStore } from "../../../stores/service.store"
import { useAppointmentStore } from "../../../stores/appointment.store"

Chart.register(...registerables)

const servicesStore = useServicesStore()
const appointmentStore = useAppointmentStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

/* 🎨 Paleta estilo dashboard moderno */
const COLORS = [
  "#22d3ee",
  "#06b6d4",
  "#0ea5b2",
  "#134e4a",
  "#0f766e",
  "#164e63"
]

/* 📊 Agrupar citas por servicio */
const groupedData = computed(() => {
  const map: Record<string, number> = {}

  appointmentStore.appointments.forEach(appt => {
    const service = servicesStore.services.find(
      s => s.id === appt.service_id
    )
    if (!service) return

    map[service.title] = (map[service.title] || 0) + 1
  })

  return map
})

/* 🔢 Total */
const totalAppointments = computed(() =>
  Object.values(groupedData.value).reduce((a, b) => a + b, 0)
)

/* 🎯 Plugin centro */
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart: any) {
    const { width, height, ctx } = chart
    ctx.restore()

    ctx.font = "bold 28px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(
      totalAppointments.value.toString(),
      width / 2,
      height / 2 - 10
    )

    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#94a3b8"
    ctx.fillText(
      "TOTAL APPOINTMENTS",
      width / 2,
      height / 2 + 15
    )

    ctx.save()
  }
}

/* 🚀 Render chart */
const renderChart = () => {
  if (!canvasRef.value) return

  const labels = Object.keys(groupedData.value)
  const values = Object.values(groupedData.value)

  if (!values.length) return

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(canvasRef.value, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: COLORS,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      animation: {
        animateRotate: true,
        animateScale: true
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#ffffff",
          bodyColor: "#cbd5e1",
          borderColor: "#1e293b",
          borderWidth: 1
        }
      }
    },
    plugins: [centerTextPlugin]
  })
}

/* 🔄 Reactividad */
watch(groupedData, () => {
  renderChart()
})

onMounted(async () => {
  await Promise.all([
    servicesStore.fetch(),
    appointmentStore.fetch()
  ])

  renderChart()
})
</script>

<template>
  <div class="glass-card rounded-xl p-6">
    <h4 class="text-left text-white font-bold text-lg mb-1">
      Service Distribution
    </h4>
    <p class="text-left text-slate-500 text-xs mx-2 mb-6">
      Distribution by service type
    </p>

    <!-- 🔥 Altura controlada -->
    <div class="relative h-72">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- 💎 Leyenda personalizada -->
    <div class="mt-6 space-y-3">
      <div
        v-for="(value, index) in Object.values(groupedData)"
        :key="index"
        class="flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: COLORS[index] }"
          ></span>
          <span class="text-slate-300 text-sm">
            {{ Object.keys(groupedData)[index] }}
          </span>
        </div>

        <span class="text-white text-sm font-semibold">
          {{
            totalAppointments
              ? ((value / totalAppointments) * 100).toFixed(0)
              : 0
          }}%
        </span>
      </div>
    </div>
  </div>
</template>