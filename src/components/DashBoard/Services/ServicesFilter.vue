<script setup>

const model = defineModel()

</script>

<template>

    <div class="relative w-full max-w-sm">

        <span class="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
            search
        </span>

        <input v-model="model" placeholder="Search services..."
            class="w-full rounded-lg bg-background-dark border border-border-dark pl-10 pr-4 py-2 text-white" />

    </div>

</template>