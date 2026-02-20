<script lang="ts">
</script>
<template>
    <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
<!-- Top Dashboard Stats -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<!-- Countdown Timer Widget -->
<div class="md:col-span-2 bg-gradient-to-r from-[#193133] to-[#112122] p-6 rounded-xl border border-[#234548] flex items-center justify-between">
<div>
<p class="text-white/60 text-sm font-medium mb-1">Upcoming Milestone</p>
<h3 class="text-lg font-bold">Surgery: Max (Beagle)</h3>
<p class="text-primary/70 text-xs">Clinical Room B4</p>
</div>
<div class="text-right">
<p class="text-white/40 text-xs uppercase tracking-widest mb-1">Time until next appointment</p>
<div class="text-4xl font-mono font-bold text-primary tracking-tighter">
                                00:12:45
                            </div>
</div>
</div>
<!-- Quick Stats -->
<div class="bg-[#193133] p-6 rounded-xl border border-[#234548]">
<div class="flex items-center justify-between mb-2">
<p class="text-white/60 text-sm font-medium">Daily Progress</p>
<span class="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">6/12 Seen</span>
</div>
<div class="w-full bg-[#112122] h-2 rounded-full overflow-hidden">
<div class="bg-primary h-full w-1/2 rounded-full shadow-[0_0_10px_rgba(19,218,236,0.5)]"></div>
</div>
<div class="mt-4 flex justify-between text-xs text-white/40">
<span>Morning Shift</span>
<span>50% Complete</span>
</div>
</div>
</div>
<!-- Main Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Today's Appointments -->
<div class="lg:col-span-2 space-y-4">
<div class="flex items-center justify-between">
<h2 class="text-xl font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary">event_note</span>
                                Today's Appointments
                            </h2>
<div class="flex gap-2">
<button class="p-1.5 bg-[#193133] rounded border border-[#234548] text-white/60 hover:text-white">
<span class="material-symbols-outlined text-sm">filter_list</span>
</button>
<button class="p-1.5 bg-[#193133] rounded border border-[#234548] text-white/60 hover:text-white">
<span class="material-symbols-outlined text-sm">refresh</span>
</button>
</div>
</div>
<div class="bg-[#112122] rounded-xl border border-[#234548] overflow-hidden">
<table class="w-full text-left">
<thead>
<tr class="bg-[#193133] text-white/60 text-xs uppercase tracking-wider">
<th class="px-6 py-4 font-semibold">Time</th>
<th class="px-6 py-4 font-semibold">Patient (Pet)</th>
<th class="px-6 py-4 font-semibold">Owner</th>
<th class="px-6 py-4 font-semibold">Purpose</th>
<th class="px-6 py-4 font-semibold">Status</th>
<th class="px-6 py-4 font-semibold"></th>
</tr>
</thead>
<tbody class="divide-y divide-[#234548]">
<tr class="hover:bg-[#193133]/50 transition-colors">
<td class="px-6 py-4 text-primary font-mono text-sm">09:00 AM</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-cover bg-center border border-[#234548]" data-alt="Golden Retriever close up" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWRd1Szf7BwqSrVUHmyVWIAkSL6j4nCpZsstTD5nZch8GonkmklyB6HkhGnTgN5R6XMwieVwdEwYySv9r-RKiOQxtzbkixB3lspLQl-yyY9eGpcO6PlWS7OKfv6UmEinZD2s6UPx0F6Au--BdjrWA5m_7WrKBNVCCEedZGYt_lZ4DHgE_hqchSW2glKLEpxvtyKyeTJMu86Bqi65ESINaNjCHtHXvhejWi6Kx4Cdr_i2ehfKnykKB2elgWzX7BB4ch8X6KRaazSA')"></div>
<div>
<p class="text-sm font-semibold">Luna</p>
<p class="text-[10px] text-white/40 uppercase">Golden Retriever</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-white/70">John Doe</td>
<td class="px-6 py-4">
<span class="text-[11px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">Vaccination</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
<span class="text-xs font-medium text-green-500">Checked-in</span>
</div>
</td>
<td class="px-6 py-4 text-right">
<button class="text-primary hover:text-white transition-colors">
<span class="material-symbols-outlined text-xl">play_circle</span>
</button>
</td>
</tr>
<tr class="hover:bg-[#193133]/50 transition-colors">
<td class="px-6 py-4 text-white/40 font-mono text-sm">10:30 AM</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-cover bg-center border border-[#234548]" data-alt="Beagle dog sitting down" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBk7WOkX_G1D0hMtrTg1ySx9qWE3Rs2DMslznxJTsmN0l0PdX132sm8f6MHtP_S9zfbqUvevXvAPQxeKy8ACAYVNLrGbzvEoKXa00r6fvlOyjTlogvO-Xqhj8IaNzKyzBrMpT51cHNtPjbYvRX3rgGoo9CArMEdJVvAaSPDZf7J8qbFoFdG-w4bSBwZViJJx_l4Lj_O54Llj4Q0mWDPDdSWy69wP1Q--xoBlf_2ksPGMV2pJWK4fUcJO1QRNJoFYXOaE_vOADpHVA')"></div>
<div>
<p class="text-sm font-semibold">Max</p>
<p class="text-[10px] text-white/40 uppercase">Beagle</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-white/70">Sarah Wilson</td>
<td class="px-6 py-4">
<span class="text-[11px] px-2 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded">Surgery</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
<span class="text-xs font-medium text-white/40">Waiting</span>
</div>
</td>
<td class="px-6 py-4 text-right">
<button class="text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-xl">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-[#193133]/50 transition-colors">
<td class="px-6 py-4 text-white/40 font-mono text-sm">11:15 AM</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-cover bg-center border border-[#234548]" data-alt="Siamese cat portrait" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnHPnufRo7NMbb1ZFBrp0Pupm7v_4dRt6gYjBIq6mwM4u5LUudNj3ZXtwEQfqx0sjzcvYNQyqi8p7xC7Mlah1LZADFr-KobSOspa2MBJ0g012fo2dbIYHqx3cous-dZ4_yRkSlwo74a29R1OV-CNY6ypDj9bXBBURZwIm_LudjW6pP_s49L9M64aSG66Z9PB5FsURJ5CxWBp9PRa3nGwoAwYoKRY0fhloOlJWkv_aXvvlcykH7PMjPfwR-KT9Wm7XFr1f6TPSAqQ')"></div>
<div>
<p class="text-sm font-semibold">Bella</p>
<p class="text-[10px] text-white/40 uppercase">Siamese</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-white/70">Mike Ross</td>
<td class="px-6 py-4">
<span class="text-[11px] px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded">Dental</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
<span class="text-xs font-medium text-white/40">Upcoming</span>
</div>
</td>
<td class="px-6 py-4 text-right">
<button class="text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-xl">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-[#193133]/50 transition-colors">
<td class="px-6 py-4 text-white/40 font-mono text-sm">01:00 PM</td>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<div class="size-8 rounded bg-cover bg-center border border-[#234548]" data-alt="Labrador retriever looking up" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAczWQLR0sTkduVJ3MfdfyRP5HIqt42lqfOHCe1bArwW-beKLqpCEU1wYo7mEyxn41w0r44A3nPaRGMx-gwsGAs6Poi2KI26QdkXJPsNPoKRhz-KuhjPOu5_Yt82yZDcyOY-cZDaOzNMbOb4RkhYn63UzSi2X7WTiM3-tjZw6iAA8alYQS-s-Bun8B4DprEEzfe5BvgO85usr2ukrHN0uoRqdk7E0EaNNyY-kkoJrUoQXBNuD-LCqFOqauN6AQETwWOOcHVKOlKOA')"></div>
<div>
<p class="text-sm font-semibold">Charlie</p>
<p class="text-[10px] text-white/40 uppercase">Labrador</p>
</div>
</div>
</td>
<td class="px-6 py-4 text-sm text-white/70">Emily Blunt</td>
<td class="px-6 py-4">
<span class="text-[11px] px-2 py-1 bg-white/10 text-white/60 border border-white/20 rounded">Follow-up</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<span class="w-1.5 h-1.5 rounded-full bg-white/20"></span>
<span class="text-xs font-medium text-white/40">Upcoming</span>
</div>
</td>
<td class="px-6 py-4 text-right">
<button class="text-white/40 hover:text-white transition-colors">
<span class="material-symbols-outlined text-xl">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
<div class="p-4 bg-[#193133]/30 text-center">
<button class="text-primary text-xs font-semibold hover:underline">View All Schedule (14 Appointments)</button>
</div>
</div>
</div>
<!-- Side Columns: Recent Consultations & Action Center -->
<div class="space-y-8">
<!-- Recent Consultations -->
<div>
<h2 class="text-lg font-bold flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary">history</span>
                                Recent Consultations
                            </h2>
<div class="bg-[#112122] rounded-xl border border-[#234548] p-4 space-y-4">
<div class="flex items-center justify-between p-3 rounded-lg bg-[#193133] hover:border-primary/50 border border-transparent transition-all cursor-pointer">
<div class="flex items-center gap-3">
<div class="size-10 rounded bg-white/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">folder_open</span>
</div>
<div>
<p class="text-sm font-medium">Cooper (Pug)</p>
<p class="text-[10px] text-white/40 uppercase">Completed 20m ago</p>
</div>
</div>
<span class="material-symbols-outlined text-white/40 text-sm">chevron_right</span>
</div>
<div class="flex items-center justify-between p-3 rounded-lg bg-[#193133] hover:border-primary/50 border border-transparent transition-all cursor-pointer">
<div class="flex items-center gap-3">
<div class="size-10 rounded bg-white/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">folder_open</span>
</div>
<div>
<p class="text-sm font-medium">Milo (Maine Coon)</p>
<p class="text-[10px] text-white/40 uppercase">Completed 1h ago</p>
</div>
</div>
<span class="material-symbols-outlined text-white/40 text-sm">chevron_right</span>
</div>
<div class="flex items-center justify-between p-3 rounded-lg bg-[#193133] hover:border-primary/50 border border-transparent transition-all cursor-pointer">
<div class="flex items-center gap-3">
<div class="size-10 rounded bg-white/10 flex items-center justify-center text-primary">
<span class="material-symbols-outlined">folder_open</span>
</div>
<div>
<p class="text-sm font-medium">Daisy (Rabbit)</p>
<p class="text-[10px] text-white/40 uppercase">Completed 3h ago</p>
</div>
</div>
<span class="material-symbols-outlined text-white/40 text-sm">chevron_right</span>
</div>
<button class="w-full py-2 border border-dashed border-[#234548] text-white/40 text-xs rounded hover:bg-[#234548] transition-colors">
                                    View full history
                                </button>
</div>
</div>
<!-- Quick Notes / Action Center -->
<div class="bg-primary/5 p-6 rounded-xl border border-primary/20">
<h3 class="text-primary font-bold text-sm mb-3 flex items-center gap-2">
<span class="material-symbols-outlined text-sm">emergency</span>
                                Medical Alerts
                            </h3>
<div class="space-y-3">
<div class="p-3 bg-[#112122] rounded border-l-4 border-red-500">
<p class="text-[10px] text-white/40 uppercase font-bold">Lab Results Ready</p>
<p class="text-xs text-white/80">Patient "Toby" bloodwork indicates high creatinine. Review required.</p>
</div>
<div class="p-3 bg-[#112122] rounded border-l-4 border-orange-500">
<p class="text-[10px] text-white/40 uppercase font-bold">Stock Warning</p>
<p class="text-xs text-white/80">Amoxicillin supplies are low in Clinic A cabinets.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</template>