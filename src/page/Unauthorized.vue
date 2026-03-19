<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const goBack = () => {
  router.back()
}

const goHome = () => {
  const redirectPath = getRedirectByRole()
  router.push(redirectPath)
}

const getRedirectByRole = () => {
  const role = authStore.role
  
  switch (role) {
    case 'admin':
      return '/dashboard/home'
    case 'doctor':
      return '/dashboard/doctor'
    case 'user':
      return '/profile'
    default:
      return '/'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    <div class="max-w-md w-full">
      <!-- Card -->
      <div class="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <!-- Icon -->
        <div class="relative mb-6">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/20">
            <span class="material-symbols-outlined text-5xl text-red-400">
              block
            </span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="relative text-3xl font-bold text-white mb-3">
          Acceso Denegado
        </h1>

        <!-- Description -->
        <p class="relative text-slate-400 mb-6">
          No tienes permisos para acceder a esta página. 
          Tu rol actual no te permite ver este contenido.
        </p>

        <!-- Role info -->
        <div class="relative mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="material-symbols-outlined text-cyan-400 text-sm">
              badge
            </span>
            <span class="text-slate-400 text-sm">Tu rol actual:</span>
          </div>
          <span class="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
            {{ authStore.role || 'Sin rol' }}
          </span>
        </div>

        <!-- Actions -->
        <div class="relative flex flex-col sm:flex-row gap-3">
          <button
            @click="goBack"
            class="flex-1 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Volver
          </button>
          
          <button
            @click="goHome"
            class="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <span class="material-symbols-outlined text-sm">
              home
            </span>
            Ir al Inicio
          </button>
        </div>

        <!-- Help text -->
        <p class="relative mt-6 text-xs text-slate-500">
          Si crees que esto es un error, contacta al administrador del sistema.
        </p>
      </div>

      <!-- Additional info -->
      <div class="mt-6 text-center">
        <p class="text-slate-500 text-sm">
          ¿Necesitas ayuda?
          <a href="/contacts" class="text-cyan-400 hover:text-cyan-300 transition-colors">
            Contáctanos
          </a>
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
