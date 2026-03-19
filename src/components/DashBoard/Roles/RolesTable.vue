<template>
  <transition name="table">
    <div
      class="bg-surface-dark rounded-xl border border-border-dark overflow-hidden"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-12 text-center">
        <span class="material-symbols-outlined text-6xl text-slate-600 animate-spin">progress_activity</span>
        <p class="text-slate-400 mt-4">Loading roles...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="paginatedRoles.length === 0" class="p-12 text-center">
        <span class="material-symbols-outlined text-6xl text-slate-600 mb-4">badge</span>
        <p class="text-slate-400 text-lg">No roles found</p>
        <p class="text-slate-500 text-sm mt-2">
          {{ searchQuery || filterRoleId ? 'Try adjusting your filters' : 'Create your first role to get started' }}
        </p>
      </div>

      <!-- Table -->
      <table v-else class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-border-dark/50">
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
              Role Name
            </th>
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
              Category
            </th>
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
              Users
            </th>
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider">
              Permissions
            </th>
            <th class="px-6 py-4 text-primary text-xs font-bold uppercase tracking-wider text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#21494a]">
          <tr
            v-for="role in paginatedRoles"
            :key="role.id"
            class="hover:bg-primary/5 transition-colors group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
          >
            <!-- Role Name -->
            <td class="px-6 py-5">
              <div class="flex flex-col">
                <span class="text-slate-100 font-bold">
                  {{ role.name }}
                </span>
                <span class="text-slate-500 text-xs max-w-xs truncate">
                  {{ role.description || 'No description' }}
                </span>
              </div>
            </td>

            <!-- Category -->
            <td class="px-6 py-5">
              <span
                v-if="role.category"
                class="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-medium"
              >
                {{ role.category }}
              </span>
              <span v-else class="text-slate-500 text-xs">-</span>
            </td>

            <!-- Users Count -->
            <td class="px-6 py-5">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-slate-500 text-sm">group</span>
                <span class="text-slate-300 font-medium">
                  {{ role.users?.[0]?.count ?? 0 }}
                </span>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-5">
              <span
                class="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                :class="role.active ? 'bg-green-500/10 text-green-500' : 'bg-slate-600/10 text-slate-500'"
              >
                <span
                  class="h-2 w-2 rounded-full"
                  :class="role.active ? 'bg-green-500' : 'bg-slate-600'"
                ></span>
                {{ role.active ? "Active" : "Inactive" }}
              </span>
            </td>

            <!-- Permissions Summary -->
            <td class="px-6 py-5">
              <div class="flex flex-wrap gap-1 max-w-xs">
                <span
                  v-for="perm in role.permissions_summary?.slice(0, 3) || []"
                  :key="perm"
                  class="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 truncate"
                >
                  {{ perm }}
                </span>
                <span
                  v-if="(role.permissions_summary?.length || 0) > 3"
                  class="px-2 py-0.5 rounded-md bg-slate-700 text-slate-400 text-[10px] font-medium"
                >
                  +{{ (role.permissions_summary?.length || 0) - 3 }}
                </span>
                <span
                  v-if="!role.permissions_summary?.length"
                  class="text-slate-500 text-xs"
                >
                  No permissions
                </span>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-6 py-5 text-right">
              <div
                class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  @click="$emit('edit-permissions', role)"
                  class="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Edit Permissions"
                >
                  <span class="material-symbols-outlined">security</span>
                </button>

                <button
                  @click="$emit('edit', role)"
                  class="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Edit Role"
                >
                  <span class="material-symbols-outlined">edit</span>
                </button>

                <button
                  @click="$emit('delete', role)"
                  class="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Delete Role"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 p-6 border-t border-border-dark flex items-center justify-between">
        <p class="text-sm text-slate-500">
          Showing {{ startItem }} to {{ endItem }} of {{ filteredRoles.length }} roles
        </p>
        <div class="flex gap-2">
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">first_page</span>
          </button>
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page === 'ellipsis'"
              disabled
              class="px-3 py-2 text-slate-500"
            >
              ...
            </button>
            <button
              v-else
              @click="currentPage = page as number"
              class="px-4 py-2 rounded-lg border font-bold transition-colors"
              :class="currentPage === page
                ? 'bg-primary text-background-dark border-primary shadow-lg shadow-primary/10'
                : 'bg-surface-dark text-slate-100 border-border-dark hover:border-primary/50'"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 bg-surface-dark text-slate-400 rounded-lg border border-border-dark hover:text-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span class="material-symbols-outlined text-sm">last_page</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Role } from '../../stores/roles.store'

interface Props {
  roles: Role[]
  loading: boolean
  searchQuery: string
  filterRoleId: string | null
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10
})

const emit = defineEmits<{
  (e: 'edit', role: Role): void
  (e: 'edit-permissions', role: Role): void
  (e: 'delete', role: Role): void
}>()

const currentPage = ref(1)

// Reset page when filters change
watch(() => [props.searchQuery, props.filterRoleId], () => {
  currentPage.value = 1
})

// Filter roles
const filteredRoles = computed(() => {
  let result = [...props.roles]

  // Search filter
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    result = result.filter(role =>
      role.name.toLowerCase().includes(query) ||
      role.description?.toLowerCase().includes(query)
    )
  }

  // Role filter
  if (props.filterRoleId) {
    result = result.filter(role => role.id === props.filterRoleId)
  }

  return result
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredRoles.value.length / props.itemsPerPage))

const paginatedRoles = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return filteredRoles.value.slice(start, end)
})

const startItem = computed(() => (currentPage.value - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(currentPage.value * props.itemsPerPage, filteredRoles.value.length))

// Visible pages calculation
const visiblePages = computed(() => {
  const pages: (number | 'ellipsis')[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('ellipsis')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('ellipsis')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('ellipsis')
      pages.push(total)
    }
  }

  return pages
})
</script>

<style scoped>
.bg-surface-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(22 44 45 / var(--tw-bg-opacity, 1));
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(33 73 74 / var(--tw-border-opacity, 1));
}
.bg-border-dark{
  background-color: #909fb840;
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

.bg-primary\/5 {
  background-color: rgb(5 201 204 / 0.05);
}

/* Table Transitions */
.table-enter-active,
.table-leave-active {
  transition: all 0.3s ease;
}

.table-enter-from,
.table-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
