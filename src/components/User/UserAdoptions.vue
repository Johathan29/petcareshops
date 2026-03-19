<script setup lang="ts">
import { computed } from "vue"

interface Adoption {
  id: string
  user_id: string
  animal_id: string
  status: "pending" | "approved" | "rejected" | "completed"
  created_at?: string
  animals?: {
    id: string
    name: string
    type: string
    breed?: string
    age?: number
    photo_url?: string
  }
}

interface Props {
  adoptions: Adoption[]
}

const props = defineProps<Props>()

// Formatear fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Badge de estado
const statusBadge = (status: string) => {
  const badges: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }
  return badges[status] || badges.pending
}

const statusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
    completed: "Completada",
  }
  return labels[status] || status
}

// Adopciones activas
const activeAdoptions = computed(() => {
  return props.adoptions.filter((a) =>
    ["pending", "approved"].includes(a.status)
  )
})

// Historial
const historyAdoptions = computed(() => {
  return props.adoptions.filter((a) =>
    ["rejected", "completed"].includes(a.status)
  )
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-cyan-400">pets</span>
        Mis Adopciones
      </h2>
      <a
        href="/adoption"
        class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25"
      >
        <span class="material-symbols-outlined text-sm">paw_print</span>
        Ver Mascotas
      </a>
    </div>

    <!-- Empty state -->
    <div
      v-if="adoptions.length === 0"
      class="text-center py-12"
    >
      <span class="material-symbols-outlined text-4xl text-slate-600">
        paw_print
      </span>
      <p class="text-slate-400 mt-4">No tienes solicitudes de adopción</p>
      <a
        href="/adoption"
        class="mt-4 inline-block px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
      >
        Ver mascotas disponibles
      </a>
    </div>

    <!-- Active adoptions -->
    <div v-if="activeAdoptions.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-green-400">schedule</span>
        Solicitudes Activas
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="adoption in activeAdoptions"
          :key="adoption.id"
          class="glass-card rounded-xl p-4 border border-slate-700 hover:border-cyan-500/30 transition-all"
        >
          <div class="flex items-start gap-4">
            <!-- Photo -->
            <div
              v-if="adoption.animals?.photo_url"
              class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                :src="adoption.animals.photo_url"
                :alt="adoption.animals.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0"
            >
              <span class="material-symbols-outlined text-white text-4xl">pets</span>
            </div>

            <!-- Info -->
            <div class="flex-1">
              <h4 class="text-white font-bold text-lg">
                {{ adoption.animals?.name || "Mascota" }}
              </h4>
              <p class="text-slate-400 text-sm">
                {{ adoption.animals?.type }}
                <span v-if="adoption.animals?.breed">- {{ adoption.animals.breed }}</span>
              </p>
              <p class="text-slate-500 text-xs mt-1">
                {{ formatDate(adoption.created_at || "") }}
              </p>
            </div>

            <!-- Status -->
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0"
              :class="statusBadge(adoption.status)"
            >
              {{ statusLabel(adoption.status) }}
            </span>
          </div>

          <!-- Progress info -->
          <div class="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <div class="flex items-center gap-2 text-sm">
              <span class="material-symbols-outlined text-cyan-400 text-sm">info</span>
              <span class="text-slate-300">
                {{ adoption.status === 'pending'
                  ? 'Tu solicitud está siendo revisada'
                  : 'Solicitud aprobada - En proceso de adopción'
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History -->
    <div v-if="historyAdoptions.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <span class="material-symbols-outlined text-slate-400">history</span>
        Historial
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="adoption in historyAdoptions"
          :key="adoption.id"
          class="glass-card rounded-xl p-4 border border-slate-700 opacity-75"
        >
          <div class="flex items-start gap-4">
            <!-- Photo -->
            <div
              v-if="adoption.animals?.photo_url"
              class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
            >
              <img
                :src="adoption.animals.photo_url"
                :alt="adoption.animals.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-else
              class="w-24 h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0"
            >
              <span class="material-symbols-outlined text-white text-4xl">pets</span>
            </div>

            <!-- Info -->
            <div class="flex-1">
              <h4 class="text-white font-bold text-lg">
                {{ adoption.animals?.name || "Mascota" }}
              </h4>
              <p class="text-slate-400 text-sm">
                {{ adoption.animals?.type }}
                <span v-if="adoption.animals?.breed">- {{ adoption.animals.breed }}</span>
              </p>
              <p class="text-slate-500 text-xs mt-1">
                {{ formatDate(adoption.created_at || "") }}
              </p>
            </div>

            <!-- Status -->
            <span
              class="inline-flex px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0"
              :class="statusBadge(adoption.status)"
            >
              {{ statusLabel(adoption.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(10px);
}
</style>
