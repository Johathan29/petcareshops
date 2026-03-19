<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRolesStore, type Role, type Permission } from "../../stores/roles.store"
import RoleFilter from "../../components/DashBoard/Roles/RoleFilter.vue"
import RoleFormModal from "../../components/DashBoard/Roles/RoleFormModal.vue"
import PermissionFormModal from "../../components/DashBoard/Roles/PermissionFormModal.vue"
import RolePermissionsModal from "../../components/DashBoard/Roles/RolePermissionsModal.vue"
import RolesTable from "../../components/DashBoard/Roles/RolesTable.vue"
import ConfirmModal from "../../components/UI/ConfirmModal.vue"

import ModalSuccess from "../../components/UI/SuccessModal.vue"
import ModalError from "../../components/UI/ErrorModal.vue"
import PermissionsAside from "../../components/DashBoard/Roles/PermissionsAside.vue"
import CreateRoles from "../../components/DashBoard/Roles/createRoles.vue"

const rolesStore = useRolesStore()

// State
const searchQuery = ref('')
const filterRoleId = ref<string | null>(null)
const itemsPerPage = ref(10)

// Modals
const showRoleFormModal = ref(false)
const showPermissionFormModal = ref(false)
const showPermissionsModal = ref(false)
const showDeleteRoleConfirm = ref(false)
const showDeletePermissionConfirm = ref(false)

// Editing state
const isEditingRole = ref(false)
const isEditingPermission = ref(false)
const selectedRole = ref<Role | null>(null)
const selectedPermission = ref<Permission | null>(null)
const roleToDelete = ref<Role | null>(null)
const permissionToDelete = ref<Permission | null>(null)

// Loading states
const roleFormLoading = ref(false)
const permissionFormLoading = ref(false)
const permissionsLoading = ref(false)

// Computed
const roles = computed(() => rolesStore.getAllRoles)
const permissions = computed(() => rolesStore.getAllPermissions)
const loading = computed(() => rolesStore.loading)

// Initialize
onMounted(async () => {
  await Promise.all([
    rolesStore.fetchRoles(),
    rolesStore.fetchPermissions()
  ])
})

// Role handlers
const openCreateRoleModal = () => {
  isEditingRole.value = false
  selectedRole.value = null
  showRoleFormModal.value = true
}

const openEditRoleModal = (role: Role) => {
  isEditingRole.value = true
  selectedRole.value = role
  showRoleFormModal.value = true
}

const handleRoleSubmit = async (roleData: Role) => {
  roleFormLoading.value = true

  try {
    if (isEditingRole.value && selectedRole.value?.id) {
      await rolesStore.updateRole({ ...roleData, id: selectedRole.value.id })
    } else {
      await rolesStore.createRole(roleData)
    }
    showRoleFormModal.value = false
  } catch (error) {
    console.error('Error saving role:', error)
  } finally {
    roleFormLoading.value = false
  }
}

const openDeleteRoleConfirm = (role: Role) => {
  roleToDelete.value = role
  showDeleteRoleConfirm.value = true
}

const handleDeleteRole = async () => {
  if (roleToDelete.value?.id) {
    await rolesStore.deleteRole(roleToDelete.value.id)
    roleToDelete.value = null
    showDeleteRoleConfirm.value = false
  }
}

// Permission handlers
const openCreatePermissionModal = () => {
  isEditingPermission.value = false
  selectedPermission.value = null
  showPermissionFormModal.value = true
}

const handlePermissionSubmit = async (permissionData: Permission) => {
  permissionFormLoading.value = true

  try {
    if (isEditingPermission.value && selectedPermission.value?.id) {
      await rolesStore.updatePermission({ ...permissionData, id: selectedPermission.value.id })
    } else {
      await rolesStore.createPermission(permissionData)
    }
    showPermissionFormModal.value = false
  } catch (error) {
    console.error('Error saving permission:', error)
  } finally {
    permissionFormLoading.value = false
  }
}

const openDeletePermissionConfirm = (permission: Permission) => {
  permissionToDelete.value = permission
  showDeletePermissionConfirm.value = true
}

const handleDeletePermission = async () => {
  if (permissionToDelete.value?.id) {
    await rolesStore.deletePermission(permissionToDelete.value.id)
    permissionToDelete.value = null
    showDeletePermissionConfirm.value = false
  }
}

// Permissions management
const openPermissionsModal = (role: Role) => {
  selectedRole.value = role
  showPermissionsModal.value = true
}

const handlePermissionsSubmit = async (payload: { idRole?: string; permissions: string[] }) => {
  if (!payload?.idRole) return

  permissionsLoading.value = true

  try {
    await rolesStore.updateRolePermissions(
      payload.idRole,
      payload.permissions
    )

    showPermissionsModal.value = false
  } catch (error) {
    console.error('Error updating permissions:', error)
  } finally {
    permissionsLoading.value = false
  }
}

// Filter handlers
const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleFilter = (roleId: string | null) => {
  filterRoleId.value = roleId
}

const handleClear = () => {
  searchQuery.value = ''
  filterRoleId.value = null
}

// Get current role permissions
const getCurrentRolePermissions = () => {
  return selectedRole.value?.permissions_summary || []
}
</script>

<template>
  <section class="flex-1 overflow-y-auto  p-8 relative">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-wrap justify-between items-end gap-6 mb-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-slate-100 text-3xl font-black leading-tight tracking-tight">
            Roles &amp; Permissions
          </h1>
          <p class="text-slate-400 text-base">
            Configure user access levels and granular functional controls across the platform.
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="openCreatePermissionModal"
            class="flex items-center gap-2 px-6 h-11 bg-slate-700 text-slate-100 rounded-lg font-bold hover:bg-slate-600 transition-all shadow-lg"
          >
            <span class="material-symbols-outlined">key</span>
            <span>New Permission</span>
          </button>
          <button
            @click="openCreateRoleModal"
            class="flex items-center gap-2 px-6 h-11 bg-primary text-background-dark rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <span class="material-symbols-outlined">add_box</span>
            <span>Create New Role</span>
          </button>
        </div>
      </div>

      <!-- Filter Component -->
      <RoleFilter
        :roles="roles"
        @search="handleSearch"
        @filter="handleFilter"
        @clear="handleClear"
      />

      <!-- Roles Table Component -->
      <RolesTable
        :roles="roles"
        :loading="loading"
        :search-query="searchQuery"
        :filter-role-id="filterRoleId"
        :items-per-page="itemsPerPage"
        @edit="openEditRoleModal"
        @edit-permissions="openPermissionsModal"
        @delete="openDeleteRoleConfirm"
      />

      <!-- Permissions Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-slate-100 text-xl font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-cyan-400">key</span>
            All Permissions
          </h2>
          <button
            @click="openCreatePermissionModal"
            class="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-100 rounded-lg font-medium hover:bg-slate-600 transition-colors text-sm"
          >
            <span class="material-symbols-outlined text-sm">add</span>
            Add Permission
          </button>
        </div>

        <div class="bg-surface-dark rounded-xl border border-border-dark overflow-hidden p-6">
          <div v-if="permissions.length === 0" class="text-center py-8">
            <span class="material-symbols-outlined text-5xl text-slate-600 mb-2">key_off</span>
            <p class="text-slate-400">No permissions defined</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="permission in permissions"
              :key="permission.id"
              class="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all group"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex flex-col">
                  <span class="text-cyan-400 font-mono text-xs">
                    {{ permission.module }}.{{ permission.action }}
                  </span>
                  <span class="text-slate-200 font-medium text-sm mt-1">
                    {{ permission.label }}
                  </span>
                </div>
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    @click="openDeletePermissionConfirm(permission)"
                    class="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <span class="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Form Modal -->
    <RoleFormModal
      :show="showRoleFormModal"
      :is-editing="isEditingRole"
      :initial-data="selectedRole"
      :loading="roleFormLoading"
      @close="showRoleFormModal = false"
      @submit="handleRoleSubmit"
    />

    <!-- Permission Form Modal -->
    <PermissionFormModal
      :show="showPermissionFormModal"
      :is-editing="isEditingPermission"
      :initial-data="selectedPermission"
      :loading="permissionFormLoading"
      @close="showPermissionFormModal = false"
      @submit="handlePermissionSubmit"
    />

    <!-- Role Permissions Modal -->
    <RolePermissionsModal
      :show="showPermissionsModal"
      :role="selectedRole"
      :permissions="permissions"
      :current-permissions="getCurrentRolePermissions()"
      :loading="permissionsLoading"
      @close="showPermissionsModal = false"
      @submit="handlePermissionsSubmit"
    />

    <!-- Delete Role Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteRoleConfirm"
      title="Delete Role"
      message="Are you sure you want to delete this role? This action cannot be undone and will remove all associated permissions."
      confirm-text="Delete"
      cancel-text="Cancel"
      confirm-class="bg-red-500 hover:bg-red-600"
      @confirm="handleDeleteRole"
      @cancel="showDeleteRoleConfirm = false"
    />

    <!-- Delete Permission Confirmation Modal -->
    <ConfirmModal
      :show="showDeletePermissionConfirm"
      title="Delete Permission"
      message="Are you sure you want to delete this permission? This will remove it from all roles that have it assigned."
      confirm-text="Delete"
      cancel-text="Cancel"
      confirm-class="bg-red-500 hover:bg-red-600"
      @confirm="handleDeletePermission"
      @cancel="showDeletePermissionConfirm = false"
    />
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

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(5 201 204 / var(--tw-bg-opacity, 1));
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(33 73 74 / var(--tw-border-opacity, 1));
}
</style>
