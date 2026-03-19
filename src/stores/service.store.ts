import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export interface Service {
  id?: number
  title: string
  description: string
  link: string | null
  bg: string | null
  color: string | null
  procesos: any[]
  icon: string
  price?: number
  category?: string
  type?: "standard" | "premium"
}

export const useServicesStore = defineStore("services", {
  state: () => ({
    services: [] as any[],
    selectedService: null as any | null,
    loading: false,
    typeFilter: "standard" as "standard" | "premium"
  }),

    getters: {
        getAllServices: (state) => state.services,
        getServices: (state) => state.services
    },

  actions: {

    async fetch() {
      this.loading = true

      const { data } = await supabase
        .from("services")
        .select("*")
        this.services=data || []

  

            this.loading = false
        },

    async create(service: any, doctorIds: string[]) {
      const { data, error } = await supabase
        .from("services")
        .insert(service)
        .select()
        .single()

      if (error) return

      if (doctorIds.length) {
        await supabase.from("doctor_services").insert(
          doctorIds.map(id => ({
            doctor_id: id,
            service_id: data.id
          }))
        )
      }

      await this.fetch()
    },

    async update(service: any, doctorIds: string[]) {
      await supabase
        .from("services")
        .update({
          name: service.name,
          description: service.description,
          price: service.price,
          type: service.type
        })
        .eq("id", service.id)

      // eliminar relaciones previas
      await supabase
        .from("doctor_services")
        .delete()
        .eq("service_id", service.id)

      if (doctorIds.length) {
        await supabase.from("doctor_services").insert(
          doctorIds.map(id => ({
            doctor_id: id,
            service_id: service.id
          }))
        )
      }

      await this.fetch()
    },

    async remove(id: string) {
      await supabase.from("services").delete().eq("id", id)
      await this.fetch()
    }
  }
})
