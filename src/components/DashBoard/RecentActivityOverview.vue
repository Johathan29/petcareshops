<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useAdoptionStore } from "../../stores/adoption.store"
import { useAuthStore } from "../../stores/auth.store"
import { usePetStore } from "../../stores/pet.store"
import { useDoctorStore } from "../../stores/doctor.store"
import { useRoute } from "vue-router"
const route = useRoute()

const isDashboardHome = computed(() => {
  return route.path === "/dashboard/home"
})
const adoptionStore = useAdoptionStore()
const authStore = useAuthStore()
const petStore = usePetStore()
const doctorStore = useDoctorStore()

const selectedType = ref("all")
const selectedStatus = ref("all")
const currentPage = ref(1)
const perPage = 8
const totalPages = computed(() => {
  if (isDashboardHome.value) return 1
  return Math.ceil(filteredBase.value.length / perPage)
})
onMounted(async () => {
  loading.value = true

  await Promise.all([
    adoptionStore.fetch(),
    authStore.fetchUsers(),
    petStore.fetch(),
    doctorStore.fetch()
  ])

  loading.value = false
})
const totalEvents = computed(() => {
  return activities.value.length
})

/* ===============================
   Format Date
================================= */
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleString()
}

/* ===============================
   Build Activity Feed
================================= */
const buildActivities = () => {
  const list: any[] = []

  petStore.pets.forEach(pet => {
    if (!pet.created_at) return
    list.push({
      type: "pet",
      status: "success",
      action: "New Pet Registered",
      user: pet.created_by || "System",
      date: pet.created_at,
      reference: `PET-${pet.id.slice(0, 4)}`
    })
  })

  authStore.users.forEach(user => {
    if (!user.created_at) return
    list.push({
      type: "user",
      status: "success",
      action: "New User Registered",
      user: user.full_name,
      date: user.created_at,
      reference: `USR-${user.id.slice(0, 4)}`
    })
  })

  doctorStore.doctors.forEach(doc => {
    if (!doc.created_at) return
    list.push({
      type: "doctor",
      status: "success",
      action: "New Doctor Created",
      user: doc.full_name,
      date: doc.created_at,
      reference: `DOC-${doc.id.slice(0, 4)}`
    })
  })

  adoptionStore.adoptions.forEach(adp => {
    if (!adp.created_at) return
    list.push({
      type: "adoption",
      status:
        adp.status === "rejected"
          ? "failed"
          : adp.status === "approved"
          ? "success"
          : "pending",
      action: "Adoption Application",
      user: adp.user_name || "Client",
      date: adp.created_at,
      reference: `ADP-${adp.id.slice(0, 4)}`
    })
  })

  return list.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

const activities = computed(() => buildActivities())

/* ===============================
   Filters
================================= */
const filteredBase = computed(() => {
  return activities.value
    .filter(a =>
      selectedType.value === "all"
        ? true
        : a.type === selectedType.value
    )
    .filter(a =>
      selectedStatus.value === "all"
        ? true
        : a.status === selectedStatus.value
    )
})
watch([selectedType, selectedStatus], () => {
  currentPage.value = 1
})
const paginatedActivities = computed(() => {
  if (isDashboardHome.value) {
    return filteredBase.value.slice(0, 5)
  }

  const start = (currentPage.value - 1) * perPage
  return filteredBase.value.slice(start, start + perPage)
})
/* ===============================
   Status Colors
================================= */
const statusStyles: Record<string, string> = {
  success: "bg-primary/20 text-primary",
  pending: "bg-amber-500/20 text-amber-500",
  failed: "bg-rose-500/20 text-rose-500"
}
const loading = ref(true)
</script>

<template>
  <div class="glass-card rounded-xl overflow-hidden mb-8">

    <!-- Header -->
    <div class="p-6 border-b border-white/5 flex items-center justify-between">
      <div>
        <h4 class="text-white font-bold text-lg flex items-center gap-2">
          Audit Log
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </h4>
        <p class="text-slate-500 text-xs">
          Live system activity tracking
        </p>
      </div>

      <!-- Filters -->
      <div class="flex gap-3">
        <select
          v-model="selectedType"
          class="bg-[#1c3639] text-xs text-white rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pet">Pets</option>
          <option value="user">Users</option>
          <option value="doctor">Doctors</option>
          <option value="adoption">Adoptions</option>
        </select>

        <select
          v-model="selectedStatus"
          class="bg-[#1c3639] text-xs text-white rounded px-2 py-1"
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
<div
  v-if="isDashboardHome"
  class="flex justify-end px-6 py-4 border-t border-white/5"
>
  <RouterLink
    to="/dashboard/history"
    class="text-xs text-primary hover:underline transition"
  >
    View all events →
  </RouterLink>
</div>
    <!-- Table -->
     <div v-if="loading" class="p-6 space-y-3">
  <div
    v-for="i in 5"
    :key="i"
    class="h-10 rounded bg-white/5 animate-pulse"
  ></div>
</div>
    <div v-else class="overflow-x-auto">
        
      <table class="w-full text-left">
        <thead>
          <tr class="bg-white/5 text-slate-400 text-[11px] uppercase tracking-wider font-bold">
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Action</th>
            <th class="px-6 py-4">User</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4 text-right">Reference</th>
          </tr>
        </thead>

     <Transition
  name="page"
  mode="out-in"
>
  <tbody
    :key="currentPage"
    class="text-sm divide-y divide-white/5"
  >
    <tr
      v-for="activity in paginatedActivities"
      :key="activity.reference"
      class="hover:bg-white/5 transition-colors"
    >
            <td class="px-6 py-4">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                :class="statusStyles[activity.status]"
              >
                {{ activity.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-slate-300 font-medium">
              {{ activity.action }}
            </td>

            <td class="px-6 py-4 text-slate-400">
              {{ activity.user }}
            </td>

            <td class="px-6 py-4 text-slate-400">
              {{ formatDate(activity.date) }}
            </td>

            <td class="px-6 py-4 text-right font-mono text-slate-500 text-xs">
              {{ activity.reference }}
            </td>
          </tr>
        </tbody>
        </Transition>
      </table>
      </div>
      <!-- Pagination -->
<div
  v-if="!isDashboardHome"
  class="flex items-center justify-between px-6 py-4 border-t border-white/5"
>

  <button
    @click="currentPage--"
    :disabled="currentPage === 1"
    class="px-3 py-1 text-xs rounded bg-[#1c3639] text-white hover:bg-primary/20 disabled:opacity-40 transition"
  >
    ← Previous
  </button>

  <div class="flex gap-2">
    <span
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      class="w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300"
      :class="page === currentPage
        ? 'bg-primary scale-125 shadow-lg shadow-primary/50'
        : 'bg-white/20 hover:bg-white/40'"
    ></span>
  </div>

  <button
    @click="currentPage++"
    :disabled="currentPage === totalPages"
    class="px-3 py-1 text-xs rounded bg-[#1c3639] text-white hover:bg-primary/20 disabled:opacity-40 transition"
  >
    Next →
  </button>

</div>
</div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>