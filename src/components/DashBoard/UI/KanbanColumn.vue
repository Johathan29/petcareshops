<script setup lang="ts">
interface AdoptionItem {
  id: string;
  status: string;
  created_at: string;
  pet?: any;
  user?: any;
}

const props = defineProps<{
  title: string;
  status: string;
  items: AdoptionItem[];
}>();

const emit = defineEmits(["open-details", "change-status"]);

const isUrgent = (date: string) => {
  const created = new Date(date).getTime();
  const now = new Date().getTime();
  return (now - created) / (1000 * 60 * 60 * 24) <= 3;
};

const changeStatus = (item: AdoptionItem, newStatus: string) => {
  emit("change-status", { item, newStatus });
};
</script>

<template>
  <div class="flex flex-col gap-4 min-w-[280px]">
    <div class="flex items-center gap-2">
      <h3 class="font-bold text-slate-100">{{ title }}</h3>
      <span
        class="bg-[#234548] text-primary text-xs font-bold px-2 py-0.5 rounded-full"
      >
        {{ items.length }}
      </span>
    </div>

    <transition-group name="kanban" tag="div" class="flex flex-col gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        @click="$emit('open-details', item)"
        class="relative bg-[#0f1f24] rounded-xl p-4 shadow-md !border-l-[#13daec] border-y-2 border-y-transparent border-r-2 border-r-transparent transition-all duration-300 border-l-4 hover:border-y-2 hover:border-r-2 hover:border-l-4 hover:border-[#13daec]/30 cursor-pointer group"
      >
        <!-- TOP CONTENT -->
        <div class="flex gap-3 mb-3">
          <!-- PET IMAGE -->
          <div
            class="size-14 rounded-lg bg-cover bg-center shrink-0"
            :style="{
              backgroundImage: `url(${item.pet?.imagen || '/placeholder-pet.jpg'})`,
            }"
          ></div>

          <!-- INFO -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-white truncate">
              {{ item.pet?.nombre }}
            </h4>
            <p class="text-xs text-slate-400 truncate">
              Applicant: {{ item.user?.first_name }}
            </p>

            <!-- PROGRESS BAR -->
            <div
              class="mt-2 h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden"
            >
              <div
                class="h-full transition-all duration-500"
                :class="{
                  'w-full bg-[#13daec]': item.status === 'approved',
                  'w-0 bg-[#13daec]': item.status === 'new',
                  'w-full bg-red-500': item.status === 'rejected',
                  'w-1/2 bg-cyan-400': item.status === 'pending',
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- BOTTOM SECTION -->
        <div class="flex justify-between items-center text-xs mt-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-xs text-[#13daec]/30"
              >calendar_today</span
            >
            <!-- DATE -->
            <span class="text-[#13daec] font-medium">
              {{ new Date(item.created_at).toLocaleDateString() }}
            </span>
          </div>

          <!-- STATUS BADGE -->
          <span
            v-if="isUrgent(item.created_at)"
            class="px-2 py-0.5 bg-[#13daec]/20 text-[#13daec] rounded-md"
          >
            Follow-up </span
          ><!-- ACTION BUTTONS -->
          <div class="flex gap-2 ">
            <button
              v-if="item.status !== 'approved'"
              @click.stop="changeStatus(item, 'approved')"
              class="px-3 py-1 text-xs font-semibold bg-[#13daec]/10 border border-[#13daec] text-[#13daec] rounded-md transition hover:bg-[#13daec] hover:text-black"
            >
              Approve
            </button>

            <button
              v-if="item.status !== 'rejected'"
              @click.stop="changeStatus(item, 'rejected')"
              class="px-3 py-1 text-xs font-semibold bg-red-500/10 border border-red-400 text-red-400 rounded-md transition hover:bg-red-500 hover:text-white"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<style lang="css" scoped>
.kanban-move {
  transition: transform 0.25s ease;
}

.kanban-enter-active,
.kanban-leave-active {
  transition: all 0.25s ease;
}

.kanban-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.kanban-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.bg-card-dark {
  --tw-bg-opacity: 1;
  background-color: #1a2e30;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.cursor-grab {
  cursor: grab;
}

.text-primary {
  color: rgb(19 218 236 / 0.5);
}
.border-primary:hover {
  border-color: rgba(19, 218, 236, 0.678);
}

.hover\:ring-1:hover {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow:
    var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
}
</style>
