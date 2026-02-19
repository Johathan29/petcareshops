import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useDoctorStore = defineStore("doctors", {
  state: () => ({
    doctors: [] as any[],
  }),

  actions: {
    async fetch() {
      const { data } = await supabase.from("doctors").select("*");
      this.doctors = data || [];
    
    },
  },
});
