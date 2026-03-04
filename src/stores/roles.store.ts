// stores/roles.store.ts
import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [] as any[],
    loading: false,
  }),

  getters: {
    getAllRoles: (state) => state.roles,
  },

  actions: {
    async fetchRoles() {
      this.loading = true

      const { data, error } = await supabase
        .from("roles")
        .select(`
          *,
          users:profiles(count)
        `)

      if (!error && data) {
        this.roles = data
      }

      this.loading = false
    },
  },
})