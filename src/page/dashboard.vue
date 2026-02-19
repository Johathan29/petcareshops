<script setup lang="ts">
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
    <aside
      class="w-64 bg-background-dark border-r border-white/10 flex flex-col shrink-0 h-screen"
    >
      <div class="p-6 flex items-center gap-3">
        <div
          class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
        >
          <span class="material-symbols-outlined text-background-dark font-bold"
            >pets</span
          >
        </div>
        <div>
          <h1 class="text-white font-bold text-lg leading-none">PetAdmin</h1>
          <p
            class="text-primary text-[10px] uppercase tracking-widest font-semibold mt-1"
          >
            Management Hub
          </p>
        </div>
      </div>
      <nav class="flex-1 px-4 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div
          class="text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2"
        >
          Core Dashboard
        </div>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg active-sidebar-item text-sm font-medium"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]">dashboard</span>
          Overview
        </router-link>
        <div
          class="text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6"
        >
          Management
        </div>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]">favorite</span>
          Adoptions
        </router-link>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]">pets</span>
          Pets Inventory
        </router-link>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="/users"
        >
          <span class="material-symbols-outlined text-[22px]">group</span>
          Users &amp; Clients
        </router-link>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]"
            >shield_person</span
          >
          Roles &amp; Permissions
        </router-link>
        <div
          class="text-slate-500 text-[11px] font-bold uppercase tracking-wider px-3 mb-2 mt-6"
        >
          Veterinary
        </div>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]">stethoscope</span>
          Doctors
        </router-link>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]"
            >medical_services</span
          >
          Services
        </router-link>
        <router-link
          class="flex items-center gap-3 px-3 py-3 rounded-lg sidebar-item text-sm font-medium text-slate-400"
          to="#"
        >
          <span class="material-symbols-outlined text-[22px]"
            >calendar_month</span
          >
          Appointments
        </router-link>
      </nav>
      <div class="p-4 border-t border-white/5">
        <div class="glass-card rounded-xl p-3 flex items-center gap-3">
          <div
            class="size-9 rounded-full bg-cover bg-center"
            data-alt="Administrator profile picture"
            style="
              background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDrLV4jXlEIbjxqjHJmcTg8yzeNDQhxeCmviHtqY6iw5vv6RpS2KCsGDA8jj2hyPBDx6biAxugzGBSePO6cN4AC0otovSPvURFNII-uOZSRhdJw6Sc2FfqdVoICGZF4ek8P_N9M69qn2W2ZpZpu6dvg3gmVuNbCGbafTMEgavxQW-9baWOEVD6eRUJlHADo3O5qn0hZxCZ_44ENC_5I60HozgU-SI-26wCxUYzrwvKz3uwgNNYZCYLY9CnXWokFsiN-ckLnniePdw&quot;);
            "
          ></div>
          <div class="flex-1 overflow-hidden">
            <p class="text-xs font-bold text-white truncate">{{ firstName }}</p>
            <p class="text-[10px] text-slate-500 truncate">{{ role }}</p>
          </div>
          <button class="text-slate-400 hover:text-white transition-colors">
            <span class="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col h-screen overflow-hidden">
      <header
        class="h-16 border-b border-white/10 px-8 flex items-center justify-between shrink-0 bg-background-dark/50 backdrop-blur-md z-10"
      >
        <div class="flex items-center gap-6">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            Welcome back, <span class="text-primary">Alex</span>
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
      <div>
        <router-view />
      </div>
    </main>
  </div>
</template>
<style>
body {
  font-family: "Inter", sans-serif;
}
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}
.glass-card:hover {
  border-color: #13daec;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 20px rgba(19, 218, 236, 0.1);
}
.sidebar-item {
  transition: all 0.2s ease;
}
.sidebar-item:hover {
  background: rgba(19, 218, 236, 0.1);
  color: #13daec;
}
.active-sidebar-item {
  background: rgba(19, 218, 236, 0.15);
  color: #13daec;
  border-right: 3px solid #13daec;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #102022;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #13daec33;
  border-radius: 10px;
}
</style>
