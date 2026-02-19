import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase.from("roles").select("*");
      this.roles = data || [];
      
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
