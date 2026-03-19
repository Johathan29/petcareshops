import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useAppointmentStore = defineStore("appointments", {
  state: () => ({
    appointments: [] as any[],
  }),
getters: {
  getByStatus: (state) => {
    return (status: string) => {
      if (!status || status === "all") return state.appointments;
      return state.appointments.filter(a => a.status === status);
    };
  }
},
  actions: {
    
    async fetch() {
      const { data, error } = await supabase.from("appointments").select(`
      *,
      services(id,title,description,icon,price),
      profiles(id,first_name)
    `);

      if (error) {
        console.error("Error fetching appointments:", error);
        this.appointments = [];
      } else {
        this.appointments = (data || []).map((apt: any) => ({
          ...apt,
          user_name: apt.profiles?.first_name || "Usuario",
          services: apt.services,
        }));
      }
    },

    async create(appointment: {
      user_id: string;
      doctor_id: string;
      service_id: string;
      date: string;
      status: string;
      notes?: string;
      animal_id?: string;
    }) {
      try {
        const { data, error } = await supabase
          .from("appointments")
          .insert({
            user_id: appointment.user_id,
            doctor_id: appointment.doctor_id,
            service_id: appointment.service_id,
            date: appointment.date,
            status: appointment.status,
            notes: appointment.notes,
            animal_id: appointment.animal_id,
          })
          .select()
          .single();

        if (error) {
          return { success: false, error: error.message };
        }

        await this.fetch();
        return { success: true, data };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },

    async updateStatus(id: string, status: string) {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("Error updating appointment status:", error);
      }

      await this.fetch();
    },

    async remove(id: string) {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting appointment:", error);
      }

      await this.fetch();
    },
  },
});
