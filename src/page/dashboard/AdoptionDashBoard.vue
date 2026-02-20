<script setup lang="ts">
import { onMounted, computed, ref } from "vue"
import draggable from "vuedraggable"


/* const adoptionStore = useAdoptionStore()
const petStore = usePetStore()
const authStore = useAuthStore() */

const selectedAdoption = ref<any>(null)
const showModal = ref(false)

/* ===============================
   MOCK DATA (solo si vacío)
================================= */


  

 const petStore = [
    { id: "p1", name: "Copper", breed: "Golden Retriever", image_url: "https://images.unsplash.com/photo-1558788353-f76d92427f16", adoption_status: "available" },
    { id: "p2", name: "Luna", breed: "Tuxedo Cat", image_url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131", adoption_status: "available" },
    { id: "p3", name: "Ghost", breed: "Husky", image_url: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea", adoption_status: "available" },
    { id: "p4", name: "Buddy", breed: "Labrador", image_url: "https://images.unsplash.com/photo-1552053831-71594a27632d", adoption_status: "adopted" }
  ]

  const authStore = [
    { id: "u1", full_name: "Mark Stevens", email: "mark@mail.com" },
    { id: "u2", full_name: "Elena Gomez", email: "elena@mail.com" },
    { id: "u3", full_name: "Sarah Thompson", email: "sarah@mail.com" },
    { id: "u4", full_name: "Rachel Zane", email: "rachel@mail.com" }
  ]

  const adoptionStore= [
    { id: "a1", pet_id: "p1", user_id: "u1", status: "new", created_at: new Date().toISOString() },
    { id: "a2", pet_id: "p2", user_id: "u2", status: "interview", created_at: new Date().toISOString() },
    { id: "a3", pet_id: "p3", user_id: "u3", status: "home_visit", created_at: new Date().toISOString() },
    { id: "a4", pet_id: "p4", user_id: "u4", status: "approved", created_at: new Date().toISOString() }
  ]


/* ===============================
   Fetch
================================= */

onMounted(async () => {
/*   await Promise.all([
    adoptionStore.fetch?.(),
    petStore.fetch?.(),
    authStore.fetchUsers?.()
  ]) */

 
})

/* ===============================
   Helpers
================================= */

const getPet = (petId: string) =>{
  return petStore.find(p => p.id === petId) 
   console.log(petStore)
}
  

const getUser = (userId: string) =>
  authStore.find(u => u.id === userId)

/* ===============================
   Grouped by Status
================================= */

const grouped = computed(() => ({
  new: adoptionStore.filter(a => a.status === "new"),
  interview: adoptionStore.filter(a => a.status === "interview"),
  home_visit: adoptionStore.filter(a => a.status === "home_visit"),
  approved: adoptionStore.filter(a => a.status === "approved"),
  rejected: adoptionStore.filter(a => a.status === "rejected")
}))

/* ===============================
   Status Change
================================= */

/* const changeStatus = async (adoption: any, status: string) => {

  if (status === "rejected") {
    const confirmReject = confirm("Are you sure you want to reject this adoption?")
    if (!confirmReject) return
  }

  await adoptionStore.update?.(adoption.id, { status })

  if (status === "approved") {
    await petStore.update?.(adoption.pet_id, { adoption_status: "adopted" })
  }

  console.log(`Status changed to ${status}`)
} */

/* ===============================
   Drag & Drop
================================= */

const onDragEnd = async (event: any) => {
  const adoption = event.item.__draggable_context.element
  const newStatus = event.to.closest("[data-status]")?.dataset.status

  if (!newStatus || adoption.status === newStatus) return

  adoption.status = newStatus
  
}

/* ===============================
   Edit Modal
================================= */

const openEdit = (adoption: any) => {
  selectedAdoption.value = adoption
  showModal.value = true
}

/* const savePetChanges = async () => {
  const pet = getPet(selectedAdoption.value.pet_id)
  if (!pet) return
  await petStore.update?.(pet.id, pet)
  showModal.value = false
} */
</script>

<template>
  <div class="flex-1 overflow-x-auto custom-scrollbar bg-[#0d1a1b] p-6 flex gap-6 h-full">

    <div
      v-for="(items, status) in grouped"
      :key="status"
      :data-status="status"
      class="flex flex-col gap-4 w-80 shrink-0"
    >
      <!-- Header -->
      <div class="flex justify-between items-center px-2 border-b border-[#234548] pb-3">
        <h3 class="font-bold text-slate-100 capitalize">
          {{ status.replace('_', ' ') }}
        </h3>
        <span class="bg-[#234548] text-primary text-xs font-bold px-2 py-0.5 rounded-full">
          {{ items.length }}
        </span>
      </div>

      <!-- Draggable -->
      <draggable
        :list="items"
        group="adoptions"
        item-key="id"
        @end="onDragEnd"
        class="flex flex-col gap-3"
      >
        <template #item="{ element }">

          <div
            :class="[
              'p-4 rounded-lg shadow-lg transition-all',
              element.status === 'approved'
                ? 'bg-emerald-900/30 border border-emerald-500/30'
                : element.status === 'rejected'
                ? 'bg-rose-900/30 border border-rose-500/30'
                : 'bg-card-dark hover:ring-1 hover:ring-primary/50'
            ]"
          >

            <div class="flex gap-3 mb-3">
              <div
                class="size-12 rounded-lg bg-cover bg-center"
                :style="{ backgroundImage: `url(${getPet(element.pet_id)?.image_url})` }"
              ></div>

              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-white truncate">
                  {{ getPet(element.pet_id).name }}
                  ({{ getPet(element.pet_id)?.breed }})
                </h4>

                <p class="text-xs text-slate-400 truncate">
                  Applicant:
                  {{ getUser(element.user_id)?.full_name }}
                </p>
              </div>
            </div>

            <div class="flex justify-between items-center mt-3">

              <select
                class="bg-[#1c3639] text-xs text-white rounded px-2 py-1"
                v-model="element.status"
                @change="changeStatus(element, element.status)"
              >
                <option value="new">New</option>
                <option value="interview">Interview</option>
                <option value="home_visit">Home Visit</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                @click="openEdit(element)"
                class="text-primary text-xs hover:underline"
              >
                Edit Pet
              </button>
            </div>

          </div>

        </template>
      </draggable>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      <div class="bg-[#0f2021] p-6 rounded-xl w-96">
        <h3 class="text-white font-bold mb-4">Edit Pet</h3>

        <input
          v-model="getPet(selectedAdoption.pet_id).name"
          class="w-full mb-3 p-2 bg-[#1c3639] text-white rounded"
          placeholder="Pet Name"
        />

        <input
          v-model="getPet(selectedAdoption.pet_id).breed"
          class="w-full mb-3 p-2 bg-[#1c3639] text-white rounded"
          placeholder="Breed"
        />

        <div class="flex justify-end gap-2">
          <button
            @click="showModal = false"
            class="px-3 py-1 bg-slate-600 rounded text-white"
          >
            Cancel
          </button>

          <button
            @click="savePetChanges"
            class="px-3 py-1 bg-primary rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  </div>
</template>