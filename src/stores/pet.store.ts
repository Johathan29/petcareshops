import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const usePetStore = defineStore("animals", {
  state: () => ({
    pets: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase.from("animals").select("*");
      this.pets = data || [];
    },

    async create(pet: any) {
      await supabase.from("pets").insert(pet);
      await this.fetch();
    },

    async updateStatus(id: string, status: string) {
      await supabase.from("pets").update({ status }).eq("id", id);
      await this.fetch();
    },

    async remove(id: string) {
      await supabase.from("pets").delete().eq("id", id);
      await this.fetch();
    },
  },
});
