import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useAppointmentStore = defineStore("appointments", {
  state: () => ({
    appointments: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase
        .from("appointments")
        .select("*, services(*), profiles(full_name)");
      this.appointments = data || [];
    },

    async updateStatus(id: string, status: string) {
      await supabase.from("appointments").update({ status }).eq("id", id);
      await this.fetch();
    },
  },
});
