<script setup lang="ts">

import ModalSuccess from "../../components/UI/SuccessModal.vue"
import ModalError from "../../components/UI/ErrorModal.vue"
import PermissionsAside from "../../components/DashBoard/Roles/PermissionsAside.vue"
import CreateRoles from "../../components/DashBoard/Roles/createRoles.vue"
import { useRolesStore } from '../../stores/roles.store'
import { ref, onMounted, watch, computed } from "vue";
const rolesStore = useRolesStore()

const showCreate = ref(false)
const selectedRole = ref<any>(null)

const editedPermissions = ref<string[]>([])

onMounted(() => {

  rolesStore.fetchRoles()
  rolesStore.fetchPermissions()

})

const openRole = async (role: any) => {

  selectedRole.value = role

  await rolesStore.getRolePermissions(role.id)

}

watch(() => rolesStore.rolePermissions, (data) => {

  if (!data) return

  editedPermissions.value =
    data.map((p: any) => p.permission.id)

})

const toggleEditPermission = (id: string) => {

  if (editedPermissions.value.includes(id)) {

    editedPermissions.value =
      editedPermissions.value.filter(p => p !== id)

  } else {

    editedPermissions.value.push(id)

  }

}
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const modalMessage = ref("")

const savePermissions = async () => {

  if (!selectedRole.value) return

  try {

    await rolesStore.updateRolePermissions(
      selectedRole.value.id,
      editedPermissions.value
    )

    modalMessage.value = "Permissions updated successfully"
    showSuccessModal.value = true

    setTimeout(() => {
      showSuccessModal.value = false
      closeEdit()
    }, 1800)

  } catch (error) {

    modalMessage.value = "Error updating permissions"
    showErrorModal.value = true

  }

}
const refreshRoles = () => {
  rolesStore.fetchRoles()
}

const type = ref("all")

const roles = computed(() => {

  const allRoles = rolesStore.getAllRoles ?? []

  if (type.value === "all") return allRoles

  return allRoles.filter(role =>
    role.name?.toLowerCase().includes(type.value)
  )

})

const setFilter = (value: string) => {
  type.value = value
}

const hasData = computed(() => roles.value.length > 0)

const showEdit = ref(false)


const openEdit = async (role: any) => {

  selectedRole.value = role
  showEdit.value = true

  await rolesStore.getRolePermissions(role.id)

  editedPermissions.value =
    rolesStore.rolePermissions.map(p => p.permission.id)

}

const closeEdit = () => {
  showEdit.value = false
}



/* Agrupar permisos por módulo */

const permissionsByModule = computed(() => {

  const modules: any = {}

  rolesStore.permissions.forEach((perm: any) => {

    if (!modules[perm.module]) {
      modules[perm.module] = []
    }

    modules[perm.module].push(perm)

  })

  return modules

})
</script>
<template>
  <section class="flex-1 bg-background-dark p-8 relative flex gap-8 overflow-y-auto custom-scrollbar overflow-x-hidden ">
    <div class="flex-1 max-w-6xl">
      <!-- Header Section -->
      <div class="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-slate-100 text-3xl text-left font-black leading-tight tracking-tight">
            Roles &amp; Permissions
          </h1>
          <p class="text-slate-400 text-base">
            Configure user access levels and granular functional controls across
            the platform.
          </p>
        </div>
        <button @click="showCreate = true"
          class="flex items-center gap-2 px-6 h-11 bg-primary text-background-dark rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined">add_box</span>
          <span>Create New Role</span>
        </button>
      </div>
      <!-- Filters & Search Toolbar -->
      <div
        class="bg-surface-dark p-4 rounded-xl border border-border-dark mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4 flex-1">
          <div class="relative w-full max-w-sm">
            <span
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
            <input
              class="w-full rounded-lg bg-background-dark border border-border-dark pl-10 pr-4 py-2.5 text-slate-100 focus:ring-1 focus:ring-primary placeholder-slate-500 text-sm"
              placeholder="Search by role name..." />
          </div>
          <div class="h-6 w-px bg-border-dark mx-2"></div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-500 uppercase">Filters:</span>
            <div class="flex gap-2">

              <button @click="setFilter('all')" :class="type === 'all' ? 'text-primary border-primary/30' : ''"
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 transition-colors">

                All

              </button>

              <button @click="setFilter('admin')" :class="type === 'admin' ? 'text-primary border-primary/30' : ''"
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 transition-colors">

                Admin

              </button>

              <button @click="setFilter('users')" :class="type === 'users' ? 'text-primary border-primary/30' : ''"
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 transition-colors">

                Users

              </button>

              <button @click="setFilter('doctors')" :class="type === 'doctors' ? 'text-primary border-primary/30' : ''"
                class="px-3 py-1.5 rounded-full bg-background-dark text-slate-400 text-xs font-medium border border-border-dark hover:border-primary/50 transition-colors">

                Doctors

              </button>

            </div>
          </div>
        </div>
        <button
          class="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium">
          <span class="material-symbols-outlined text-xl">tune</span>
          <span>Advanced</span>
        </button>
      </div>
      <!-- Roles Table -->
      <div class="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-border-dark/50">
              <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
                Role Name
              </th>
              <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
                Number of Users
              </th>
              <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
                Permissions Summary
              </th>
              <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#21494a]">
            <tr v-for="role in roles" v-if="hasData === true" :key="role.id" @click="openRole(role)"
              class="hover:bg-primary/5 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
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
                {{ role.users?.[0]?.count ?? 0 }}
              </td>

              <td class="px-6 py-5">
                <span class="flex items-center gap-1.5 text-xs font-bold"
                  :class="role.users?.[0]?.count ?? 0 ? 'text-primary' : 'text-slate-500'">
                  <span class="h-2 w-2 rounded-full"
                    :class="role.users?.[0]?.count ?? 0 ? 'bg-primary' : 'bg-slate-600'"></span>
                  {{ role.users?.[0]?.count ?? 0 ? "Active" : "Inactive" }}
                </span>
              </td>

              <td class="px-6 py-5">
                <div class="flex flex-wrap gap-1">
                  <span v-for="perm in role.permissions_summary" :key="perm"
                    class="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                    {{ perm }}
                  </span>
                </div>
              </td>

              <td class="px-6 py-5 text-right">
                <div class="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">visibility</span>
                  </button>

                  <button @click="openEdit(role)" class="text-slate-400 hover:text-primary hover:underline">
                    <span class="material-symbols-outlined">
                      edit
                    </span>
                  </button>

                  <button class="p-2 text-slate-400 hover:text-red-400 transition-colors">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td colspan="4" class="px-2 py-4 rounded-md text-primary text-md text-center capitalize font-bold "> datos
                no encontrados</td>
            </tr>

          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm text-slate-500">Showing 1 to 4 of 24 roles</p>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50">
            Previous
          </button>
          <button
            class="px-4 py-2 bg-primary text-background-dark font-bold rounded-lg border border-primary shadow-lg shadow-primary/10">
            1
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors">
            2
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors">
            3
          </button>
          <button
            class="px-4 py-2 bg-surface-dark text-slate-100 rounded-lg border border-border-dark hover:border-primary transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
    <CreateRoles v-if="showCreate" @close="showCreate = false" @created="refreshPets" />
    <PermissionsAside :show="showEdit" :selectedRole="selectedRole" :editedPermissions="editedPermissions"
      @toggle="toggleEditPermission" @save="savePermissions" @close="closeEdit" />

    <ModalSuccess :show="showSuccessModal" :message="modalMessage" />

    <ModalError :show="showErrorModal" :message="modalMessage" @close="showErrorModal = false" />
  </section>

</template>
<style lang="css" scoped>
.bg-background-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(15 34 35 / var(--tw-bg-opacity, 1));
}

.bg-surface-dark {
  --tw-bg-opacity: 1;

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

.bg-primary {
  background-color: #04c9cc;
}

.hover\:text-primary:hover {
  color: #04c9cc;
}

/* SLIDE ASIDE */

.asidePermissions-enter-active,
.asidePermissions-leave-active {
  transition: all 0.35s cubic-bezier(.25, .8, .25, 1);
}

.asidePermissions-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.asidePermissions-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.asidePermissions-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.asidePermissions-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>