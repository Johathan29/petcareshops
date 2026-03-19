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
    services: [] as Service[],
    selectedService: null as Service | null,
    loading: false,
    typeFilter: "standard" as "standard" | "premium"
  }),

  getters: {
    filteredServices: (state) =>
      state.services.filter(s => s.type === state.typeFilter)
  },

  actions: {
    async fetch() {
      this.loading = true

      const { data, error } = await supabase
        .from("services")
        .select("*")

      if (error) {
        console.error("Error fetching services:", error)
      } else {
        this.services = data || []
      }

      this.loading = false
    },

    async create(service: Service, doctorIds: string[]) {
      const { data, error } = await supabase
        .from("services")
        .insert({
          title: service.title,
          description: service.description,
          link: service.link,
          bg: service.bg,
          color: service.color,
          procesos: service.procesos,
          icon: service.icon,
          price: service.price,
          category: service.category,
          type: service.type || "standard"
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating service:", error)
        return
      }

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

    async update(service: Service, doctorIds: string[]) {
      const { error } = await supabase
        .from("services")
        .update({
          title: service.title,
          description: service.description,
          link: service.link,
          bg: service.bg,
          color: service.color,
          procesos: service.procesos,
          icon: service.icon,
          price: service.price,
          category: service.category,
          type: service.type
        })
        .eq("id", service.id)

      if (error) {
        console.error("Error updating service:", error)
        return
      }

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

    async remove(id: number) {
      const { error } = await supabase.from("services").delete().eq("id", id)
      if (error) {
        console.error("Error deleting service:", error)
        return
      }
      await this.fetch()
    }
  }
})
