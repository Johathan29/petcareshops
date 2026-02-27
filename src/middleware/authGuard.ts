import { useAuthStore } from '../stores/auth.store'

export const authMiddleware = (to, from, next) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    return next('/login')
  }

  next()
}