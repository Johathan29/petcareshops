import { useAuthStore } from '../stores/auth.store'

export const roleMiddleware = (allowedRoles: string[]) => {
    console.log(allowedRoles[0])
  return (to, from, next) => {
    const auth = useAuthStore()

    if (allowedRoles[0].includes(auth.role)) {
      return next('/unauthorized')
    }

    next()
  }

}