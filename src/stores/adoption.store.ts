import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useAdoptionStore = defineStore("adoption", {
  state: () => ({
    adoptions: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase.from("adoption").select("*");
      this.adoptions = data || [];
    },

    async updateStatus(id: string, status: string) {
      const { data } = await supabase
        .from("adoption")
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
