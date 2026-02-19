<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "../../../stores/auth.store";
import { useRolesStore } from "../../../stores/roles.store";
import { supabase } from "../../../config/supabase";
import UsersDetail from "./UsersDetail.vue";

const store = useAuthStore();
const roles = useRolesStore();

onMounted(async () => {
  await store.fetchUsers();
  await roles.fetch();
   supabase
    .channel('profiles-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'profiles' },
      (payload) => {
        store.fetchUsers()
      }
    )
    .subscribe()
});

const setFilter = (roleId: string | "all") => {
  store.filter = roleId;
};

const isActive = (roleId: string | "all") => {
  return store.filter === roleId;
};

const getRoleName = (roleId: string) => {
  const role = roles.roles.find((r) => r.id === roleId);
  return role ? role.name : "No Role";
};
const roleColor = (roleName: string) => {
  switch (roleName.toLowerCase()) {
    case 'admin':
      return 'bg-red-500/20 text-red-400'
    case 'doctor':
      return 'bg-primary/20 text-primary'
    default:
      return 'bg-white/5 text-slate-400'
  }
}
const now = ref(new Date())

const interval = setInterval(() => {
  now.value = new Date()
}, 1000)

onUnmounted(() => {
  clearInterval(interval)
})

const getConnectionTime = (lastSeen: string) => {
  if (!lastSeen) return '-'

  const diff = now.value.getTime() - new Date(lastSeen).getTime()
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return `${minutes}m ${seconds}s`
}
</script>

<template>
    <section class="flex gap-6 ">
<aside
    class="w-[400px] flex flex-col border-r border-white/5 bg-background-dark/30"
  >
    <!-- Header -->
    <div class="p-6 border-b border-white/5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-white">Users</h3>
        <span
          class="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider"
        >
          {{ store.users.length }} Total
        </span>
      </div>

      <!-- Filters -->
      <div class="flex gap-2">
        <!-- ALL -->
        <button
          @click="setFilter('all')"
          :class="[
            'flex-1 py-1.5 text-xs font-semibold rounded transition-colors',
            isActive('all')
              ? 'bg-primary text-background-dark'
              : 'bg-white/5 text-slate-400 hover:bg-white/10',
          ]"
        >
          All
        </button>

        <!-- ROLES DINÁMICOS -->
        <button
          v-for="role in roles.roles"
          :key="role.id"
          @click="setFilter(role.id)"
          :class="[
            'flex-1 py-1.5 text-xs font-semibold rounded transition-colors',
            isActive(role.id)
              ? 'bg-primary text-background-dark'
              : 'bg-white/5 text-slate-400 hover:bg-white/10',
          ]"
        >
          {{ role.name }}
        </button>
      </div>
    </div>

    <!-- Users -->
    <div class="flex-1 overflow-y-auto custom-scrollbar divide-y-[0.1rem] divide-white/5 divide-x-0">
      <div
        v-for="user in store.filteredUsers"
        @click="store.selectedUser = user"
        class="flex items-center gap-4 p-4 border-l-4 cursor-pointer border-transparent hover:bg-white/5   "
      >
        <img
          class="size-11 rounded-lg object-cover"
          :src="'https://ui-avatars.com/api/?name=' + user.first_name"
        />

        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-white truncate">
            {{ user.first_name }}
          </p>
          <p class="text-xs text-slate-500 truncate">
            {{ user.email }}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <span
  :class="[
    'text-[10px] px-1.5 py-0.5 rounded',
    roleColor(getRoleName(user.role))
  ]"
>
  {{ getRoleName(user.role) }}
</span>
  <!-- ONLINE STATUS -->
  <span
    v-if="user.is_online"
    class="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400"
  >
    Online • {{ getConnectionTime(user.last_seen) }}
  </span>

  <span
    v-else
    class="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
  >
    Last seen: {{ new Date(user.last_seen).toLocaleString() }}
  </span>
          </div>
        </div>
      </div>
    </div>
  </aside>
<UsersDetail></UsersDetail>
</section>
  
</template>
