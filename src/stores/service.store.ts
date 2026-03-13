import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export const useServicesStore = defineStore("servicess", {
    state: () => ({
        services: [] as any[],

        loading: false
    }),

    getters: {
        getAllServices: (state) => state.services,
        getServices: (state) => state.services
    },

    actions: {

        async fetchServices() {
            this.loading = true

            const data= await supabase
                .from("services")
                .select(`
          *
        `)
 
          

            if (data) 
            return this.services = data.data

            this.loading = false
        },






    }
})