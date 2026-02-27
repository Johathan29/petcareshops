<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { supabase } from "../../config/supabase";
import { useAdoptionStore } from "../../stores/adoption.store";
import { useAuthStore } from "../../stores/auth.store";
import { usePetStore } from "../../stores/pet.store";
import { useDoctorStore } from "../../stores/doctor.store";
import { useRoute } from "vue-router";
import KanbanColumn from "../../components/DashBoard/UI/KanbanColumn.vue";
import SidebarAdoption from "../../components/DashBoard/UI/SidebarAdoption.vue";

const route = useRoute();

const isDashboardHome = computed(() => {
  return route.path === "/dashboard/home";
});

const adoptionStore = useAdoptionStore();
const authStore = useAuthStore();
const petStore = usePetStore();
const doctorStore = useDoctorStore();

/* ===============================
   FETCH + DEBUG LOGS
================================= */

onMounted(async () => {
  console.log("🚀 Fetching all stores...");

  await Promise.all([
    adoptionStore.fetch(),
    authStore.fetchUsers(),
    petStore.fetch(),
    doctorStore.fetch(),
  ]);
  fullAdoptions.value;
  console.log("✅ Adoption Store:", adoptionStore.adoptions);
  console.log("✅ Auth Store (Users):", authStore.users);
  console.log("✅ Pet Store:", petStore.pets);
  console.log("✅ Doctor Store:", doctorStore.doctors);
});

/* ===============================
   REACTIVE WATCH LOGS
   (Se ejecuta cuando cambian)
================================= */

watch(
  () => adoptionStore.adoptions,
  (val) => {
    console.log("📦 Adoption updated:", val);
  },
  { deep: true },
);

watch(
  () => authStore.users,
  (val) => {
    console.log("👤 Users updated:", val);
  },
  { deep: true },
);

watch(
  () => petStore.pets,
  (val) => {
    console.log("🐶 Pets updated:", val);
  },
  { deep: true },
);

watch(
  () => doctorStore.doctors,
  (val) => {
    console.log("🩺 Doctors updated:", val);
  },
  { deep: true },
);
const fullAdoptions = computed(() => {
  if (
    !adoptionStore.adoptions.length ||
    !petStore.pets.length ||
    !authStore.users.length
  )
    return [];

  return adoptionStore.adoptions
    .map((adoption) => {
      const pet = petStore.pets.find((p) => p.id === adoption.idPet);

      const user = authStore.users.find((u) => u.id === adoption.idProfile);

      return {
        ...adoption,
        pet,
        user,
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
});
console.log(fullAdoptions.value);
const search = ref("");
const statusFilter = ref("all");
const filteredAdoptions = computed(() => {
  const query = search.value.toLowerCase().trim();

  return fullAdoptions.value.filter((adoption) => {
    /* 🔎 SEARCH FILTER */
    const petName = adoption.pet?.nombre?.toLowerCase() || "";
    const userName = adoption.user?.first_name?.toLowerCase() || "";
    const userEmail = adoption.user?.email?.toLowerCase() || "";
    const status = adoption.status?.toLowerCase() || "";
    const id = adoption.id?.toString() || "";
    const date = new Date(adoption.created_at)
      .toLocaleDateString()
      .toLowerCase();

    const matchesSearch =
      !query ||
      petName.includes(query) ||
      userName.includes(query) ||
      userEmail.includes(query) ||
      status.includes(query) ||
      id.includes(query) ||
      date.includes(query);

    /* 🏷 STATUS FILTER */
    const matchesStatus =
      statusFilter.value === "all" ||
      adoption.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});
const grouped = computed(() => {
  const source = filteredAdoptions.value;

  return {
    pending: source.filter((a) => a.status === "pending"),
    interview: source.filter((a) => a.status === "interview"),
    home_visit: source.filter((a) => a.status === "home_visit"),
    approved: source.filter((a) => a.status === "approved"),
    rejected: source.filter((a) => a.status === "rejected"),
  };
});
const isUrgent = (date: string) => {
  const created = new Date(date).getTime();
  const now = new Date().getTime();

  const diffInDays = (now - created) / (1000 * 60 * 60 * 24);

  return diffInDays <= 3;
};
const selectedAdoption = ref<any>(null);
const sidebarOpen = ref(false);

const openDetails = (item: any) => {
  selectedAdoption.value = item;
  sidebarOpen.value = true;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
  setTimeout(() => {
    selectedAdoption.value = null;
  }, 200);
};

/* ===============================
   APPROVE APPLICATION
================================= */



const openSidebar = (adoption: any) => {
  selectedAdoption.value = adoption
  sidebarOpen.value = true
}


const handleStatusChange = async ({
  item,
  newStatus,
}: {
  item: any;
  newStatus: string;
}) => {
  try {
    // 🔥 Update adoption
    const { error } = await supabase
      .from("adoption")
      .update({ status: newStatus })
      .eq("id", item.id);

    if (error) throw error;

    // 🔥 Update animal
    await supabase
      .from("animals")
      .update({
        status: newStatus === "approved" ? "adopted" : "available",
      })
      .eq("id", item.idPet);

    // ✅ Reactive update (NO reload)
    const adoption = adoptionStore.adoptions.find(
      (a) => a.id === item.id
    );

    if (adoption) {
      adoption.status = newStatus;
    }

    const pet = petStore.pets.find((p) => p.id === item.idPet);

    if (pet) {
      pet.status =
        newStatus === "approved" ? "adopted" : "available";
    }
  } catch (err) {
    console.error("Status change error:", err);
  }
};
const updateApplicationStatus = async (
  newStatus: "approved" | "rejected"
) => {
  if (!selectedAdoption.value) return;

  const adoptionId = selectedAdoption.value.id;
  const petId = selectedAdoption.value.idPet;

  const previousAdoptionStatus = selectedAdoption.value.status;
  const previousPetStatus =
    petStore.pets.find((p) => p.id === petId)?.status || null;

  try {
    /* ===============================
       🟢 OPTIMISTIC UI (instant update)
    =============================== */

    // Update adoption locally
    const adoption = adoptionStore.adoptions.find(
      (a) => a.id === adoptionId
    );
    if (adoption) adoption.status = newStatus;

    // Update pet locally
    const pet = petStore.pets.find((p) => p.id === petId);
    if (pet) {
      pet.status = newStatus === "approved" ? "adopted" : "available";
    }

    selectedAdoption.value.status = newStatus;

    /* ===============================
       🔥 DATABASE UPDATE
    =============================== */

    const { error: adoptionError } = await supabase
      .from("adoption")
      .update({ status: newStatus })
      .eq("id", adoptionId);

    if (adoptionError) throw adoptionError;

    const { error: animalError } = await supabase
      .from("animals")
      .update({
        status: newStatus === "approved" ? "adopted" : "available",
      })
      .eq("id", petId);

    if (animalError) throw animalError;

    closeSidebar();
  } catch (error) {
    console.error("Status update failed:", error);

    /* ===============================
       🔴 ROLLBACK SI FALLA
    =============================== */

    const adoption = adoptionStore.adoptions.find(
      (a) => a.id === adoptionId
    );
    if (adoption) adoption.status = previousAdoptionStatus;

    const pet = petStore.pets.find((p) => p.id === petId);
    if (pet && previousPetStatus) {
      pet.status = previousPetStatus;
    }
  }
};

/* ===============================
   WRAPPERS SIMPLES
================================= */

const approveApplication = () =>
  updateApplicationStatus("approved");

const rejectApplication = () =>
  updateApplicationStatus("rejected");
console.log(grouped.value.pending);
let timeout: any;

watch(search, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {}, 300);
});
</script>
<template>
  <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
    <!-- Top Header Action Bar -->
    <header
      class="h-16 flex items-center h-auto justify-between px-8 py-8 bg-background-dark/50 border-b border-[#234548] backdrop-blur-md z-10"
    >
      <div class="flex flex-wrap items-center gap-6 flex-1 md:max-w-4xl">
        <h2 class="text-xl font-bold text-white whitespace-nowrap">
          Adoption Board
        </h2>
        <div class="relative flex-1 max-w-md">
          <span
            class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
            >search</span
          >
          <input
            v-model="search"
            class="w-full bg-[#1c3639] text-white text-sm rounded-lg pl-10 pr-4 py-2"
            placeholder="Search applicants or pets..."
            type="text"
          />
        </div>
        <div class="flex items-center gap-3">
          <select
            v-model="statusFilter"
            class="bg-[#1c3639] text-xs text-white rounded px-2 py-2"
          >
            <option value="all">All</option>
            <option value="pending">New</option>
            <option value="interview">Interview</option>
            <option value="home_visit">Home Visit</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
         
        </div>
      </div>
     
    </header>
    <!-- Kanban Content Area -->
    <div
      class="flex-1 overflow-x-auto bg-[#0d1a1b] p-4 sm:p-6 flex gap-6 w-full"
    > 
      <!-- Column: New Application -->
     <KanbanColumn
  title="New"
  status="pending"
  :items="grouped.pending"
   @open-details="openSidebar"
  @change-status="handleStatusChange"
/>

<KanbanColumn
  title="Approved"
  status="approved"
  :items="grouped.approved"
   @open-details="openSidebar"
  @change-status="handleStatusChange"
/>

<kanban-column
  title="Rejected"
  status="rejected"
  :items="grouped.rejected"
   @open-details="openSidebar"
  @change-status="handleStatusChange"
/>
    </div>
    <!-- OVERLAY -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
    ></div>

  <sidebar-adoption
  :adoption="selectedAdoption"
  :open="sidebarOpen"
  @close="closeSidebar"
  @approve="approveApplication"
  @reject="rejectApplication"
/>
  </main>
</template>

