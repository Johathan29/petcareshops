<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useRolesStore } from "../../stores/roles.store"

const rolesStore = useRolesStore()

onMounted(() => {
  rolesStore.fetchRoles()
})

const roles = computed(() => rolesStore.getAllRoles)
</script>
<template>
  <section
    class="flex-1 overflow-y-auto bg-background-dark p-8 relative flex gap-8"
  >
    <div class="flex-1 max-w-6xl">
      <!-- Header Section -->
      <div class="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div class="flex flex-col gap-2">
          <h1
            class="text-slate-100 text-3xl font-black leading-tight tracking-tight"
          >
            Roles &amp; Permissions
          </h1>
          <p class="text-slate-400 text-base">
            Configure user access levels and granular functional controls across
            the platform.
          </p>
        </div>
        <button
          class="flex items-center gap-2 px-6 h-11 bg-primary text-background-dark rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <span class="material-symbols-outlined">add_box</span>
          <span>Create New Role</span>
        </button>
      </div>
      <!-- Filters & Search Toolbar -->
      <div
        class="bg-surface-dark p-4 rounded-xl border border-border-dark mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4 flex-1">
          <div class="relative w-full max-w-sm">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined"
              >search</span
            >
            <input
              class="w-full rounded-lg bg-background-dark border border-border-dark pl-10 pr-4 py-2.5 text-slate-100 focus:ring-1 focus:ring-primary placeholder-slate-500 text-sm"
              placeholder="Search by role name..."
            />
          </div>
          <div class="h-6 w-px bg-border-dark mx-2"></div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-500 uppercase"
              >Filters:</span
            >
            <div class="flex gap-2">
              <span
                class="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 cursor-pointer"
                >Administrative</span
              >
              <span
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 cursor-pointer transition-colors"
                >Medical</span
              >
              <span
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 cursor-pointer transition-colors"
                >Support</span
              >
            </div>
          </div>
        </div>
        <button
          class="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium"
        >
          <span class="material-symbols-outlined text-xl">tune</span>
          <span>Advanced</span>
        </button>
      </div>
      <!-- Roles Table -->
      <div
        class="bg-surface-dark rounded-xl border border-border-dark overflow-hidden"
      >
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-border-dark/50">
              <th
                class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider"
              >
                Role Name
              </th>
              <th
                class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider"
              >
                Number of Users
              </th>
              <th
                class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider"
              >
                Permissions Summary
              </th>
              <th
                class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider text-right"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#21494a]">
          <tr
  v-for="role in roles"
  :key="role.id"
  class="hover:bg-primary/5 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
>
  <td class="px-6 py-5">
    <div class="flex flex-col">
      <span class="text-slate-100 font-bold">
        {{ role.name }}
      </span>
      <span class="text-slate-500 text-xs">
        {{ role.description }}
      </span>
    </div>
  </td>

  <td class="px-6 py-5 text-slate-300">
    {{ role.users?.[0]?.count ?? 0 }} Users
  </td>

  <td class="px-6 py-5">
    <span
      class="flex items-center gap-1.5 text-xs font-bold"
      :class="role.active ? 'text-primary' : 'text-slate-500'"
    >
      <span
        class="h-2 w-2 rounded-full"
        :class="role.active ? 'bg-primary' : 'bg-slate-600'"
      ></span>
      {{ role.active ? "Active" : "Inactive" }}
    </span>
  </td>

  <td class="px-6 py-5">
    <div class="flex flex-wrap gap-1">
      <span
        v-for="perm in role.permissions_summary"
        :key="perm"
        class="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20"
      >
        {{ perm }}
      </span>
    </div>
  </td>

  <td class="px-6 py-5 text-right">
    <div
      class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        class="p-2 text-slate-400 hover:text-primary transition-colors"
      >
        <span class="material-symbols-outlined">visibility</span>
      </button>

      <button
        class="p-2 text-slate-400 hover:text-primary transition-colors"
      >
        <span class="material-symbols-outlined">edit</span>
      </button>

      <button
        class="p-2 text-slate-400 hover:text-red-400 transition-colors"
      >
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </td>
</tr>
            
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm text-slate-500">Showing 1 to 4 of 24 roles</p>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50"
            disabled=""
          >
            Previous
          </button>
          <button
            class="px-4 py-2 bg-primary text-background-dark font-bold rounded-lg border border-primary shadow-lg shadow-primary/10"
          >
            1
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors"
          >
            2
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors"
          >
            3
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- Slide-out Permissions Panel -->
    <div
      class="w-[450px] sticky top-0 h-[calc(100vh-100px)] bg-surface-dark border border-border-dark rounded-xl flex flex-col shadow-2xl overflow-hidden animate-slide-in"
    >
      <div
        class="p-6 border-b border-border-dark flex items-center justify-between bg-border-dark/20"
      >
        <div class="flex flex-col">
          <h3 class="text-slate-100 text-xl font-bold">Edit Permissions</h3>
          <p class="text-primary text-xs font-bold uppercase tracking-widest">
            Senior Veterinarian
          </p>
        </div>
        <button class="text-slate-400 hover:text-primary transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
        <!-- Module: Adoptions -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl"
              >handshake</span
            >
            <h4 class="text-slate-100 font-bold">Adoptions</h4>
          </div>
          <div class="space-y-4">
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">View Adoption Requests</span>
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300"
                >Process/Approve Adoptions</span
              >
              <input
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">Manage Adoption Fees</span>
              <input
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
          </div>
        </div>
        <!-- Module: Pets -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl"
              >pets</span
            >
            <h4 class="text-slate-100 font-bold">Pets &amp; Records</h4>
          </div>
          <div class="space-y-4">
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">Add New Pet Profiles</span>
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">Edit Pet History</span>
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">Archive Pet Records</span>
              <input
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
          </div>
        </div>
        <!-- Module: Veterinary (Crucial for this role) -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl"
              >medical_information</span
            >
            <h4 class="text-slate-100 font-bold text-primary">
              Veterinary Services
            </h4>
          </div>
          <div class="space-y-4">
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
            >
              <span class="text-sm text-slate-100 font-medium"
                >Create Medical Logs</span
              >
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
            >
              <span class="text-sm text-slate-100 font-medium"
                >Prescribe Medications</span
              >
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
            >
              <span class="text-sm text-slate-100 font-medium"
                >Update Health Status</span
              >
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
          </div>
        </div>
        <!-- Module: Finances -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-xl"
              >account_balance_wallet</span
            >
            <h4 class="text-slate-100 font-bold">Finances</h4>
          </div>
          <div class="space-y-4">
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">View Invoices</span>
              <input
                checked=""
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
            <label
              class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <span class="text-sm text-slate-300">Issue Refunds</span>
              <input
                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                type="checkbox"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="p-6 border-t border-border-dark bg-border-dark/10 flex gap-3">
        <button
          class="flex-1 px-4 py-2.5 bg-primary text-background-dark font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Save Changes
        </button>
        <button
          class="flex-1 px-4 py-2.5 bg-background-dark text-slate-100 border border-border-dark rounded-lg font-bold hover:bg-slate-800 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </section>
</template>
<style lang="css" scoped>
.bg-background-dark {
    --tw-bg-opacity: 1;
    background-color: rgb(15 34 35 / var(--tw-bg-opacity, 1));
}
.bg-surface-dark {
    --tw-bg-opacity:1;

    background-color: rgb(22 44 45 / var(--tw-bg-opacity, 1));
}
.text-primary {
    --tw-text-opacity: 1;
    color: rgb(5 201 204 / var(--tw-text-opacity, 1));
}
.bg-primary\/10 {
    background-color: rgb(5 201 204 / 0.1);
}
.bg-border-dark\/50 {
    background-color: rgb(33 73 74 / 0.5);
}
.border-border-dark {
    --tw-border-opacity: 1;
    border-color: rgb(33 73 74 / var(--tw-border-opacity, 1));
}
</style>