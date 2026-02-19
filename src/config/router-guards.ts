import { useAuthStore } from "../stores/auth.store";

export const roleGuard = (allowed: string[]) => {
  return async (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    await auth.fetchUsers();

    if (!allowed.includes(auth.profile?.roles?.name)) {
      return next("/unauthorized");
    }

    next();
  };
};
