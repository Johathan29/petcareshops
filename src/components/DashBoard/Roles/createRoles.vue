<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRolesStore } from "../../../stores/roles.store"

const emit = defineEmits(["close", "created"])
const rolesStore = useRolesStore()

const form = ref({
    name: "",
    description: "",
    category: "",
    active: true
})

const selectedPermissions = ref<string[]>([])

onMounted(() => {
    rolesStore.fetchPermissions()
})

const togglePermission = (id: string) => {

    if (selectedPermissions.value.includes(id)) {
        selectedPermissions.value =
            selectedPermissions.value.filter(p => p !== id)
    } else {
        selectedPermissions.value.push(id)
    }

}

const createRole = async () => {

    await rolesStore.createRole(
        form.value,
        selectedPermissions.value
    )

    emit("created")
    emit("close")

}
</script>

<template>

    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

        <div
            class="glass-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl p-8 flex flex-col gap-8">

            <!-- HEADER -->

            <div class="flex items-start justify-between">

                <div class="flex flex-col gap-1">

                    <h2 class="text-2xl font-bold text-white flex items-center gap-2">

                        <span class="material-symbols-outlined text-primary text-5xl">
                            manage_accounts
                        </span>

                        New Role

                    </h2>

                    <p class="text-slate-400 text-sm">
                        Add a new role to the database.
                    </p>

                </div>

                <button @click="$emit('close')" class="text-slate-500 hover:text-white transition-colors">

                    <span class="material-symbols-outlined">
                        close
                    </span>

                </button>

            </div>


            <!-- FORM -->

            <div class="flex flex-col gap-6">

                <div>

                    <label class="text-xs text-slate-400 mb-1 block">
                        Role Name
                    </label>

                    <input v-model="form.name" placeholder="Enter role name"
                        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />

                </div>

                <div>

                    <label class="text-xs text-slate-400 mb-1 block">
                        Category
                    </label>

                    <input v-model="form.category" placeholder="Enter category"
                        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />

                </div>

                <div>

                    <label class="text-xs text-slate-400 mb-1 block">
                        Description
                    </label>

                    <textarea v-model="form.description"
                        class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white"></textarea>

                </div>


                <!-- PERMISSIONS -->

                <div class="flex flex-col gap-4">

                    <label class="text-xs text-slate-400">
                        Permissions
                    </label>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">

                        <label v-for="perm in rolesStore.permissions" :key="perm.id"
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer">

                            <span class="text-xs text-slate-300">
                                {{ perm.label }}
                            </span>

                            <input type="checkbox" :checked="selectedPermissions.includes(perm.id)"
                                @change="togglePermission(perm.id)" class="w-4 h-4 text-primary" />

                        </label>

                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="flex justify-end gap-4 pt-6 border-t border-white/10">

                    <button @click="$emit('close')" class="px-6 py-2.5 text-slate-400 hover:text-white">
                        Cancel
                    </button>

                    <button @click="createRole"
                        class="px-8 py-2.5 bg-primary text-background-dark rounded-lg font-bold">
                        Create Role
                    </button>

                </div>

            </div>

        </div>

    </div>

</template>

<style scoped>
.bg-primary {
    background: #13daec;
}

.text-background-dark {
    color: #102022;
}

.glass-modal {
    background: rgba(18, 18, 18, .95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(19, 218, 236, .3);
    box-shadow: 0 0 25px rgba(19, 218, 236, .15);
}

.text-primary {
    color: #13daec;
}
</style>