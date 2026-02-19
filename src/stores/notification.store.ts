import { defineStore } from "pinia";
import { supabase } from "../config/supabase";

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [] as any[],
  }),

  actions: {
    subscribe(userId: string) {
      supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            this.notifications.unshift(payload.new);
          }
        )
        .subscribe();
    },
  },
});
