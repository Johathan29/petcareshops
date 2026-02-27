import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export const useAdoptionStore = defineStore("adoption", {
  state: () => ({
    adoptions: [] as any[],
    loading: false,
  }),

  actions: {
    async fetch() {
      this.loading = true

      const data= await supabase
        .from("adoption")
        .select("*")
        

      if (data.error) {
        console.error(data.error.message)
        this.loading = false
        return
      }

      this.adoptions = data.data || []
      this.loading = false
    },

    async updateStatus(id: string, status: string) {
      const { data, error } = await supabase
        .from("adoption")
        .update({ status })
        .eq("id", id)
        .select(`*`)
        .single()

      if (error) {
        console.error(error.message)
        return
      }

      if (status === "approved") {
        await supabase
          .from("pets")
          .update({ status: "adopted" })
          .eq("id", data.pet_id)
      }

      await this.fetch()
    },
    
  },
})