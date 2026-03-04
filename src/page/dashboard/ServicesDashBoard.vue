<script setup lang="ts"></script>
<template>
  <section class="flex-1 max-w-[1200px] mx-auto w-full px-6 py-8">
    <!-- Page Title & CTA -->
    <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div class="space-y-1">
        <h1 class="text-white text-4xl font-black leading-tight tracking-tight">
          Services &amp; Pricing
        </h1>
        <p class="text-slate-400 text-sm">
          Manage your clinic's offerings and standard rates.
        </p>
      </div>
      <button
        class="flex items-center gap-2 px-6 py-2.5 bg-primary text-background-dark rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/10"
      >
        <span class="material-symbols-outlined text-[20px]">add</span>
        Add New Service
      </button>
    </div>
    <!-- Segmented Control Toggle -->
    <div class="flex mb-8">
      <div
        class="flex h-12 w-full max-w-md items-center rounded-xl bg-card-dark p-1.5 border border-border-dark shadow-inner"
      >
        <label
          class="flex flex-1 cursor-pointer h-full items-center justify-center rounded-lg transition-all text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-background-dark text-slate-400"
        >
          <span class="truncate">Standard Services</span>
          <input
            checked=""
            class="hidden"
            name="service-type"
            type="radio"
            value="standard"
          />
        </label>
        <label
          class="flex flex-1 cursor-pointer h-full items-center justify-center rounded-lg transition-all text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-background-dark text-slate-400"
        >
          <span class="truncate">Premium Packages</span>
          <input
            class="hidden"
            name="service-type"
            type="radio"
            value="premium"
          />
        </label>
      </div>
    </div>
    <!-- Service Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
      <!-- Card 1 -->
      <div
        class="group flex flex-col bg-card-dark border border-border-dark p-6 rounded-xl hover:border-[#00ced10e]0 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-primary text-3xl"
            >stethoscope</span
          >
        </div>
        <h3 class="text-white text-lg font-bold mb-2">Consultation</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          General health check-up, vitals monitoring, and pet wellness
          assessment.
        </p>
        <div
          class="mt-auto pt-4 border-t border-border-dark flex justify-between items-center"
        >
          <span class="text-primary text-2xl font-black">$45.00</span>
          <button class="text-slate-500 hover:text-white">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
      <!-- Card 2 -->
      <div
        class="group flex flex-col bg-card-dark border border-border-dark p-6 rounded-xl hover:border-[#00ced10e]0 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-primary text-3xl"
            >vaccines</span
          >
        </div>
        <h3 class="text-white text-lg font-bold mb-2">Vaccinations</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          Core vaccinations including Rabies, Distemper, and seasonal boosters.
        </p>
        <div
          class="mt-auto pt-4 border-t border-border-dark flex justify-between items-center"
        >
          <span class="text-primary text-2xl font-black">$60.00</span>
          <button class="text-slate-500 hover:text-white">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
      <!-- Card 3 -->
      <div
        class="group flex flex-col bg-card-dark border border-border-dark p-6 rounded-xl hover:border-[#00ced10e]0 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-primary text-3xl"
            >memory</span
          >
        </div>
        <h3 class="text-white text-lg font-bold mb-2">Microchipping</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          ISO standard identification chip implant and global registry
          enrollment.
        </p>
        <div
          class="mt-auto pt-4 border-t border-border-dark flex justify-between items-center"
        >
          <span class="text-primary text-2xl font-black">$35.00</span>
          <button class="text-slate-500 hover:text-white">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
      <!-- Card 4 -->
      <div
        class="group flex flex-col bg-card-dark border border-border-dark p-6 rounded-xl hover:border-[#00ced10e]0 transition-all duration-300 hover:-translate-y-1"
      >
        <div
          class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        >
          <span class="material-symbols-outlined text-primary text-3xl"
            >content_cut</span
          >
        </div>
        <h3 class="text-white text-lg font-bold mb-2">Basic Grooming</h3>
        <p class="text-slate-400 text-sm leading-relaxed mb-6">
          Standard wash, brush, nail trimming, and sanitary hygiene clip.
        </p>
        <div
          class="mt-auto pt-4 border-t border-border-dark flex justify-between items-center"
        >
          <span class="text-primary text-2xl font-black">$50.00</span>
          <button class="text-slate-500 hover:text-white">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Recent Transactions Section -->
    <section
      class="bg-card-dark rounded-xl border border-border-dark overflow-hidden flex flex-col max-h-[500px]"
    >
      <div
        class="px-6 py-5 border-b border-border-dark flex items-center justify-between sticky top-0 bg-card-dark z-10"
      >
        <h2 class="text-white text-xl font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">history</span>
          Recent Service Transactions
        </h2>
        <button class="text-primary text-sm font-medium hover:underline">
          View All History
        </button>
      </div>
      <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
        <table class="w-full text-left border-collapse">
          <thead
            class="bg-background-dark/50 text-slate-400 text-xs uppercase tracking-wider sticky top-0"
          >
            <tr>
              <th class="px-6 py-3 font-semibold">Pet &amp; Owner</th>
              <th class="px-6 py-3 font-semibold">Service</th>
              <th class="px-6 py-3 font-semibold">Date</th>
              <th class="px-6 py-3 font-semibold">Amount</th>
              <th class="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#204a4b]">
            <!-- Row 1 -->
            <tr class="hover:bg-[#00ced10e] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                    data-alt="Beagle dog profile"
                    style="
                      background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBS1NcBHA8MCuAFHlySwcwnTrhQVxAB3h_oTmdVdXskQF29TMvc7JHpO2fal4H0Igqg_zZ51voTX4FrxclTGfqx9ZR-CBBLCcET7_iTw-T1u7Lv6MMxtDMKaWRwbERQVJonynSm-nRABU5nzAkA5m1VxfKhEFqrEU-SH6jfr1r2XVkEvLbIkk2Rm99Fc61siLjUjM0RyHGpYTZhPBGhmq3z8RIBxdsyxKWCbCVyLZoAY1aMDmLPNhYeo0OG20H2kTPb0WA8L82M_g&quot;);
                    "
                  ></div>
                  <div>
                    <p class="text-white text-sm font-bold">Buddy</p>
                    <p class="text-slate-500 text-xs">James Miller</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-300">Vaccinations</td>
              <td class="px-6 py-4 text-sm text-slate-300">Today, 10:45 AM</td>
              <td class="px-6 py-4 text-sm font-bold text-primary">$60.00</td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter"
                  >Completed</span
                >
              </td>
            </tr>
            <!-- Row 2 -->
            <tr class="hover:bg-[#00ced10e] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                    data-alt="Black cat profile"
                    style="
                      background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuD7n_cF3LjExi9xrjvxqyYO25TGwsex6_pfG7nTYgqsXzYKz3-bXGrG-u9EgafnhZafmOY8vmo2tDUb-ou1SenC2KFa20EWTrd6zkqhx1rauR_LnC2pPYATKBcgVkarT05pyMJ6578k-U-VuaYp-Y5Aa2OdiXNZHHNEJVS07NUNjgwaQHe6aUan8JIr8xyPEAgnhnI2CxR-zVA3Vrqa_0HkIpaSjD_oDi_YkU-1KJ_CdJuNl0S6rcmHp8m6KTrlyVaCEbUR0LD50Q&quot;);
                    "
                  ></div>
                  <div>
                    <p class="text-white text-sm font-bold">Luna</p>
                    <p class="text-slate-500 text-xs">Sarah Chen</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-300">Dental Surgery</td>
              <td class="px-6 py-4 text-sm text-slate-300">Today, 09:15 AM</td>
              <td class="px-6 py-4 text-sm font-bold text-primary">$285.00</td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-tighter"
                  >In Progress</span
                >
              </td>
            </tr>
            <!-- Row 3 -->
            <tr class="hover:bg-[#00ced10e] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                    data-alt="Golden Retriever profile"
                    style="
                      background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuCv80wSd2Jdgm1A922aHGVrWetFR-i3f2cp7fHOTHGGq7SoF2bYnllFUd7GK5m5qpXKO4xCBcvpHDwXGXrAaU7aq4hoDbvzk0TP-ryxIPo1RHDWPo6WY2Alt2OeYXJ_jnYMOlnNiUE0857FRr8Gu_3XC7Gz9h99E6zwZKPN2KwUjFh8224GeuSS7SVokRWoWL5JZx4OiQN_jlh2KPMv9RfEr4-58eS6Zow9VrtDHTuVPRy25szCwMDCEJIKRPb7WLWp2jpeo4cmQg&quot;);
                    "
                  ></div>
                  <div>
                    <p class="text-white text-sm font-bold">Max</p>
                    <p class="text-slate-500 text-xs">Robert Brown</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-300">Consultation</td>
              <td class="px-6 py-4 text-sm text-slate-300">Yesterday</td>
              <td class="px-6 py-4 text-sm font-bold text-primary">$45.00</td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter"
                  >Completed</span
                >
              </td>
            </tr>
            <!-- Row 4 -->
            <tr class="hover:bg-[#00ced10e] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                    data-alt="Husky dog profile"
                    style="
                      background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBWvBD3V1VMiWinjS9jFiXpHpQZskg6tCEzq0q5FhbvugLGYfqIENIJgvl8U5dwfiEz4we96Tko0284iJgAC54Uf004eG_tmgIw7bjz0djWH7rKDe6QmLk5CJmlctVM6I_HGmDj2kE5q972b9YfbWkA2fa2t_c3MlVbTX2tml7BHSiCUfP36k3FsKKP85y2yxvRubWm021nbR167QvkQbJx8EBPIMD5ZyrIfBmJYF8jrKL3rrLLDtHHfUi7unQ4REFreUDA6mHNxQ&quot;);
                    "
                  ></div>
                  <div>
                    <p class="text-white text-sm font-bold">Ghost</p>
                    <p class="text-slate-500 text-xs">Elena Vance</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-300">Microchipping</td>
              <td class="px-6 py-4 text-sm text-slate-300">Yesterday</td>
              <td class="px-6 py-4 text-sm font-bold text-primary">$35.00</td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-tighter"
                  >Completed</span
                >
              </td>
            </tr>
            <!-- Row 5 -->
            <tr class="hover:bg-[#00ced10e] transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-10 rounded-full bg-border-dark overflow-hidden bg-cover"
                    data-alt="Persian cat profile"
                    style="
                      background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuAMM3IKH9dFBWiwh6CQiMARc_CCNKuk1BY4QO-Pm8yG54dP30k0vJ7m2C20Xk917GbutabQPdmEX0sWh4zsqz9PogUrdmtR5jkZ2W71hMWFvyNzmlc40iBUOdZW0urGykKeswj5eoseH0HJ86hc3GCxbNCfRjGZSjAaJje1xQhP8Kdehlz_Rvswos6gYXPi1_npQ4dpz2G6dbpzfZUoUzCyUmKapzQvdE96-gP08ZV1_iX8XxHFcSkmwRKMISdUnnThWMM7SxKLug&quot;);
                    "
                  ></div>
                  <div>
                    <p class="text-white text-sm font-bold">Misty</p>
                    <p class="text-slate-500 text-xs">Olivia Wilde</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-300">Grooming (Full)</td>
              <td class="px-6 py-4 text-sm text-slate-300">Oct 24, 2023</td>
              <td class="px-6 py-4 text-sm font-bold text-primary">$75.00</td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-tighter"
                  >Cancelled</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
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
  color: rgb(19, 218, 236)!important;
}
.border-primary:hover {
  border-color: rgba(19, 218, 236, 0.678);
}
.border-border-dark {
    --tw-border-opacity: 1;
    border-color: rgb(32 74 75 / var(--tw-border-opacity, 1));
}
.hover\:border-primary\/50:hover {
    border-color: rgb(0 206 209 / 0.5);
}
.has-\[\:checked\]\:text-background-dark:has(:checked) {
    --tw-text-opacity: 1;
    color: rgb(15 35 35 / var(--tw-text-opacity, 1));
}
.has-\[\:checked\]\:bg-primary:has(:checked) {
    --tw-bg-opacity: 1;
    background-color: rgb(0 206 209 / var(--tw-bg-opacity, 1));
}
.bg-background-dark\/50 {
    background-color: rgb(15 35 35 / 0.5);
}
.hover:\.bg-primary\/5
 {
    background-color: #00ced10e;
}
.text-background-dark {
    --tw-text-opacity: 1;
    color: rgb(15 35 35 / var(--tw-text-opacity, 1)
1
);
}
.bg-primary {
    --tw-bg-opacity: 1;
    background-color: rgb(0 206 209 / var(--tw-bg-opacity, 1));
}
.bg-primary\/10
 {
    background-color: rgb(0 206 209 / 0.1);
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