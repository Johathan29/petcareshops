<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const props = defineProps<{
  errorCode?: number
  errorMessage?: string
}>()

const errorCode = computed(() => props.errorCode || (route.query.code as string) || 500)
const errorMessage = computed(() => props.errorMessage || (route.query.message as string) || 'Ha ocurrido un error inesperado')

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}

const reload = () => {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    <div class="max-w-lg w-full">
      <!-- Card -->
      <div class="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

        <!-- Icon -->
        <div class="relative mb-6">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500/20">
            <span class="material-symbols-outlined text-5xl text-orange-400">
              error
            </span>
          </div>
        </div>

        <!-- Error code -->
        <div class="relative mb-4">
          <span class="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            {{ errorCode }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="relative text-2xl font-bold text-white mb-3">
          ¡Ups! Algo salió mal
        </h1>

        <!-- Description -->
        <p class="relative text-slate-400 mb-6">
          {{ errorMessage }}
        </p>

        <!-- Error details -->
        <div class="relative mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-left">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-orange-400 text-sm mt-0.5">
              info
            </span>
            <div class="text-sm text-slate-400">
              <p class="mb-2 font-medium text-slate-300">Posibles causas:</p>
              <ul class="space-y-1 text-xs">
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-orange-400"></span>
                  Problema de conexión con el servidor
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-orange-400"></span>
                  Datos inválidos o corruptos
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-orange-400"></span>
                  Servicio temporalmente no disponible
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="relative grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            @click="goBack"
            class="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <span class="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Volver
          </button>
          
          <button
            @click="reload"
            class="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <span class="material-symbols-outlined text-sm">
              refresh
            </span>
            Recargar
          </button>
          
          <button
            @click="goHome"
            class="px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-500/25"
          >
            <span class="material-symbols-outlined text-sm">
              home
            </span>
            Inicio
          </button>
        </div>

        <!-- Support -->
        <div class="relative p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
          <div class="flex items-center gap-3 mb-3">
            <span class="material-symbols-outlined text-orange-400">
              support_agent
            </span>
            <span class="text-white font-medium text-sm">¿Necesitas ayuda?</span>
          </div>
          <p class="text-slate-400 text-xs mb-3">
            Si el problema persiste, nuestro equipo de soporte está aquí para ayudarte.
          </p>
          <a
            href="/contacts"
            class="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors text-sm font-medium"
          >
            Contactar soporte
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      <!-- Technical details (dev mode) -->
      <div class="mt-6 text-center">
        <p class="text-slate-600 text-xs">
          Error ID: <span class="font-mono">{{ errorCode }}-{{ Date.now() }}</span>
        </p>
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
