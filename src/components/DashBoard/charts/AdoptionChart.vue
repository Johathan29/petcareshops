<script setup lang="ts">
import { onMounted, computed, ref, watch, nextTick } from "vue"
import { Chart, registerables } from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { useAdoptionStore } from "../../../stores/adoption.store"

Chart.register(...registerables, ChartDataLabels)

const adoptionStore = useAdoptionStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

/* ===============================
   Responsive Breakpoints
================================= */

const screenWidth = ref(window.innerWidth)

window.addEventListener("resize", () => {
  screenWidth.value = window.innerWidth
})

const isMobile = computed(() => screenWidth.value < 640)
const isTablet = computed(() => screenWidth.value >= 640 && screenWidth.value < 1024)

/* ===============================
   Filtro por meses
================================= */

const monthFilter = ref(12)

/* ===============================
   Agrupar por mes
================================= */

const groupedByMonth = computed(() => {
  const now = new Date()
  const monthsData: { label: string; value: number }[] = []

  for (let i = monthFilter.value - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.getMonth()
    const year = date.getFullYear()

    const count = adoptionStore.adoptions.filter(a => {
      if (!a.created_at) return false
      const d = new Date(a.created_at)
      return d.getMonth() === month && d.getFullYear() === year
    }).length

    monthsData.push({
      label: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      value: count
    })
  }

  return monthsData
})

/* ===============================
   Crear Chart
================================= */

const createChart = () => {
  if (!canvasRef.value) return

  const ctx = canvasRef.value.getContext("2d")!

  const gradient = ctx.createLinearGradient(0, 0, 0, 350)
  gradient.addColorStop(0, "rgba(34, 211, 238, 0.35)")
  gradient.addColorStop(1, "rgba(34, 211, 238, 0.02)")

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: groupedByMonth.value.map(m => m.label),
      datasets: [
        {
          data: groupedByMonth.value.map(m => m.value),
          borderColor: "#22d3ee",
          backgroundColor: gradient,
          fill: true,
          tension: 0.45,
          pointRadius: isMobile.value ? 3 : 5,
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: isMobile.value ? 5 : 15
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#ffffff",
          bodyColor: "#cbd5e1"
        },
        datalabels: {
          color: "#ffffff",
          anchor: "end",
          align: "top",
          font: {
            size: isMobile.value ? 10 : 12,
            weight: "bold"
          },
          formatter: (value: number) => value > 0 ? value : ""
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#94a3b8",
            font: {
              size: isMobile.value ? 9 : 12
            },
            maxRotation: isMobile.value ? 45 : 0,
            minRotation: 0
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            display: false
          },
          grid: { display: false }
        }
      }
    }
  })
}

/* ===============================
   Actualizar Chart
================================= */

const updateChart = () => {
  if (!chartInstance) return

  chartInstance.data.labels = groupedByMonth.value.map(m => m.label)
  chartInstance.data.datasets[0].data =
    groupedByMonth.value.map(m => m.value)

  chartInstance.update()
}

/* ===============================
   Lifecycle
================================= */

onMounted(async () => {
  await adoptionStore.fetch()
  await nextTick()
  createChart()
})

watch([groupedByMonth, screenWidth], () => {
  if (chartInstance) {
    chartInstance.destroy()
    createChart()
  }
})
</script>
<template>
  <div class="glass-card rounded-xl p-6 h-full">

    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h4 class="text-white font-bold text-lg">
          Adoption Trends
        </h4>
        <p class="text-left text-slate-500 text-xs mx-2 mb-6">
          Successful adoptions over selected period
        </p>
      </div>

      <!-- Filtro meses -->
      <select
        v-model="monthFilter"
        class="bg-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full border border-slate-700"
      >
        <option :value="12">Last 12 Months</option>
        <option :value="6">Last 6 Months</option>
        <option :value="3">Last 3 Months</option>
      </select>
    </div>

    <!-- Chart -->
    <div class="relative h-[250px] sm:h-[300px] lg:h-[350px]">
  <canvas ref="canvasRef"></canvas>
</div>

  </div>
</template>