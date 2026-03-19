import { config } from '@vue/test-utils'

// Global mock for supabase
globalThis.supabaseMock = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ error: null }),
    update: () => Promise.resolve({ error: null }),
    delete: () => Promise.resolve({ error: null }),
    eq: () => Promise.resolve({ error: null })
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: null })
  }
}

// Silence console.error during tests (optional)
const originalConsoleError = console.error
console.error = (...args) => {
  if (args[0]?.includes?.('Error fetching')) return
  originalConsoleError.apply(console, args)
}

// Global test utilities
config.global.mocks = {
  $supabase: globalThis.supabaseMock
}
