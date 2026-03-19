<script setup lang="ts">

import { ref, watch } from "vue"
import { useServicesStore } from "../../../stores/service.store"

const servicesStore = useServicesStore()

const props = defineProps({
    service: Object
})

const emit = defineEmits(["close"])

const form = ref({
    name: "",
    description: "",
    price: 0,
    icon: "medical_services"
})

watch(() => props.service, (val) => {

    if (!val) return

    form.value = { ...val }

})

const save = async () => {

    if (props.service) {

        await servicesStore.updateService(props.service.id, form.value)

    } else {

        await servicesStore.createService(form.value)

    }

    emit("close")

}

</script>

<template>

    <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

        <div class="bg-card-dark p-8 rounded-xl w-full max-w-md space-y-4">

            <h3 class="text-white text-xl font-bold">

                {{ service ? "Edit Service" : "Create Service" }}

            </h3>

            <input v-model="form.name" placeholder="Service name" class="w-full bg-background-dark p-3 rounded" />

            <textarea v-model="form.description" placeholder="Description"
                class="w-full bg-background-dark p-3 rounded" />

            <input v-model="form.price" type="number" placeholder="Price"
                class="w-full bg-background-dark p-3 rounded" />

            <div class="flex gap-3">

                <button @click="save" class="flex-1 bg-primary text-background-dark py-2 rounded font-bold">
                    Save
                </button>

                <button @click="$emit('close')" class="flex-1 border border-border-dark py-2 rounded">
                    Cancel
                </button>

            </div>

        </div>

    </div>

</template>