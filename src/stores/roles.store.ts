// stores/roles.store.ts
import { defineStore } from "pinia"
import { supabase } from "../config/supabase"

export interface Role {
  id?: string
  name: string
  description: string | null
  active: boolean | null
  category: string | null
  users?: any[]
  permissions_summary?: string[]
  created_at?: string
}

export interface Permission {
  id?: string
  module: string
  action: string
  key?: string
  label: string
  created_at?: string
}

export interface RolePermission {
  role_id: string
  permissions_id: string
}

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: [] as Role[],
    permissions: [] as Permission[],
    selectedRole: null as Role | null,
    loading: false,
  }),

  getters: {
    getAllRoles: (state) => state.roles,
    getAllPermissions: (state) => state.permissions,
    getRoleById: (state) => (id: string) => state.roles.find(r => r.id === id),
    getPermissionsByRole: (state) => (roleId: string) => {
      const role = state.roles.find(r => r.id === roleId)
      return role?.permissions_summary || []
    },
  },

  actions: {
    async fetchRoles() {
      this.loading = true

      const { data, error } = await supabase
        .from("roles")
        .select(`
          *,
          users:profiles(count),
          role_permissions(
            permissions_id
          )
        `)

      if (!error && data) {
        this.roles = data.map(role => ({
          ...role,
          permissions_summary: role.role_permissions?.map((rp: any) => rp.permissions_id) || []
        }))
      }

      this.loading = false
    },

    async fetchPermissions() {
      const { data, error } = await supabase
        .from("permissions")
        .select("*")
        .order("module", { ascending: true })
        .order("action", { ascending: true })

      if (!error && data) {
        this.permissions = data
      }
    },

    async createRole(role: Role) {
      const { data, error } = await supabase
        .from("roles")
        .insert({
          name: role.name,
          description: role.description,
          active: role.active ?? true,
          category: role.category
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating role:", error)
        return null
      }

      await this.fetchRoles()
      return data
    },

    async updateRole(role: Role) {
      const { error } = await supabase
        .from("roles")
        .update({
          name: role.name,
          description: role.description,
          active: role.active,
          category: role.category
        })
        .eq("id", role.id)

      if (error) {
        console.error("Error updating role:", error)
        return false
      }

      await this.fetchRoles()
      return true
    },

    async deleteRole(id: string) {
      // First delete role_permissions
      await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", id)

      // Then delete the role
      const { error } = await supabase
        .from("roles")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("Error deleting role:", error)
        return false
      }

      await this.fetchRoles()
      return true
    },

    async createPermission(permission: Permission) {
      const { data, error } = await supabase
        .from("permissions")
        .insert({
          module: permission.module,
          action: permission.action,
          label: permission.label
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating permission:", error)
        return null
      }

      await this.fetchPermissions()
      return data
    },

    async updatePermission(permission: Permission) {
      const { error } = await supabase
        .from("permissions")
        .update({
          module: permission.module,
          action: permission.action,
          label: permission.label
        })
        .eq("id", permission.id)

      if (error) {
        console.error("Error updating permission:", error)
        return false
      }

      await this.fetchPermissions()
      return true
    },

    async deletePermission(id: string) {
      // First delete from role_permissions
      await supabase
        .from("role_permissions")
        .delete()
        .eq("permissions_id", id)

      // Then delete the permission
      const { error } = await supabase
        .from("permissions")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("Error deleting permission:", error)
        return false
      }

      await this.fetchPermissions()
      return true
    },

    async updateRolePermissions(roleId: string, permissionIds: string[]) {
      // Delete existing permissions
      await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", roleId)

      // Insert new permissions (one insert per permission)
      if (permissionIds.length > 0) {
        const inserts = permissionIds.map(permissionId => ({
          role_id: roleId,
          permissions_id: permissionId
        }))

        const { error } = await supabase
          .from("role_permissions")
          .insert(inserts)

        if (error) {
          console.error("Error updating role permissions:", error)
          return false
        }
      }

      await this.fetchRoles()
      return true
    },

    async getRolePermissions(roleId: string) {
      const { data, error } = await supabase
        .from("role_permissions")
        .select(`
          *,
          permissions(*)
        `)
        .eq("role_id", roleId)

      if (error) {
        console.error("Error fetching role permissions:", error)
        return []
      }

      return data
    }
  }
})
