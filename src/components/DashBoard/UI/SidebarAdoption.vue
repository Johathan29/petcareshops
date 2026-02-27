<script setup lang="ts">
interface AdoptionItem {
  id: string
  status: string
  created_at: string
  pet?: any
  user?: any
}

const props = defineProps<{
  adoption: AdoptionItem | null
  open: boolean
}>()

const emit = defineEmits(["close", "approve", "reject"])

const isUrgent = (date: string) => {
  const created = new Date(date).getTime()
  const now = new Date().getTime()
  return (now - created) / (1000 * 60 * 60 * 24) <= 3
}
</script>
<template>
  <aside
    v-if="adoption"
    :class="[
      'fixed top-1/2 right-6 -translate-y-1/2',
      'w-full max-w-md glass-card rounded-2xl shadow-2xl',
      'overflow-hidden border border-slate-200 dark:border-teal-900/30',
      'flex flex-col max-h-[90vh] transition-all duration-300 z-50',
      open ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
    ]"
  >

    <!-- HEADER -->
    <div class="px-6 py-5 flex justify-between items-center border-b border-slate-200 dark:border-teal-900/50 bg-white/50 dark:bg-black/20 shrink-0">
      <div class="flex items-center gap-3">
        <span class="material-icons-round text-primary text-2xl">pets</span>
        <h1 class="text-xl font-bold tracking-tight">
          Adoption Review
        </h1>
      </div>

      <button
        @click="$emit('close')"
        class="p-2 hover:bg-slate-200 dark:hover:bg-teal-800/40 rounded-full transition-colors"
      >
        <span class="material-icons-round text-xl">close</span>
      </button>
    </div>

    <!-- BODY -->
    <div class="p-6 space-y-4 overflow-y-auto custom-scrollbar">

      <!-- PET CARD -->
      <div class="glass-card p-4 rounded-xl flex items-center gap-5 relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-300">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <span class="material-icons-round text-6xl">pets</span>
        </div>

        <div class="relative shrink-0">
          <img
            :src="adoption.pet?.imagen || '/placeholder-pet.jpg'"
            class="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20 shadow-lg"
          />
        </div>

        <div class="flex-1 min-w-0 z-10">
          <div class="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-teal-500 mb-1">
            Pet Information
          </div>

          <h2 class="text-lg font-bold truncate">
            {{ adoption.pet?.nombre }}
          </h2>

          <p class="text-slate-500 dark:text-slate-400 text-sm">
            {{ adoption.pet?.raza }}
          </p>
        </div>
      </div>

      <!-- USER CARD -->
      <div class="glass-card p-4 rounded-xl flex items-center gap-5 relative overflow-hidden group hover:border-teal-500/30 transition-colors duration-300">
        <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <span class="material-icons-round text-6xl">person</span>
        </div>

        <div class="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner shrink-0">
          <span class="material-icons-round text-4xl">person</span>
        </div>

        <div class="flex-1 min-w-0 z-10">
          <div class="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-teal-500 mb-1">
            Applicant
          </div>

          <h2 class="text-lg font-bold truncate">
            {{ adoption.user?.first_name }}
          </h2>

          <p class="text-slate-500 dark:text-slate-400 text-sm truncate">
            {{ adoption.user?.email }}
          </p>

          <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Phone: {{ adoption.user?.phone || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- STATUS / META CARD -->
      <div class="glass-card p-5 rounded-xl space-y-4">

        <!-- STATUS + DATE -->
        <div class="flex items-center justify-between border-b border-white/5 pb-3">

          <!-- STATUS -->
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="adoption.status === 'approved'
                ? 'bg-emerald-500/10 text-emerald-500'
                : adoption.status === 'rejected'
                ? 'bg-red-500/10 text-red-500'
                : 'bg-amber-500/10 text-amber-500'"
            >
              <span class="material-icons-round text-sm">verified</span>
            </div>

            <div>
              <p class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Status
              </p>

              <p class="font-bold text-sm uppercase"
                 :class="adoption.status === 'approved'
                    ? 'text-emerald-500'
                    : adoption.status === 'rejected'
                    ? 'text-red-500'
                    : 'text-amber-500'"
              >
                {{ adoption.status }}
              </p>
            </div>
          </div>

          <!-- DATE -->
          <div class="flex items-center gap-3 text-right">
            <div>
              <p class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Date
              </p>
              <p class="font-bold text-sm">
                {{ new Date(adoption.created_at).toLocaleDateString() }}
              </p>
            </div>

            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <span class="material-icons-round text-sm">calendar_today</span>
            </div>
          </div>
        </div>

        <!-- URGENCY -->
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="isUrgent(adoption.created_at)
                ? 'bg-red-500/10 text-red-500'
                : 'bg-amber-500/10 text-amber-500'"
            >
              <span class="material-icons-round text-sm">priority_high</span>
            </div>

            <div>
              <p class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Urgency
              </p>

              <p class="font-bold text-sm">
                {{ isUrgent(adoption.created_at) ? 'Urgent' : 'Normal' }}
              </p>
            </div>
          </div>

          <!-- Reviewer -->
          <div class="flex items-center gap-3 text-right">
            <div>
              <p class="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Reviewer
              </p>
              <p class="font-bold text-sm">
                Admin
              </p>
            </div>

            <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <span class="material-icons-round text-sm">admin_panel_settings</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ACTIONS -->
      <div class="pt-2 space-y-3">
        <button
          @click="$emit('approve', adoption)"
          class="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          <span class="material-icons-round group-hover:scale-110 transition-transform">
            check_circle
          </span>
          Approve Application
        </button>

        <button
          @click="$emit('reject', adoption)"
          class="w-full py-3.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2"
        >
          <span class="material-icons-round">cancel</span>
          Reject Application
        </button>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="px-6 py-3 bg-slate-50 dark:bg-black/30 text-center shrink-0 border-t border-slate-200 dark:border-teal-900/50">
      <p class="text-[10px] text-slate-500">
        ID: #{{ adoption.id }} • Audit Log Enabled
      </p>
    </div>

  </aside>
</template>
<style lang="css" scoped>
.glass-card {
            background: #0d1f1f;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
</style>