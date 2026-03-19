<script setup lang="ts">

import { computed } from "vue"
import { useRolesStore } from "../../../stores/roles.store"

const rolesStore = useRolesStore()

const props = defineProps({
    show: Boolean,
    selectedRole: Object,
    editedPermissions: Array
})

const emit = defineEmits([
    "close",
    "toggle",
    "save"
])

const permissionsByModule = computed(() => {

    const modules: any = {}

    rolesStore.permissions.forEach((perm: any) => {

        if (!modules[perm.module]) {
            modules[perm.module] = []
        }

        modules[perm.module].push(perm)

    })

    return modules

})

</script>

<template>

    <Transition name="asidePermissions">

        <aside v-if="show"
            class="w-[450px] absolute right-0 top-[8rem] h-[40rem] bg-[#132424] border border-border-dark rounded-xl flex flex-col shadow-2xl overflow-y-auto custom-scrollbar animate-slide-in">

            <!-- HEADER -->

            <div class="p-6 border-b border-border-dark flex items-center justify-between bg-border-dark/20">

                <div>

                    <h3 class="text-slate-100 text-xl font-bold">
                        Edit Permissions
                    </h3>

                    <p class="text-primary text-xs font-bold uppercase tracking-widest">

                        {{ selectedRole?.name }}

                    </p>

                </div>

                <button @click="emit('close')" class="text-slate-400 hover:text-primary transition-colors">

                    <span class="material-symbols-outlined">
                        close
                    </span>

                </button>

            </div>


            <!-- PERMISSIONS -->

            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">

                <div v-for="(perms, module) in permissionsByModule" :key="module">

                    <div class="flex items-center gap-2 mb-4">
                        <span class="material-symbols-outlined text-primary text-xl">
                            security
                        </span>

                        <h4 class="text-slate-100 font-bold">
                            {{ module }}
                        </h4>

                    </div>
                    <div class="grid grid-cols-2 gap-4 ">

                        <label v-for="perm in perms" :key="perm.id"
                            class="flex items-center justify-between p-2 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors">
                            <span class="text-sm text-slate-300">

                                {{ perm.label }}

                            </span>
                            <input type="checkbox" :checked="editedPermissions?.includes(perm.id)"
                                @change="emit('toggle', perm.id)"
                                class=" rounded border-border-dark bg-background-dark text-primary focus:ring-primary" />

                        </label>

                    </div>

                </div>

            </div>


            <!-- FOOTER -->

            <div class="p-6 border-t border-border-dark flex gap-3">

                <button @click="emit('save')"
                    class="flex-1 px-4 py-2 bg-primary text-background-dark rounded-lg font-bold">

                    Save Changes

                </button>

                <button @click="emit('close')" class="flex-1 px-4 py-2 border border-border-dark text-white rounded-lg">

                    Cancel

                </button>

            </div>

        </aside>

    </Transition>

</template>

<style scoped>
.asidePermissions-enter-active,
.asidePermissions-leave-active {
    transition: all .35s cubic-bezier(.25, .8, .25, 1);
}

.asidePermissions-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.asidePermissions-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.asidePermissions-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.bg-background-dark {
    --tw-bg-opacity: 1;
    background-color: rgb(15 34 35 / var(--tw-bg-opacity, 1));
}

.bg-surface-dark {
    --tw-bg-opacity: 1;

    background-color: rgb(22 44 45 / var(--tw-bg-opacity, 1));
}

.text-primary {
    --tw-text-opacity: 1;
    color: rgb(5 201 204 / var(--tw-text-opacity, 1));
}

.bg-primary\/10 {
    background-color: rgb(5 201 204 / 0.1);
}

.bg-border-dark\/50 {
    background-color: rgb(33 73 74 / 0.5);
}

.border-border-dark {
    --tw-border-opacity: 1;
    border-color: rgb(33 73 74 / var(--tw-border-opacity, 1));
}

.bg-primary {
    background-color: #04c9cc;
}

.hover\:text-primary:hover {
    color: #04c9cc;
}

/* SLIDE ASIDE */

.asidePermissions-enter-active,
.asidePermissions-leave-active {
    transition: all 0.35s cubic-bezier(.25, .8, .25, 1);
}

.asidePermissions-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.asidePermissions-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.asidePermissions-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.asidePermissions-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #13daec33;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #13daec33;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #102022;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #102022;
}
</style>