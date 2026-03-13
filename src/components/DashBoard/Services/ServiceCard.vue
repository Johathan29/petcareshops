<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faCheckCircle, faHeart,faSyringe,faMicroscope} from '@fortawesome/free-solid-svg-icons'
const props = defineProps({
    service: Object
})


const emit = defineEmits(["edit"])
</script>

<template>

    <div
        class="bg-primary/5 border-primary hover:border-primary/40 hover:bg-primary/[0.08] p-2 rounded-md  opacity-100 translate-y-0 transition-all duration-300 hover:-translate-y-1">

        <div
            class="size-12 rounded-lg bg-[#13daec75] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FontAwesomeIcon :icon="faHeart" class="w-8 h-8 "/>
            
        </div>

        <h3 class="text-white text-lg font-bold mb-2">
            {{ service?.title }} {{ service?.icon }}
        </h3>

        <p class="text-slate-400 text-sm leading-relaxed mb-6">
            {{ service?.description }}
        </p>

        <div class="mt-auto pt-4 border-t border-border-dark flex justify-between items-center">

            <span class="text-primary text-2xl font-black">
                ${{ service?.price }}
            </span>

            <button @click="$emit('edit', service)" class="text-slate-500 hover:text-white">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>

        </div>

    </div>

</template>
<style scoped>
.bg-primary\/5 {
  background-color: rgb(19 218 236 / 0.05);
}

.border-primary\/10 {
  border-color: rgb(19 218 236 / 0.1);
}

.bg-primary\/5:hover {
  background-color: rgb(19 218 236 / 0.08);
}

.bg-background-dark {
  --tw-bg-opacity: 1;
  background-color: rgb(16 32 34 / var(--tw-bg-opacity, 1));
}

.border-primary {
  border: 1px solid rgb(19 218 236 / 0.1);
}

.text-primary {
  --tw-text-opacity: 1;
  color: rgb(19 218 236 / var(--tw-text-opacity, 1));
}

.bg-primary\10 {
  background-color: rgb(19 218 236 / 0.1);
}

.border-primary\/20 {
  border-color: rgb(19 218 236 / 0.2);
}

.bg-primary {
  --tw-bg-opacity: 1;
  background-color: rgb(19 218 236 / var(--tw-bg-opacity, 1));
}
</style>