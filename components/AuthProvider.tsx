"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);

  useEffect(() => {
    // Sync session from JWT Cookie on load/refresh
    async function checkAuthSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            loginStore(data.user, data.token);
          } else {
            logoutStore();
          }
        } else if (res.status === 401) {
          logoutStore();
        }
      } catch (error) {
        // Silent catch for offline or non-authenticated visits
      }
    }

    checkAuthSession();
  }, [loginStore, logoutStore]);

  return <>{children}</>;
}
