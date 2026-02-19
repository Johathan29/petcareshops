import { useAuthStore } from '../stores/auth.store'

export const authGuard = (to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/auth')
  }

  if (to.meta.roles) {
    if (!to.meta.roles.includes(auth.role)) {
      return next('/')
    }
  }

  next()
}
