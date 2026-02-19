import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useAdoptionStore = defineStore("adoptions", {
  state: () => ({
    adoptions: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase
        .from("adoptions")
        .select("*, pets(*), profiles(full_name)");
      this.adoptions = data || [];
    },

    async updateStatus(id: string, status: string) {
      const { data } = await supabase
        .from("adoptions")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (status === "approved") {
        await supabase
          .from("pets")
          .update({ status: "adopted" })
          .eq("id", data.pet_id);
      }

      await this.fetch();
    },
  },
});
