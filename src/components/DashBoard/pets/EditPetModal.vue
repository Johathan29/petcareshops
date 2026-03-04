<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { supabase } from "../../../config/supabase";
import { z } from "zod";
import AppModal from "../../UI/AppModal.vue";

interface Pet {
  id: string; // uuid
  created_at: string; // timestamp

  nombre?: string | null;
  raza?: string | null;
  color?: string | null;
  counter_like?: number | null;
  edad?: string | null;
  especie?: string | null;
  estado?: string | null;
  genero?: string | null;
  imagen?: string | null;
  microchip?: string | null;
  nacimiento?: string | null;
  peso?: string | null;
  status?: string | null;

  id_doctor: any[]; // jsonb array
  owner: any[];     // jsonb array

  registro?: string | null;
  fecha_inyeccion?: string | null;
}

const props = defineProps<{ pet: Pet | null }>();
const emit = defineEmits(["close", "updated"]);
console.log(props.pet?.imagen);
const form = ref<Pet>({
  id: props.pet?.id,
  nombre: "",
  especie: "",
  raza: "",
  genero: "",
  edad: "",
  peso: null,
  color: "",
 
  status: "Available",
  imagen: "",
});

const originalForm = ref<Pet | null>(null);
const loading = ref(false);

const imageFile = ref<File | null>(null);
const imagePreview = ref("");
const uploadProgress = ref(0);

const toast = ref<{ type: "success" | "error"; message: string } | null>(null);
const errors = ref<Record<string, string>>({});

/* =============================
   ZOD
============================= */
const petSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  species: z.string().min(2, "Species is required"),
  weight: z.number().nullable().optional(),
});

/* =============================
   LOAD DATA
============================= */
onMounted(()=>
imagePreview.value=props.pet?.imagen
)
watch(
  () => props.pet,
  (newPet) => {
    if (!newPet) return

    form.value.id = newPet.id
    form.value.nombre = props.pet?.nombre ?? ""
    form.value.especie = props.pet?.especie?? ""
    form.value.raza = props.pet?.raza ?? ""
    form.value.genero = props.pet?.genero ?? ""
    form.value.edad = props.pet?.edad ?? ""
    form.value.peso = props.pet?.peso ?? null
    form.value.color = props.pet?.color ?? ""
    //form.value.location = props.pet?.location ?? ""
    form.value.status = props.pet?.status ?? "Available"
    //form.value.health_status = newPet.health_status ?? ""
    form.value.imagen = props.pet?.imagen?? ""

    originalForm.value = JSON.parse(JSON.stringify(form.value))
    imagePreview.value = props.pet?.imagen ?? ""
  },
  { immediate: true }
)
/* =============================
   DETECT CHANGES
============================= */
const hasChanges = computed(() => {
  return (
    JSON.stringify(form.value) !== JSON.stringify(originalForm.value) ||
    imageFile.value !== null
  );
});

/* =============================
   IMAGE
============================= */
const handleFile = (file: File) => {
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.files[0]) handleFile(e.dataTransfer.files[0]);
};

const uploadImage = async () => {
  if (!imageFile.value) return form.value.imagen;

  const fileName = `animals/${Date.now()}-${imageFile.value.name}`;

  const { error } = await supabase.storage
    .from("animals")
    .upload(fileName, imageFile.value, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from("animals").getPublicUrl(fileName);

  return data.publicUrl;
};

/* =============================
   UPDATE
============================= */
const updatePet = async () => {
  errors.value = {};

  const validation = petSchema.safeParse(form.value);

  try {
    loading.value = true;

    const imageUrl = await uploadImage();

    const { error } = await supabase
      .from("animals")
      .update({
        ...form.value,
        imagen: imageUrl,
      })
      .eq("id", form.value.id);

    if (error) throw error;

    openConfirm({
  type: "success",
  title: "Updated Successfully",
  message: "The pet information was saved correctly.",
  confirmText: "OK",
  cancelText: "",
})

    setTimeout(() => {
      emit("updated");
      emit("close");
    }, 1000);
  } catch (err: any) {
   openConfirm({
  type: "error",
  title: "Update Failed",
  message: err.message || "Something went wrong.",
  confirmText: "Retry",
  cancelText: "Close",
})
  } finally {
    loading.value = false;
  }
};

/* =============================
   TOAST
============================= */
const showToast = (type: "success" | "error", message: string) => {
  toast.value = { type, message };
  setTimeout(() => (toast.value = null), 3000);
};

/* =============================
   CLOSE
============================= */
const showConfirmModal = ref(false)
type ConfirmType = "success" | "error" | "warning" | "info"

interface ConfirmOptions {
  type: ConfirmType
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

const confirmModal = ref<ConfirmOptions | null>(null)
const confirmClose = () => {
  showConfirmModal.value = false
  emit("close")
}
const handleKey = (e: KeyboardEvent) => {
  if (!confirmModal.value) return

  if (e.key === "Enter") {
    confirmModal.value.onConfirm?.()
    confirmModal.value = null
  }

  if (e.key === "Escape") {
    confirmModal.value = null
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKey)
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey)
})
const openConfirm = (options: ConfirmOptions) => {
  confirmModal.value = {
    confirmText: "Confirm",
    cancelText: "Cancel",
    ...options
  }
}
const attemptClose = () => {
  if (!hasChanges.value) {
    emit("close")
    return
  }

  openConfirm({
    type: "warning",
    title: "Unsaved Changes",
    message: "You have unsaved changes. If you leave now, your changes will be lost.",
    confirmText: "Leave Anyway",
    cancelText: "Stay",
    onConfirm: () => emit("close")
  })
}

</script>
<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
  >
    <div
      class="glass-modal w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl p-8 flex flex-col gap-8 animate-[scale-in_0.3s_ease-out]"
    >
      <!-- HEADER -->
      <div class="flex items-start justify-between">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">edit</span>
            Edit Pet
          </h2>
          <p class="text-slate-400 text-sm">
            Update the pet information in the database.
          </p>
        </div>

        <button
          @click="attemptClose"
          class="text-slate-500 hover:text-white transition-colors"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- FORM -->
      <form @submit.prevent="updatePet" class="flex flex-col gap-10">
        <!-- BASIC INFO -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex flex-col gap-4">
            <h3
              class="text-sm font-bold text-white border-b border-white/10 pb-2"
            >
              Basic Info
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <!-- IMAGE UPLOAD -->
              <div class="flex flex-col gap-3">
                <label
                  class="text-xs font-bold uppercase tracking-wider text-primary/70"
                >
                  Pet Photo
                </label>

                <div
                  class="relative w-full h-48 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer transition-all hover:border-primary/70"
                  @dragover.prevent
                  @drop="handleDrop"
                >
                  <div
                    v-if="imagePreview"
                    class="absolute inset-0 bg-cover bg-center rounded-xl"
                    :style="{ backgroundImage: `url(${imagePreview })` }"
                  ></div>

                  <div v-else class="text-center text-slate-400">
                    Drag & Drop or Click to Upload
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    @change="(e) => handleFile(e.target.files[0])"
                  />
                </div>

                <!-- Progress Bar -->
                <div
                  v-if="uploadProgress > 0 && uploadProgress < 100"
                  class="w-full bg-white/10 rounded-full h-2"
                >
                  <div
                    class="bg-primary h-2 rounded-full transition-all"
                    :style="{ width: uploadProgress + '%' }"
                  ></div>
                </div>
              </div>
              <div class="col-span-2">
                <label class="text-xs text-slate-400 mb-1 block"
                  >Pet Name</label
                >
                <input
                  v-model="form.nombre"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                  type="text" 
                />
              </div>

              <div>
                <label class="text-xs text-slate-400 mb-1 block">Species</label>
                <input
                  v-model="form.especie"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                  type="text"
                />
              </div>

              <div>
                <label class="text-xs text-slate-400 mb-1 block">Breed</label>
                <input
                  v-model="form.raza"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                  type="text"
                />
              </div>
            </div>
          </div>

          <!-- PHYSICAL DETAILS -->
          <div class="flex flex-col gap-4">
            <h3
              class="text-sm font-bold text-white border-b border-white/10 pb-2"
            >
              Physical Details
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-slate-400 mb-1 block">Gender</label>
                <select
                  v-model="form.genero"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                >
                  <option value="male" >Male</option>
                  <option value="female" >Female</option>
                </select>
              </div>

              <div>
                <label class="text-xs text-slate-400 mb-1 block">Age</label>
                <input
                  v-model="form.edad"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                  type="text"
                />
              </div>

              <div>
                <label class="text-xs text-slate-400 mb-1 block">Weight</label>
                <input
                  v-model.number="form.peso"
                  type="text"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <label class="text-xs text-slate-400 mb-1 block">Color</label>
                <input
                  v-model="form.color"
                  class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- STATUS -->
        <div class="flex flex-col gap-4">
          <h3
            class="text-sm font-bold text-white border-b border-white/10 pb-2"
          >
            Current Status
          </h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs text-slate-400 mb-1 block">Location</label>
              <input
               
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
                type="text"
              />
            </div>

            <div>
              <label class="text-xs text-slate-400 mb-1 block"
                >Adoption Status</label
              >
              <select
                v-model="form.status"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
              >
                <option value="Disponible">Available</option>
                <option value="En proceso">On Hold</option>
                <option value="Pendiente">Pending Adoption</option>
                <option value="Adoptado">Adopted</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-xs text-slate-400 mb-1 block"
              >Health Status</label
            >
            <textarea
              
              class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600 h-24 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- ACTIONS -->
        <div
          class="flex items-center justify-end gap-4 pt-6 border-t border-white/10"
        >
          <button
            type="button"
            @click="attemptClose"
            class="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="px-8 py-2.5 bg-primary text-background-dark rounded-lg text-sm font-extrabold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {{ loading ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Notification -->
  <!-- TOAST -->
  <div
    v-if="toast"
    class="fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-xl backdrop-blur-md border transition-all animate-[slide-up_0.3s_ease]"
    :class="
      toast.type === 'success'
        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
        : 'bg-rose-500/20 border-rose-400 text-rose-300'
    "
  >
    {{ toast.message }}
  </div>
  
<!-- UNIVERSAL CONFIRM MODAL -->
<div
  v-if="confirmModal"
  class="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
>
  <div
    class="w-full max-w-md rounded-2xl p-8 glass-modal flex flex-col gap-6 animate-[scale-in_0.25s_ease-out]"
  >
    <!-- ICON + TITLE -->
    <div class="flex items-start gap-4">
      <span
        class="material-symbols-outlined text-3xl"
        :class="{
          'text-emerald-400': confirmModal.type === 'success',
          'text-rose-400': confirmModal.type === 'error',
          'text-yellow-400': confirmModal.type === 'warning',
          'text-sky-400': confirmModal.type === 'info'
        }"
      >
        {{
          confirmModal.type === 'success' ? 'check_circle' :
          confirmModal.type === 'error' ? 'cancel' :
          confirmModal.type === 'warning' ? 'warning' :
          'info'
        }}
      </span>

      <div>
        <h3 class="text-lg font-bold text-white">
          {{ confirmModal.title }}
        </h3>
        <p class="text-slate-400 text-sm mt-1">
          {{ confirmModal.message }}
        </p>
      </div>
    </div>

    <!-- ACTIONS -->
    <div class="flex justify-end gap-4 pt-4 border-t border-white/10">
      <button
        v-if="confirmModal.cancelText"
        @click="confirmModal = null"
        class="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-colors"
      >
        {{ confirmModal.cancelText }}
      </button>

      <button
        @click="confirmModal.onConfirm?.(); confirmModal = null"
        class="px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all"
        :class="{
          'bg-emerald-500 shadow-emerald-500/20': confirmModal.type === 'success',
          'bg-rose-500 shadow-rose-500/20': confirmModal.type === 'error',
          'bg-yellow-500 shadow-yellow-500/20': confirmModal.type === 'warning',
          'bg-sky-500 shadow-sky-500/20': confirmModal.type === 'info'
        }"
      >
        {{ confirmModal.confirmText }}
      </button>
    </div>

    <!-- Keyboard Hint -->
    <div class="text-xs text-slate-500 text-right">
      Press Enter to confirm • Esc to cancel
    </div>
  </div>
</div>
</template>
<style lang="css" scoped>
.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(19 218 236 / var(--tw-bg-opacity, 1));
}
.text-background-dark {
  --tw-text-opacity: 1;
  color: rgb(16 32 34 / var(--tw-text-opacity, 1));
}
.glass-modal {
  background: rgba(18, 18, 18, 0.95);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(19, 218, 236, 0.3);
  box-shadow: 0 0 25px rgba(19, 218, 236, 0.15);
}
.text-primary {
  --tw-text-opacity: 1;
  color: rgb(19 218 236 / var(--tw-text-opacity, 1));
}
.border-primary:focus {
  --tw-border-opacity: 1;
  border: 1px solid;
  border-color: rgb(19 218 236 / var(--tw-border-opacity, 1)) !important;
}
</style>
