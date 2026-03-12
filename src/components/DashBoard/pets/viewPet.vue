<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { supabase } from "../../../config/supabase";
import { z } from "zod";
import AppModal from "../../UI/AppModal.vue";

interface Pet {
    id: string; // uuid
    created_at: string; // timestamp

    nombre?: string | null;
    raza?: string | null;
    color?: string | null;
    counter_like?: number | null;
    edad?: string | null;
    especie?: string | null;
    estado?: string | null;
    genero?: string | null;
    imagen?: string | null;
    microchip?: string | null;
    nacimiento?: string | null;
    peso?: string | null;
    status?: string | null;

    id_doctor: any[]; // jsonb array
    owner: any[];     // jsonb array

    registro?: string | null;
    fecha_inyeccion?: string | null;
}

const props = defineProps<{ pet: Pet | null }>();
const emit = defineEmits(["close"]);

const loading = ref(false);
const attemptClose = () => {

    emit("close")
    return
}

</script>
<template>
    <aside class="absolute right-0 z-[60]  "
    :class="pet ? ' -translate-x-2': 'translate-x-16'"
    >
        <div class="w-[450px] sticky top-0 h-[calc(100vh-100px)] bg-surface-dark border border-border-dark rounded-xl flex flex-col shadow-2xl overflow-hidden animate-slide-in"
            data-v-4edac8b3="">
            <div class="p-6 border-b border-border-dark flex items-center justify-between bg-border-dark/20"
                data-v-4edac8b3="">
                <div class="flex flex-col" data-v-4edac8b3="">
                    <h3 class="text-slate-100 text-xl font-bold" data-v-4edac8b3="">View Pet</h3>
                    <p class="text-primary text-xs font-bold uppercase tracking-widest" data-v-4edac8b3=""> {{ props.pet?.nombre }} </p>
                </div>
                <button class="text-slate-400 hover:text-primary transition-colors" @click="attemptClose" data-v-4edac8b3=""><span
                        class="material-symbols-outlined" data-v-4edac8b3="">close</span></button>
            </div>
            <div class="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8" data-v-4edac8b3="">
                <!-- Module: Adoptions -->
                <div data-v-4edac8b3="">
                    <div class="flex items-center gap-2 mb-4" data-v-4edac8b3=""><span
                            class="material-symbols-outlined text-primary text-xl" data-v-4edac8b3="">handshake</span>
                        <h4 class="text-slate-100 font-bold" data-v-4edac8b3="">Adoptions</h4>
                    </div>
                    <div class="space-y-4" data-v-4edac8b3=""><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">View Adoption
                                Requests</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Process/Approve
                                Adoptions</span><input
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Manage Adoption
                                Fees</span><input
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label></div>
                </div><!-- Module: Pets -->
                <div data-v-4edac8b3="">
                    <div class="flex items-center gap-2 mb-4" data-v-4edac8b3=""><span
                            class="material-symbols-outlined text-primary text-xl" data-v-4edac8b3="">pets</span>
                        <h4 class="text-slate-100 font-bold" data-v-4edac8b3="">Pets &amp; Records</h4>
                    </div>
                    <div class="space-y-4" data-v-4edac8b3=""><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Add New Pet
                                Profiles</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Edit Pet
                                History</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Archive Pet
                                Records</span><input
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label></div>
                </div><!-- Module: Veterinary (Crucial for this role) -->
                <div data-v-4edac8b3="">
                    <div class="flex items-center gap-2 mb-4" data-v-4edac8b3=""><span
                            class="material-symbols-outlined text-primary text-xl"
                            data-v-4edac8b3="">medical_information</span>
                        <h4 class="text-slate-100 font-bold text-primary" data-v-4edac8b3=""> Veterinary Services </h4>
                    </div>
                    <div class="space-y-4" data-v-4edac8b3=""><label
                            class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-100 font-medium"
                                data-v-4edac8b3="">Create Medical Logs</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-100 font-medium"
                                data-v-4edac8b3="">Prescribe Medications</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer group transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-100 font-medium"
                                data-v-4edac8b3="">Update Health Status</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label></div>
                </div><!-- Module: Finances -->
                <div data-v-4edac8b3="">
                    <div class="flex items-center gap-2 mb-4" data-v-4edac8b3=""><span
                            class="material-symbols-outlined text-primary text-xl"
                            data-v-4edac8b3="">account_balance_wallet</span>
                        <h4 class="text-slate-100 font-bold" data-v-4edac8b3="">Finances</h4>
                    </div>
                    <div class="space-y-4" data-v-4edac8b3=""><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">View
                                Invoices</span><input checked=""
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label><label
                            class="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-border-dark cursor-pointer group hover:border-primary/50 transition-colors"
                            data-v-4edac8b3=""><span class="text-sm text-slate-300" data-v-4edac8b3="">Issue
                                Refunds</span><input
                                class="w-5 h-5 rounded border-border-dark bg-background-dark text-primary focus:ring-primary focus:ring-offset-background-dark"
                                type="checkbox" data-v-4edac8b3=""></label></div>
                </div>
            </div>
            <div class="p-6 border-t border-border-dark bg-border-dark/10 flex gap-3" data-v-4edac8b3=""><button
                    class="flex-1 px-4 py-2.5 bg-primary text-background-dark font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                    data-v-4edac8b3=""> Save Changes </button><button
                    class="flex-1 px-4 py-2.5 bg-background-dark text-slate-100 border border-border-dark rounded-lg font-bold hover:bg-slate-800 transition-all"
                    data-v-4edac8b3=""> Cancel </button></div>
        </div>
    </aside>
</template>
<style lang="css" scoped>
.bg-primary {
    --tw-bg-opacity: 1;
    background-color: rgb(19 218 236 / var(--tw-bg-opacity, 1));
}

.text-background-dark {
    --tw-text-opacity: 1;
    color: rgb(16 32 34 / var(--tw-text-opacity, 1));
}

.glass-modal {
    background: rgba(18, 18, 18, 0.95);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(19, 218, 236, 0.3);
    box-shadow: 0 0 25px rgba(19, 218, 236, 0.15);
}

.text-primary {
    --tw-text-opacity: 1;
    color: rgb(19 218 236 / var(--tw-text-opacity, 1));
}

.border-primary:focus {
    --tw-border-opacity: 1;
    border: 1px solid;
    border-color: rgb(19 218 236 / var(--tw-border-opacity, 1)) !important;
}
</style>
