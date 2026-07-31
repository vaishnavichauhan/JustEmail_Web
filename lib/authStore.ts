"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCompareStore } from "./compareStore";

export interface UserProfile {
  fullName: string;
  email: string;
  role?: "admin" | "reseller" | "user";
  token?: string | null;
}

export interface RegisteredAccount {
  fullName: string;
  email: string;
  password?: string;
  role?: "admin" | "reseller" | "user";
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  registeredUsers: RegisteredAccount[];
  login: (userData: UserProfile, token?: string) => void;
  signup: (account: RegisteredAccount) => void;
  registerAccount: (account: RegisteredAccount) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      registeredUsers: [],
      login: (userData: UserProfile, token?: string) => {
        const currentEmail = get().user?.email?.toLowerCase();
        const newEmail = userData.email?.toLowerCase();

        // Clear compare plans when logging in as a different user or logging in from guest session
        if (!currentEmail || currentEmail !== newEmail) {
          useCompareStore.getState().clearComparePlans();
        }

        set({
          user: userData,
          token: token || userData.token || null,
          isAuthenticated: true,
        });
      },
      signup: (account: RegisteredAccount) => {
        useCompareStore.getState().clearComparePlans();
        set((state) => {
          const existing = state.registeredUsers.filter(
            (u) => u.email.toLowerCase() !== account.email.toLowerCase()
          );
          return {
            user: { fullName: account.fullName, email: account.email, role: account.role || "user" },
            token: null,
            isAuthenticated: true,
            registeredUsers: [
              ...existing,
              {
                fullName: account.fullName,
                email: account.email,
                password: account.password || "",
                role: account.role || "user",
              },
            ],
          };
        });
      },
      registerAccount: (account: RegisteredAccount) =>
        set((state) => {
          const existing = state.registeredUsers.filter(
            (u) => u.email.toLowerCase() !== account.email.toLowerCase()
          );
          return {
            registeredUsers: [
              ...existing,
              {
                fullName: account.fullName,
                email: account.email,
                password: account.password || "",
                role: account.role || "user",
              },
            ],
          };
        }),
      logout: () => {
        const wasLoggedIn = get().isAuthenticated || get().user !== null;
        if (wasLoggedIn) {
          useCompareStore.getState().clearComparePlans();
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "justemails-auth-storage",
    }
  )
);

