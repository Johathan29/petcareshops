<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../../../config/supabase";

const emit = defineEmits(["close", "created"]);

const form = ref({
  nombre: "",
  raza: "",
  especie: "",
  edad: "",
  status: "Available",
});

const createPet = async () => {
   const imageUrl = await uploadImage()
  const { error } =await supabase.from("animals").insert([
  {
    ...form.value,
    imagen: imageUrl
  }
])

  if (!error) {
    emit("created");
    emit("close");
  }
};
/* =============================
   IMAGE
============================= */
const imageFile = ref<File | null>(null);
const imagePreview = ref("");
const uploadProgress = ref(0);

const handleFile = (file: File) => {
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  if (e.dataTransfer?.files[0]) {
    handleFile(e.dataTransfer.files[0]);
  }
};

const uploadImage = async () => {
  if (!imageFile.value) return null;

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
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
  >
    <div
      class="glass-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl p-8 flex flex-col gap-8 animate-[scale-in_0.3s_ease-out]"
    >
      <!-- HEADER -->
      <div class="flex items-start justify-between">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">pets</span>
            New Pet
          </h2>
          <p class="text-slate-400 text-sm">Add a new pet to the database.</p>
        </div>

        <button
          @click="$emit('close')"
          class="text-slate-500 hover:text-white transition-colors"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- FORM -->
      <div class="flex flex-col gap-10">
        <!-- BASIC INFO -->
        <div class="flex flex-col gap-4">
          <h3
            class="text-sm font-bold text-white border-b border-white/10 pb-2"
          >
            Basic Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <!-- Preview -->
                <div
                  v-if="imagePreview"
                  class="absolute inset-0 bg-cover bg-center rounded-xl"
                  :style="{ backgroundImage: `url(${imagePreview})` }"
                ></div>

                <!-- Placeholder -->
                <div v-else class="text-center text-slate-400">
                  Drag & Drop or Click to Upload
                </div>

                <!-- File Input -->
                <input
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  @change="(e: any) => handleFile(e.target.files[0])"
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
            <div>
              <label class="text-xs text-slate-400 mb-1 block">
                Pet Name
              </label>
              <input
                v-model="form.nombre"
                placeholder="Enter pet name"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label class="text-xs text-slate-400 mb-1 block"> Breed </label>
              <input
                v-model="form.raza"
                placeholder="Enter breed"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label class="text-xs text-slate-400 mb-1 block"> Species </label>
              <input
                v-model="form.especie"
                placeholder="Enter species"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label class="text-xs text-slate-400 mb-1 block"> Age </label>
              <input
                v-model="form.edad"
                placeholder="Enter age"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label class="text-xs text-slate-400 mb-1 block"> Status </label>
              <select
                v-model="form.status"
                class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-1 ring-primary border-primary transition-all"
              >
                <option value="Available">Available</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Adoption">Pending Adoption</option>
                <option value="Adopted">Adopted</option>
              </select>
            </div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div
          class="flex items-center justify-end gap-4 pt-6 border-t border-white/10"
        >
          <button
            @click="$emit('close')"
            class="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            @click="createPet"
            class="px-8 py-2.5 bg-primary text-background-dark rounded-lg text-sm font-extrabold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Create Pet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-primary {
  background-color: rgb(19 218 236);
}
.text-background-dark {
  color: rgb(16 32 34);
}
.glass-modal {
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(19, 218, 236, 0.3);
  box-shadow: 0 0 25px rgba(19, 218, 236, 0.15);
}
.text-primary {
  color: rgb(19 218 236);
}
</style>
