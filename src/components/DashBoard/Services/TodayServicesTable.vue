<script setup>

const props = defineProps({
    data: Array
})

</script>

<template>

    <section class="bg-card-dark rounded-xl border border-border-dark overflow-hidden">

        <header class="p-5 border-b border-border-dark">

            <h3 class="text-white font-bold text-lg">
                Today's Services
            </h3>

        </header>

        <table class="w-full text-sm">

            <thead class="text-slate-400">

                <tr>

                    <th class="px-6 py-3">Service</th>
                    <th class="px-6 py-3">Doctor</th>
                    <th class="px-6 py-3">Date</th>

                </tr>

            </thead>

            <tbody>

                <tr v-for="row in data" :key="row.id" class="border-t border-border-dark">

                    <td class="px-6 py-3 text-white">
                        {{ row.service.name }}
                    </td>

                    <td class="px-6 py-3 text-slate-300">
                        {{ row.doctor.name }}
                    </td>

                    <td class="px-6 py-3 text-slate-400">
                        {{ row.date }}
                    </td>

                </tr>

            </tbody>

        </table>

    </section>

</template>