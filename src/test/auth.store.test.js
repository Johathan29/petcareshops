import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../stores/auth.store'

// Mock supabase
vi.mock('../config/supabase', () => ({
  supabase: {
    from: () => ({
      select: vi.fn(() => Promise.resolve({ data: [], error: null })),
      insert: vi.fn(() => Promise.resolve({ error: null })),
      update: vi.fn(() => Promise.resolve({ error: null })),
      delete: vi.fn(() => Promise.resolve({ error: null })),
      eq: vi.fn(() => Promise.resolve({ error: null }))
    }),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      signOut: vi.fn(() => Promise.resolve({ error: null })),
      resetPasswordForEmail: vi.fn(() => Promise.resolve({ error: null }))
    }
  }
}))

describe('Auth Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
  })

  it('should initialize with default values', () => {
    expect(store.users).toEqual([])
    expect(store.selectedUser).toBeNull()
    expect(store.selectedUserId).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.filter).toBe('all')
    expect(store.error).toBeNull()
  })

  it('should have filteredUsers getter', () => {
    store.users = [
      { id: 1, name: 'User 1', idRole: 'admin' },
      { id: 2, name: 'User 2', idRole: 'user' }
    ]
    store.filter = 'admin'
    
    expect(store.filteredUsers).toHaveLength(1)
    expect(store.filteredUsers[0].idRole).toBe('admin')
  })

  it('should fetch users successfully', async () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ]
    
    // Mock implementation for this test
    const { supabase } = await import('../config/supabase')
    supabase.from().select.mockResolvedValueOnce({ data: mockUsers, error: null })
    
    await store.fetchUsers()
    
    expect(store.users).toEqual(mockUsers)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should handle error when fetching users', async () => {
    const { supabase } = await import('../config/supabase')
    supabase.from().select.mockResolvedValueOnce({ data: null, error: new Error('Failed to fetch') })
    
    await store.fetchUsers()
    
    expect(store.loading).toBe(false)
    expect(store.error).toBeTruthy()
  })
})
