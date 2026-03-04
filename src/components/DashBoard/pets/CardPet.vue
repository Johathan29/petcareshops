<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

const props = defineProps<{ pet: any }>()
const emit = defineEmits(["edit", "view"])

const isVisible = ref(false)
const cardRef = ref<HTMLElement | null>(null)

const isAdopted = computed(() =>
  props.pet.status?.toLowerCase() === "adoptado"
)

const statusConfig = computed(() => {
  const status = props.pet.status?.toLowerCase()

  if (status === "available" || status === "disponible") {
    return {
      classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: "check_circle"
    }
  }

  if (status === "adopted" || status === "adoptado") {
    return {
      classes: "bg-red-500/10 text-red-400 border-blue-500/30",
      icon: "verified"
    }
  }

  if (status === "medical care") {
    return {
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      icon: "health_and_safety"
    }
  }

  return {
    classes: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    icon: "info"
  }
})

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  if (cardRef.value) observer.observe(cardRef.value)
})
</script>

<template>
  <div
    ref="cardRef"
    :class="[
      'relative group flex items-center gap-6 p-4 rounded-xl border transition-all duration-700 overflow-hidden',
      isAdopted
        ? 'bg-blue-500/5 border-blue-500/20'
        : 'bg-primary/5 border-primary/10 hover:border-primary/40 hover:bg-primary/[0.08]',
      isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
    ]"
  >

    <!-- 🎀 Ribbon Adopted -->
    <div
      v-if="isAdopted"
      class="absolute -top-2 -right-10 rotate-45 bg-blue-500 text-xs font-bold px-12 py-1 shadow-lg"
    >
      ADOPTED
    </div>

    <!-- 🔒 Overlay LOCKED -->
    <div
      v-if="isAdopted"
      class="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20"
    >
      <div class="flex flex-col items-center text-blue-400 animate-pulse">
        <span class="material-symbols-outlined text-4xl">
          lock
        </span>
        <span class="text-xs font-bold tracking-widest mt-1">
          LOCKED
        </span>
      </div>
    </div>

    <!-- Image -->
    <div class="size-20 shrink-0 rounded-lg overflow-hidden relative z-10">
      <img
        :src="pet.imagen"
        :alt="pet.nombre"
        :class="[
          'w-full h-full object-cover transition-transform duration-500',
          !isAdopted && 'group-hover:scale-110',
          isAdopted && 'grayscale opacity-70'
        ]"
      />
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0 text-left z-10">
      <div class="flex items-center gap-3 mb-1">
        <h3 class="text-lg font-bold truncate text-white">
          {{ pet.nombre }}
        </h3>

        <!-- 🏷 Badge con icono -->
        <span
          :class="[
            'flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border',
            statusConfig.classes
          ]"
        >
          <span class="material-symbols-outlined text-[14px]">
            {{ statusConfig.icon }}
          </span>
          {{ pet.status }}
        </span>
      </div>

      <p class="text-sm text-slate-400">
        {{ pet.raza }} • {{ pet.edad }}
      </p>
    </div>

    <!-- Actions -->
    <div
      class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white z-10"
    >
      <button
        @click.stop="!isAdopted && emit('edit', pet)"
        :disabled="isAdopted"
        :class="[
          'p-2 rounded-lg border transition-all',
          isAdopted
            ? 'border-slate-700 bg-[#102022] text-slate-600 cursor-not-allowed opacity-40'
            : 'border-[#f0f8ff29] bg-[#102022] hover:text-primary hover:scale-110'
        ]"
      >
        <span class="material-symbols-outlined text-xl">
          edit
        </span>
      </button>

      <button
        @click.stop="emit('view', pet)"
        class="p-2 rounded-lg border border-[#f0f8ff29] bg-[#102022] hover:text-primary hover:scale-110 transition-all"
      >
        <span class="material-symbols-outlined text-xl">
          visibility
        </span>
      </button>
    </div>

  </div>
</template>