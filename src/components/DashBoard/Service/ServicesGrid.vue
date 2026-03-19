<template>
<TransitionGroup
  name="fade-up"
  tag="div"
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
>
  <div
    v-for="(service, index) in services"
    :key="service.id"
    class="group flex flex-col bg-card-dark border border-border-dark p-6 rounded-xl hover:border-[#00ced1] transition-all duration-300 hover:-translate-y-1 card-item"
    :style="{ transitionDelay: `${index * 80}ms` }"
  >
      <!-- Icon -->
      <div
        class="size-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        :class="[
          service.bg || 'bg-primary/10',
          service.color || 'text-primary',
        ]"
      >
        <FontAwesomeIcon
          :icon="getServiceIcon(service.icon)"
          class="text-3xl"
        />
      </div>

      <!-- Title -->
      <h3 class="text-white text-lg font-bold mb-2">{{ service.title }}</h3>

      <!-- Description -->
      <p class="text-slate-400 text-sm leading-relaxed mb-6">
        {{ service.description }}
      </p>

      <!-- Footer -->
      <div
        class="mt-auto pt-4 border-t border-border-dark flex flex-col justify-between items-center"
      >
        <div class="flex flex-col flex-wrap gap-1 mb-2">
          <div
            v-for="item in formatServiceData(service)"
            :key="item.proceso"
            class="flex justify-between gap-4 !text-sm"
          >
            <span class="text-primary text-left text-md font-black">
              {{ item.proceso }}
            </span>

            <span class="text-primary font-black">
              ${{ item.price }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between  py-4 mt-4 gap-2 border-border-dark  border-t w-full">
          <button
            @click="$emit('edit', service)"
            class="text-slate-500 hover:text-white transition-colors"
            title="Editar"
          >
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button
            @click="$emit('delete', service.id)"
            class="text-slate-500 hover:text-red-500 transition-colors"
            title="Eliminar"
          >
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="services.length === 0" class="col-span-full text-center py-12">
      <span class="material-symbols-outlined text-6xl text-slate-600 mb-4"
        >medical_services</span
      >
      <p class="text-slate-400 text-lg">No hay servicios registrados</p>
      <p class="text-slate-500 text-sm mt-2">
        Haz clic en "Agregar Servicio" para crear uno nuevo
      </p>
    </div>
</TransitionGroup>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { computed, onMounted } from "vue";

// Add all solid icons to the library
library.add(fas);

interface Service {
  id: number;
  title: string;
  description: string;
  link: string | null;
  bg: string | null;
  color: string | null;
  procesos: any[];
  icon: string;
  price?: [];
  category?: string;
}

defineProps<{
  services: Service[];
}>();

defineEmits<{
  (e: "edit", service: Service): void;
  (e: "delete", id: number): void;
}>();
const formatServiceData = (service: Service) => {
  return service.procesos.map((proceso, index) => ({
    proceso,
    price: service.price?.[index] ?? 0,
  }));
};
/* ------------------------------------
   Icon Resolver - Dynamic FontAwesome
------------------------------------ */
const allowedIcons = new Set([
  "heart",
  "dog",
  "scissors",
  "stethoscope",
  "paw",
  "syringe",
  "microscope", // ✅ correcto
]);
const getServiceIcon = (iconName: any) => {
  

  const normalized = String(iconName).toLowerCase();

  if (!allowedIcons.has(normalized)) {
    return faHeart;
  }

  return ["fas", normalized];
};
onMounted(() => {
  const cards = document.querySelectorAll(".card-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});
</script>

<style scoped>
.fade-up-enter-active {
  transition: all 0.4s ease;
}

.fade-up-enter-from {
  opacity: 1;
  transform: translateY(20px) scale(0.98);
}
.card-item {
  opacity: 1;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.card-item.show {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* cuando se eliminan */
.fade-up-leave-active {
  transition: all 0.25s ease;
  position: absolute;
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.bg-card-dark {
  --tw-bg-opacity: 1;
  background-color: #1a2e30;
}

.border-border-dark {
  --tw-border-opacity: 1;
  border-color: rgb(32 74 75 / var(--tw-border-opacity, 1));
}

.text-primary {
  color: rgb(0, 206, 209) !important;
}

.bg-primary\/10 {
  background-color: rgb(0, 206, 209 / 0.1);
}
.text-accent{
  color: bisque;
}
.bg-sage-light{
  background-color: rgba(16, 212, 147, 0.555);
}
.bg-terracotta-light{
  background-color: rgba(185, 152, 17, 0.37);
}
.bg-sky\/10{
background-color: skyblue;
}
.text-sky{
  color: rgb(9, 79, 107);
}
.fade-up-enter-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
