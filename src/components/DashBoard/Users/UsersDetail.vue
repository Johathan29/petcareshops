<script setup lang="ts">
import { computed, reactive, watch, onMounted } from "vue";
import { useAuthStore } from "../../../stores/auth.store";
import { useRolesStore } from "../../../stores/roles.store";
import { supabase } from "../../../config/supabase";
import { useDoctorStore } from "../../../stores/doctor.store";

const doctorStore = useDoctorStore();
const authStore = useAuthStore();
const rolesStore = useRolesStore();

const props = defineProps<{
  user: any
}>()

const user = computed(() => props.user)

onMounted(async () => {
   await doctorStore.fetch()
});
const doctorData = computed(() => {
 if (!props.user) return;
console.log(doctorStore.doctors.find(item=> item.idUser===props.user.id))
  return doctorStore.doctors.find(
    d => d.idUser === props.user.id
  ) || null;
});


const form = reactive({
  first_name: "",
  email: "",
  role: "",
  permissions: [] as string[],
});

const roleName = computed(() => {
  return rolesStore.roles.find(r => r.id === form.role)?.name || "No Role";
});

const updateUser = async () => {
  if (!user.value) return;

  await supabase
    .from("profiles")
    .update({
      first_name: form.first_name,
      role: form.role,
      permissions: form.permissions,
    })
    .eq("id", props.user.id);

  await authStore.fetchUsers();
};

const deleteUser = async () => {
  if (!user.value) return;

  await supabase.from("profiles").delete().eq("id", props.user.id);

  authStore.selectedUser = null;
  await authStore.fetchUsers();
};

const togglePermission = (perm: string) => {
  if (form.permissions.includes(perm)) {
    form.permissions = form.permissions.filter(p => p !== perm);
  } else {
    form.permissions.push(perm);
  }
};
const isDoctor = computed(() => {
  return props.user?.role === "doctor";
});

const displayName = computed(() => {
  if (isDoctor.value && doctorData.value) {
    return `Dr. ${doctorData.value.first_name} ${doctorData.value.last_name}`;
  }

  return props.user?.first_name;
});
const displaySpecialty = computed(() => {
  if (isDoctor.value && doctorData.value?.specialty) {
    return doctorData.value.specialty;
  }

  return null;
});
const displayRole = computed(async() => {
  const roles= await rolesStore.fetch()
  roles.find(item=> item.id===props.user?.role)
  return props.user?.role?.toUpperCase() || "";
});
/* ===========================
   CATEGORÍAS DE PERMISOS
=========================== */

const petPermissions = [
  { title: "view_pets", description: "Access pet profiles and history" },
  { title: "edit_pets", description: "Modify existing pet information" },
  { title: "add_records", description: "Create new medical or adoption entries" },
];

const operationPermissions = [
  { title: "manage_appointments", description: "Schedule and modify visits" },
  { title: "inventory_access", description: "Manage medical supplies" },
  { title: "delete_profiles", description: "Hard-delete records from system" },
];

const adminPermissions = [
  { title: "financial_access", description: "View billing and donations" },
  { title: "system_settings", description: "Global configuration access" },
  { title: "user_management", description: "Create and modify other users" },
];
</script>

<template>
  <section
    v-if="user"
    class="flex-1 flex flex-col overflow-auto bg-card-dark/40"
  >
    <!-- HEADER -->
   <div class="flex items-center justify-between mb-8 bg-white/5 p-6 rounded-xl border border-white/5">
    <div class="flex items-center gap-6">
        <div class="relative">
            <img class="size-20 rounded-2xl object-cover border-4 border-primary/20" data-alt="Profile of Sarah Smith in detail view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWOAp4eHz_NUUfPIx-Ky8NKAO6u8L5hMvlcUSFbiB_-Mg_ENZaRknhvVXAV2CBXcLnp4XY2Lbxahw2jmuGYwbEHmITYt967DdXoaqMxdHywXU0vba5JBmFYxUdd551cZolpEHGl6NbjfvizHbgycIjsiIkOD0gWcfOp69_2CVk27LYTzXb49HVZH8FECc8fjgJSJTlR4LzD1dT-eIwIgkcj5jbiVue2g8Lmk74fsAaBg_vx_0heRbA7KV52BcD3PZMIzSSg5IvuA">
            <div class="absolute -bottom-1 -right-1 size-6 bg-primary rounded-full flex items-center justify-center border-4 border-surface-dark">
                <span class="material-symbols-outlined text-[12px] text-background-dark font-bold">check</span>
            </div>
        </div>
        <div>
            <h2 class="text-2xl font-black text-white">{{ displayName }}</h2>
            <p class="text-slate-400"> {{displaySpecialty }} </p>
            <div class="flex items-center gap-3 mt-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-background-dark uppercase">{{ displayRole }}</span>
                <span class="text-xs text-slate-500">Added on March 12, 2024</span>
            </div>
        </div>
    </div>
    <div class="flex gap-3">
        <button class="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all border border-white/10">
            <span class="material-symbols-outlined">mail</span>
        </button>
        <button class="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition-all border border-white/10">
            <span class="material-symbols-outlined">more_vert</span>
        </button>
    </div>


      <!-- ACTIONS -->
      <div class="flex gap-3">
        <button
          @click="deleteUser"
          class="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- PERMISSIONS -->
    <div class="flex-1  p-8 custom-scrollbar">
        <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl">pets</span>
            <h4 class="text-sm font-bold uppercase tracking-widest text-slate-500"> Pet Management </h4>
        </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label
          v-for="perm in petPermissions"
          
          class="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
        >
        <div class="flex flex-col">
            <span class="text-sm font-bold text-white capitalize">
            {{ perm?.title.replace("_", " ") }}
          </span>
          <span class="text-[10px] text-slate-500">{{perm.description}}</span>
        </div>
          
          <input
            type="checkbox"
            :checked="form.permissions.includes(perm)"
            @change="togglePermission(perm.title)"
            class="rounded border-white/20 bg-transparent text-primary size-5"
          />
        </label>
      </div>
    </div>
<div class="flex-1 p-8 custom-scrollbar">
        <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl">event_available</span>
            <h4 class="text-sm font-bold uppercase tracking-widest text-slate-500"> Operations </h4>
        </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label
          v-for="perm in operationPermissions"
          
          class="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
        >
        <div class="flex flex-col">
            <span class="text-sm font-bold text-white capitalize">
            {{ perm?.title.replace("_", " ") }}
          </span>
          <span class="text-[10px] text-slate-500">{{perm.description}}</span>
        </div>
          
          <input
            type="checkbox"
            :checked="form.permissions.includes(perm)"
            @change="togglePermission(perm.title)"
            class="rounded border-white/20 bg-transparent text-primary size-5"
          />
        </label>
      </div>
    </div>
    <div class="flex-1  p-8 custom-scrollbar">
        <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl">admin_panel_settings</span>
            <h4 class="text-sm font-bold uppercase tracking-widest text-slate-500">  Administrative </h4>
        </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <label
          v-for="perm in adminPermissions"
          
          class="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
        >
        <div class="flex flex-col">
            <span class="text-sm font-bold text-white capitalize">
            {{ perm?.title.replace("_", " ") }}
          </span>
          <span class="text-[10px] text-slate-500">{{perm.description}}</span>
        </div>
          
          <input
            type="checkbox"
            :checked="form.permissions.includes(perm)"
            @change="togglePermission(perm.title)"
            class="rounded border-white/20 bg-transparent text-primary size-5"
          />
        </label>
      </div>
    </div>
    <!-- FOOTER -->
    <div
      class="p-6 border-t border-white/5 bg-background-dark/50 flex justify-end gap-4"
    >
      <button
        @click="authStore.selectedUser = null"
        class="px-6 py-2 rounded-lg text-slate-300 font-bold text-sm"
      >
        Cancel
      </button>

      <button
        @click="updateUser"
        class="px-8 py-2.5 rounded-lg bg-primary text-background-dark font-bold text-sm shadow-xl hover:scale-[1.02] transition-all"
      >
        Save Changes
      </button>
    </div>
  </section>

  <!-- EMPTY STATE -->
  <section
    v-else
    class="flex-1 flex items-center justify-center text-slate-500"
  >
    Select a user to view details
  </section>
</template>
