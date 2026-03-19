<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { supabase } from "../../config/supabase";
import CardPet from "../../components/DashBoard/pets/CardPet.vue";
import EditPetModal from "../../components/DashBoard/pets/EditPetModal.vue";
import CreatePetModal from "../../components/DashBoard/pets/CreatePetModal.vue";
import ViewPet from "../../components/DashBoard/pets/viewPet.vue";
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
const pets = ref<any[]>([]);
const loading = ref(false);
const page = ref(0);
const limit = 10;
const hasMore = ref(true);
const getFilteredPetsBySpecies = () => {
  if (filterSpecies.value === "all") return pets.value

  return pets.value.filter(
    (pet) => pet.especie?.toLowerCase() === filterSpecies.value
  )
}
const selectedPet = ref<any | null>(null);
const showEdit = ref(false);
const showView = ref(false);
const showCreate = ref(false);
const renderKey = ref(0);
// filtros
const filterSpecies = ref("all");
const filterAge = ref("all");
const filterStatus = ref("all");
const getAgeNumber = (edad: string | null) => {
  if (!edad) return 0;

  const match = edad.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};
// traer pets con doctor y adoption
const fetchPets = async () => {
  if (!hasMore.value) return;

  loading.value = true;

  const from = page.value * limit;
  const to = from + limit - 1;

  let query = supabase.from("animals").select(`*`).range(from, to);

  if (filterSpecies.value !== "all") {
    query = query.eq("especie", filterSpecies.value);
  }

  if (filterStatus.value !== "all") {
    query = query.eq("status", filterStatus.value);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
  } else {
    let filteredData = data;

    // 🔥 FILTRO POR EDAD (intervalos)
    if (filterAge.value !== "all") {
      filteredData = data.filter((pet: any) => {
        const age = getAgeNumber(pet.edad);

        if (filterAge.value === "Young") {
          return age >= 0 && age <= 2;
        }

        if (filterAge.value === "Adult") {
          return age >= 3 && age <= 7;
        }

        if (filterAge.value === "Senior") {
          return age >= 8;
        }

        return true;
      });
    }

    if (filteredData.length < limit) {
      hasMore.value = false;
    }

    pets.value.push(...filteredData.sort((a, b) => a.nombre.localeCompare(b.nombre)));
    pets.value = pets.value.sort((a, b) => a.nombre - b.nombre)
    page.value++;
  }

  loading.value = false;
};

onMounted(() => {
  fetchPets();
  fetchStats();
});

// scroll infinito
const handleScroll = () => {
  const bottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

  if (bottom && !loading.value) {
    fetchPets();
  }
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

// editar
const openEdit = (pet: any) => {
  selectedPet.value = pet;
  showEdit.value = true;
};
// ===== STATS =====
const showExport = ref(false)
const totalAnimals = ref(0);
const totalAvailable = ref(0);
const totalAdopted = ref(0);
const totalPending = ref(0);
const displayTotal = ref(0);
const displayAvailable = ref(0);
const displayMedical = ref(0);
const displayPending = ref(0);
const statsVisible = ref(false);
const availableItem = ref("Disponible")
const fetchStats = async () => {
  // Total general
  const { count: total } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true });

  // Available
  const { count: available } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true })
    .eq("status", availableItem.value);

  // Medical Care
  const { count: medical } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true })
    .eq("status", "Adoptado");
  const { count: pending } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true })
    .eq("status", "Pendiente");
  const { count: proceso } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true })
    .eq("status", "En proceso");
  totalAnimals.value = total || 0;
  totalAvailable.value = available || 0;
  totalAdopted.value = medical || 0;
  totalPending.value = Number(pending) + Number(proceso) || 0;

  animateCounters();
  statsVisible.value = true;
};
// refresh
const refreshPets = async () => {
  pets.value = [];
  page.value = 0;
  hasMore.value = true;
  renderKey.value++;
  await fetchPets();
};

const speciesOptions = ["Dog", "Cat", "Bird", "Others"];
const statusOptions = ["Disponible", "Adopted", "Adoptado", "En proceso", "Pendiente", "Medical Care"];

const showSpecies = ref(false);
const showStatus = ref(false);

const selectSpecies = (value: string) => {
  filterSpecies.value = value.toLowerCase();
  showSpecies.value = false;
  refreshPets();
};

const selectStatus = (value: string) => {
  filterStatus.value = value;
  showStatus.value = false;
  refreshPets();
};

const selectAge = (value: string) => {
  filterAge.value = value;
  refreshPets();
};
const animateValue = (target: number, displayRef: any) => {
  let start = 0;
  const duration = 800;
  const increment = target / (duration / 16);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      displayRef.value = target;
      clearInterval(counter);
    } else {
      displayRef.value = Math.floor(start);
    }
  }, 16);
};

const animateCounters = () => {
  animateValue(totalAnimals.value, displayTotal);
  animateValue(totalAvailable.value, displayAvailable);
  animateValue(totalAdopted.value, displayMedical);
  animateValue(totalPending.value, displayPending);
};
const exportExcel = () => {
  const data = getFilteredPetsBySpecies()

  const formatted = data.map((pet) => ({
    Nombre: pet.nombre,
    Especie: pet.especie,
    Raza: pet.raza,
    Edad: pet.edad,
    Estado: pet.status,
    Color: pet.color
  }))

  const worksheet = XLSX.utils.json_to_sheet(formatted)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, "Pets")

  XLSX.writeFile(workbook, `pets_${filterSpecies.value}.xlsx`)
}
const exportCSV = () => {
  const data = getFilteredPetsBySpecies()

  const worksheet = XLSX.utils.json_to_sheet(data)
  const csv = XLSX.utils.sheet_to_csv(worksheet)

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  link.href = URL.createObjectURL(blob)
  link.download = `pets_${filterSpecies.value}.csv`
  link.click()
}
const viewPet = ref<any | null>(null);
const openView = (pet: any) => {
  viewPet.value = pet;
  showView.value = true;
}
console.log(viewPet.value)
const exportPDF = () => {
  const doc = new jsPDF()

  const primaryColor = '#14b8a6'
  const darkText = '#1f2937'
  const grayText = '#6b7280'

  const pageWidth = doc.internal.pageSize.width

  // header
  doc.setFillColor(245, 247, 250)
  doc.rect(0, 0, pageWidth, 40, "F")

  doc.setFillColor(primaryColor)
  doc.roundedRect(15, 12, 14, 14, 3, 3, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(darkText)
  doc.text("PETCARE", 35, 20)

  doc.setFontSize(9)
  doc.setTextColor(grayText)
  doc.text("MANAGEMENT PLATFORM", 35, 26)

  doc.setFontSize(14)
  doc.setTextColor(primaryColor)
  doc.text("Pets Report", pageWidth - 15, 18, { align: "right" })

  doc.setFontSize(9)
  doc.setTextColor(darkText)
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    pageWidth - 15,
    26,
    { align: "right" }
  )

  doc.setDrawColor(primaryColor)
  doc.line(15, 36, pageWidth - 15, 36)

  // 📊 DATA
  const data = getFilteredPetsBySpecies()

  const tableData = data.map((pet) => [
    pet.nombre,
    pet.especie,
    pet.raza,
    pet.edad,
    pet.status
  ])

  autoTable(doc, {
    startY: 45,
    head: [["Name", "Species", "Breed", "Age", "Status"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: primaryColor,
      textColor: 255,
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: [240, 252, 255]
    },
    styles: {
      fontSize: 9,
      cellPadding: 4
    }
  })

  doc.save("petcare_report.pdf")
}
</script>

<template>
  <section class="flex flex-col gap-6">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl text-white text-left font-extrabold text-slate-900 dark:text-white">
          Pets Database
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">
          Total of {{ displayTotal.toLocaleString() }} pets registered in the
          system
        </p>
      </div>
      <!-- Quick Stats -->
      <div class="flex gap-4 overflow-x-auto pb-2 md:pb-0">
        <div class="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl border border-primary/10">
          <div class="size-2 rounded-full bg-emerald-500"></div>
          <span class="text-sm font-medium text-white">{{ displayAvailable }} Available</span>
        </div>
        <div class="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl border border-primary/10">
          <div class="size-2 rounded-full bg-red-500"></div>
          <span class="text-sm font-medium text-white">{{ displayMedical }} Adopted</span>
        </div>
        <div class="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-xl border border-primary/10">
          <div class="size-2 rounded-full bg-amber-500"></div>
          <span class="text-sm font-medium text-white">{{ displayPending }} Medical Care</span>
        </div>
      </div>
    </div>
    <!-- Toolbar -->
    <div class="flex flex-col gap-4  top-[73px] z-40 bg-background-dark py-2">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          Filters:
        </span>

        <!-- Species Dropdown -->
        <div class="relative">
          <button @click="showSpecies = !showSpecies"
            class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-all">
            Species: {{ filterSpecies === "all" ? "All" : filterSpecies }}
            <span class="material-symbols-outlined text-lg">
              keyboard_arrow_down
            </span>
          </button>

          <div v-if="showSpecies"
            class="absolute mt-2 w-40 bg-background-dark border border-primary/20 rounded-xl shadow-xl z-50">
            <button @click="selectSpecies('all')"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              All
            </button>
            <button v-for="sp in speciesOptions" :key="sp" @click="selectSpecies(sp)"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              {{ sp }}
            </button>
          </div>
        </div>

        <!-- Age Chips -->
        <div class="flex items-center gap-2">
          <button @click="selectAge('all')" :class="filterAge === 'all'
            ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20'
            : 'bg-primary/10 text-slate-400 hover:bg-primary/10'
            " class="px-4 py-1.5 rounded-full text-sm transition-all">
            All Ages
          </button>

          <button @click="selectAge('Young')" :class="filterAge === 'Young'
            ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20'
            : 'bg-primary/10 text-slate-400 hover:bg-primary/10'
            " class="px-4 py-1.5 rounded-full text-sm transition-all">
            Young
          </button>

          <button @click="selectAge('Adult')" :class="filterAge === 'Adult'
            ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20'
            : 'bg-primary/10 text-slate-400 hover:bg-primary/10'
            " class="px-4 py-1.5 rounded-full text-sm transition-all">
            Adult
          </button>

          <button @click="selectAge('Senior')" :class="filterAge === 'Senior'
            ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20'
            : 'bg-primary/10 text-slate-400 hover:bg-primary/10'
            " class="px-4 py-1.5 rounded-full text-sm transition-all">
            Senior
          </button>
        </div>

        <div class="h-6 w-px bg-primary/10 mx-2"></div>

        <!-- Status Dropdown -->
        <div class="relative">
          <button @click="showStatus = !showStatus"
            class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/10 text-slate-300 text-sm font-semibold hover:border-primary/40 transition-colors duration-400"
            :class="showStatus == true || filterStatus !== 'all' ? 'text-primary border-primary' : ''">
            Status: {{ filterStatus === "all" ? "All" : filterStatus }}
            <span class="material-symbols-outlined text-lg">tune</span>
          </button>

          <div v-if="showStatus"
            class="absolute mt-2 w-44 bg-background-dark border border-primary/20 rounded-xl shadow-xl z-50">
            <button @click="selectStatus('all')"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              All
            </button>
            <button v-for="st in statusOptions" :key="st" @click="selectStatus(st)"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              {{ st }}
            </button>
          </div>
        </div>
        <div class="relative">
          <button @click="showExport = !showExport"
            class="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-background-dark text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            Export
            <span class="material-symbols-outlined text-lg ">download</span>
          </button>

          <div v-if="showExport"
            class="absolute right-0 mt-2 w-44 bg-background-dark border border-primary/20 rounded-xl shadow-xl z-50">
            <button @click="exportExcel(); showExport = false"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              Export Excel
            </button>

            <button @click="exportCSV(); showExport = false"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              Export CSV
            </button>

            <button @click="exportPDF(); showExport = false"
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm text-white">
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Cards -->
    <TransitionGroup :key="renderKey" name="list" tag="div" class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      <CardPet v-for="(pet, index) in pets " :key="pet.id" :pet="pet" :style="{ transitionDelay: `${index * 80}ms` }"
        @edit="openEdit" @view="openView" />
    </TransitionGroup>

    <div v-if="loading" class="text-center py-6 w-full justify-center flex">
      <div class="loader"></div>
    </div>

    <!-- Modals -->
    <EditPetModal v-if="showEdit" :pet="selectedPet" @close="showEdit = false" @updated="refreshPets" />
    <ViewPet :pet="viewPet" @close="showView = false" v-if="showView" />
    <CreatePetModal v-if="showCreate" @close="showCreate = false" @created="refreshPets" />
    <div class="fixed bottom-8 right-8 z-[60]">
      <button @click="showCreate = true"
        class="group relative flex items-center justify-center size-14 bg-primary text-background-dark rounded-full shadow-2xl shadow-primary/40 hover:scale-110 hover:rotate-90 transition-all duration-300">
        <span class="material-symbols-outlined text-3xl font-bold"> add </span>

        <!-- Tooltip -->
        <span
          class="absolute right-full mr-4 px-3 py-1.5 bg-background-dark text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/20 pointer-events-none">
          Add New Pet
        </span>
      </button>
    </div>
  </section>
</template>
<style lang="css" scoped>
.stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.bg-primary\/5 {
  background-color: rgb(19 218 236 / 0.05);
}

.border-primary\/10 {
  border-color: rgb(19 218 236 / 0.1);
}

.bg-primary\/5:hover {
  background-color: rgb(19 218 236 / 0.08);
}

.bg-background-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(16 32 34 / var(--tw-bg-opacity, 1));
}

.border-primary {
  border: 1px solid rgb(19 218 236 / var(--tw-text-opacity, 1));
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(19 218 236 / var(--tw-text-opacity, 1));
}

.bg-primary\/10 {
  background-color: rgb(19 218 236 / 0.1);
}

.border-primary\/20 {
  border-color: rgb(19 218 236 / 0.2);
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(19 218 236 / var(--tw-bg-opacity, 1));
}

.text-background-dark {
  --tw-text-opacity: 1;
  color: rgb(16 32 34 / var(--tw-text-opacity, 1));
}

/* HTML: <div class="loader"></div> */
.loader {
  width: 150px;
  --b: 8px;
  aspect-ratio: 1;
  text-align: center;

  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: 1px;
  background: conic-gradient(#0000 10%, rgb(19 218 236 / var(--tw-bg-opacity, 1))) content-box;
  -webkit-mask:
    repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
    radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: l4 1s infinite steps(10);
}

@keyframes l4 {
  to {
    transform: rotate(1turn)
  }
}
</style>
