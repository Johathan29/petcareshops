<script setup lang="ts">
import Sidebar from '../components/DashBoard/Sidebar.vue';

import { ref, computed } from "vue";

interface SessionUser {
  data: {
    user: {
      app_metadata: {
        role: string;
      };
      user_metadata: {
        first_name: string;
        role: string;
      };
    };
  };
}

const rawUser = sessionStorage.getItem("user");

const parsedUser = ref<SessionUser | null>(
  rawUser ? JSON.parse(rawUser) : null,
);

const firstName = computed(
  () => parsedUser.value?.data.user.user_metadata.first_name ?? "User",
);

const role = computed(
  () => parsedUser.value?.data.user.app_metadata.role ?? "Guest",
);

</script>

<template>
  <div class="flex h-screen bg-[#102022]">
     <sidebar :firstName="firstName" :role="role" />

    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <header
        class="h-16 border-b border-white/10 px-8 flex items-center justify-between shrink-0 bg-background-dark/50 backdrop-blur-md z-10"
      >
        <div class="flex items-center gap-6">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            Welcome back, <span class="text-primary">{{firstName}}</span>
          </h2>
          <div class="h-6 w-[1px] bg-white/10"></div>
          <div class="flex items-center gap-2 text-slate-400">
            <span class="material-symbols-outlined text-[20px]">schedule</span>
            <span class="text-sm font-mono tracking-wider" id="digital-clock"
              >09:42:15 AM</span
            >
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative group">
            <input
              class="bg-white/5 border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80"
              placeholder="Search data..."
              type="text"
            />
            <span
              class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-500"
              >search</span
            >
          </div>
          <div class="flex items-center gap-2">
            <button
              class="size-9 rounded-lg flex items-center justify-center glass-card text-slate-400 hover:text-primary transition-colors relative"
            >
              <span class="material-symbols-outlined">notifications</span>
              <span
                class="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-background-dark"
              ></span>
            </button>
            <button
              class="size-9 rounded-lg flex items-center justify-center glass-card text-slate-400 hover:text-primary transition-colors"
            >
              <span class="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </header>
      <div class="constainer  mx-5 px-2 py-4">
        <router-view />
      </div>
    </main>
  </div>
</template>