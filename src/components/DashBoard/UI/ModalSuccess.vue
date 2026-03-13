<script setup lang="ts">

defineProps({
    show: Boolean,
    message: String
})

</script>

<template>

    <Transition name="fadeModal">

        <div v-if="show"
            class="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

            <div class="glass-modal p-8 rounded-xl flex flex-col items-center gap-3 text-center">

                <span class="material-symbols-outlined text-primary text-6xl">
                    check_circle
                </span>

                <p class="text-white font-bold text-lg">
                    {{ message }}
                </p>

            </div>

        </div>

    </Transition>

</template>

<style scoped>
.fadeModal-enter-active,
.fadeModal-leave-active {
    transition: all .35s ease;
}

.fadeModal-enter-from,
.fadeModal-leave-to {
    opacity: 0;
    transform: scale(.9);
}

.fadeModal-enter-to,
.fadeModal-leave-from {
    opacity: 1;
    transform: scale(1);
}

.glass-modal {
    background: rgba(18, 18, 18, .95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(19, 218, 236, .3);
    box-shadow: 0 0 25px rgba(19, 218, 236, .15);
}

.text-primary {
    color: #05c9cc;
}
</style>