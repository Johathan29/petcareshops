<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useNotificationStore } from "../../stores/notification.store"
import { useAuthStore } from "../../stores/auth.store"

const notificationStore = useNotificationStore()
const authStore = useAuthStore()

const showDropdown = ref(false)
const showAll = ref(false)

// Notificaciones visibles
const visibleNotifications = computed(() => {
  if (showAll.value) {
    return notificationStore.notifications.slice(0, 10)
  }
  return notificationStore.unreadNotifications.slice(0, 5)
})

// Tiene más notificaciones
const hasMore = computed(() => {
  if (showAll.value) {
    return notificationStore.notifications.length > 10
  }
  return notificationStore.unreadNotifications.length > 5
})

// Formatear fecha
const timeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Ahora mismo"
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)}d`
  
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  })
}

// Icono por tipo
const typeIcon = (type: string) => {
  const icons: Record<string, string> = {
    info: "info",
    success: "check_circle",
    warning: "warning",
    error: "error",
  }
  return icons[type] || "notifications"
}

// Color por tipo
const typeColor = (type: string) => {
  const colors: Record<string, string> = {
    info: "text-blue-400 bg-blue-500/10",
    success: "text-green-400 bg-green-500/10",
    warning: "text-yellow-400 bg-yellow-500/10",
    error: "text-red-400 bg-red-500/10",
  }
  return colors[type] || colors.info
}

// Marcar como leída
const handleMarkAsRead = async (notificationId: string) => {
  await notificationStore.markAsRead(notificationId)
}

// Marcar todas como leídas
const handleMarkAllAsRead = async () => {
  if (authStore.user) {
    await notificationStore.markAllAsRead(authStore.user.id)
  }
}

// Eliminar notificación
const handleDelete = async (notificationId: string, event: Event) => {
  event.stopPropagation()
  await notificationStore.delete(notificationId)
}

// Toggle dropdown
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value && authStore.user) {
    notificationStore.fetch(authStore.user.id)
  }
}

// Solicitar permisos de notificación
const requestNotificationPermission = async () => {
  await notificationStore.requestPermission()
}

onMounted(() => {
  if (authStore.user) {
    notificationStore.fetch(authStore.user.id)
    notificationStore.subscribe(authStore.user.id)
  }
})

onUnmounted(() => {
  notificationStore.unsubscribe()
})
</script>

<template>
  <div class="relative">
    <!-- Bell Button -->
    <button
      @click="toggleDropdown"
      class="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
    >
      <span class="material-symbols-outlined text-slate-400">notifications</span>
      
      <!-- Badge -->
      <span
        v-if="notificationStore.unreadCount > 0"
        class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center animate-pulse"
      >
        {{ notificationStore.unreadCount > 9 ? '9+' : notificationStore.unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-96 glass-card rounded-xl shadow-2xl border border-slate-700 overflow-hidden z-50"
      v-motion
      :initial="{ opacity: 0, y: -10, scale: 0.95 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :leave="{ opacity: 0, y: -10, scale: 0.95 }"
    >
      <!-- Header -->
      <div class="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 class="text-white font-semibold flex items-center gap-2">
          <span class="material-symbols-outlined text-cyan-400 text-sm">notifications</span>
          Notificaciones
        </h3>
        <div class="flex items-center gap-2">
          <button
            @click="handleMarkAllAsRead"
            class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Marcar todas como leídas
          </button>
          <button
            @click="showDropdown = false"
            class="p-1 rounded hover:bg-slate-700 transition-colors"
          >
            <span class="material-symbols-outlined text-slate-400 text-sm">close</span>
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="max-h-96 overflow-y-auto custom-scrollbar">
        <!-- Empty state -->
        <div
          v-if="notificationStore.notifications.length === 0"
          class="text-center py-8"
        >
          <span class="material-symbols-outlined text-4xl text-slate-600">
            notifications_none
          </span>
          <p class="text-slate-400 text-sm mt-2">No hay notificaciones</p>
        </div>

        <!-- Notification items -->
        <div
          v-for="notification in visibleNotifications"
          :key="notification.id"
          @click="handleMarkAsRead(notification.id)"
          class="p-4 border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors cursor-pointer"
          :class="!notification.read ? 'bg-slate-800/30' : ''"
        >
          <div class="flex items-start gap-3">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              :class="typeColor(notification.type)"
            >
              <span class="material-symbols-outlined text-sm">
                {{ typeIcon(notification.type) }}
              </span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2 mb-1">
                <h4 class="text-white font-medium text-sm truncate">
                  {{ notification.title }}
                </h4>
                <span class="text-slate-500 text-xs whitespace-nowrap">
                  {{ timeAgo(notification.created_at) }}
                </span>
              </div>
              <p class="text-slate-400 text-xs line-clamp-2">
                {{ notification.message }}
              </p>
            </div>

            <!-- Delete button -->
            <button
              @click="handleDelete(notification.id, $event)"
              class="p-1 rounded hover:bg-slate-700 transition-colors flex-shrink-0"
            >
              <span class="material-symbols-outlined text-slate-400 text-sm">delete</span>
            </button>
          </div>

          <!-- Unread indicator -->
          <div
            v-if="!notification.read"
            class="mt-2 flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
            <span class="text-cyan-400 text-xs">Nuevo</span>
          </div>
        </div>

        <!-- Show more -->
        <div v-if="hasMore" class="p-4 text-center border-t border-slate-700">
          <button
            @click="showAll = !showAll"
            class="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            {{ showAll ? "Ver menos" : "Ver más notificaciones" }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-700 bg-slate-800/50">
        <button
          @click="requestNotificationPermission"
          class="w-full px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined text-sm">campaign</span>
          Activar notificaciones push
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.8);
  border-radius: 10px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
