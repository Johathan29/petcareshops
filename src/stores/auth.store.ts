import { defineStore } from 'pinia'
import { supabase } from '../config/supabase'

export const useAuthStore = defineStore('users', {
  state: () => ({
    users: [] as any[],
    selectedUser: null as any,
    loading: false,
    filter: 'all'
  }),

  getters: {
    filteredUsers: (state) => {
      if (state.filter === 'all') return state.users
      return state.users.filter(u => u.role === state.filter)
    }
  },

  actions: {
    async fetchUsers() {
      this.loading = true
      const { data } = await supabase.from('profiles').select('*')
      this.users = data || []
      this.loading = false
    },

    async createUser(payload: any) {
      await supabase.from('profiles').insert(payload)
      await this.fetchUsers()
    },

    async updateUser(id: string, payload: any) {
      await supabase.from('profiles').update(payload).eq('id', id)
      await this.fetchUsers()
    },

    async deleteUser(id: string) {
      await supabase.from('profiles').delete().eq('id', id)
      await this.fetchUsers()
    },

    async resetPassword(email: string) {
      await supabase.auth.resetPasswordForEmail(email)
    },

    async updatePermissions(id: string, permissions: any) {
      await supabase.from('profiles')
        .update({ permissions })
        .eq('id', id)

      await this.fetchUsers()
    },
    async setOnline() {
  if (!this.users) return

  await supabase
    .from('profiles')
    .update({
      is_online: true,
      last_seen: new Date()
    })
    .eq('id', this.users.id)
},
async setOffline() {
  if (!this.users) return

  await supabase
    .from('profiles')
    .update({
      is_online: false,
      last_seen: new Date()
    })
    .eq('id', this.users.id)
}

  }
})
