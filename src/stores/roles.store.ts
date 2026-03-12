import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [] as any[],
    permissions: [] as any[],
    rolePermissions: [] as any[],
    loading: false
  }),

  getters: {
    getAllRoles: (state) => state.roles,
    getPermissions: (state) => state.permissions
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

      if (error) console.error(error)

      if (data) this.roles = data

      this.loading = false
    },

    async fetchPermissions() {

      const { data, error } = await supabase
        .from("permissions")
        .select("*")
        .order("module")

      if (error) console.error(error)

      if (data) this.permissions = data
    },

    async getRolePermissions(roleId: string) {

      const { data, error } = await supabase
        .from("role_permissions")
        .select(`
          *,
          permission:permissions(*)
        `)
        .eq("role_id", roleId)

      if (error) console.error(error)

      if (data) this.rolePermissions = data
    },

    async createRole(role: any, permissions: string[]) {

      const { data: roleData, error } = await supabase
        .from("roles")
        .insert(role)
        .select()
        .single()

      if (error) {
        console.error("role insert error", error)
        return
      }

      if (!permissions || permissions.length === 0) {
        await this.fetchRoles()
        return
      }

      const inserts = permissions
        .filter(p => p) // elimina undefined
        .map((permissionId) => ({
          role_id: roleData.id,
          permissions_id: permissionId
        }))

      const { error: permError } = await supabase
        .from("role_permissions")
        .insert(inserts)

      if (permError) {
        console.error("permission insert error", permError)
      }

      await this.fetchRoles()
    },

    async updateRolePermissions(roleId: string, permissions: string[]) {

      const inserts = permissions.map((permissionId) => ({
        role_id: roleId,
        permissions_id: permissionId
      }))
    
      const { error } = await supabase
        .from("role_permissions")
        .upsert(inserts,{
          onConflict:"role_id,permissions_id"
        })
    
      if(error) console.error(error)
    
      await this.getRolePermissions(roleId)
    
    }

  }
})