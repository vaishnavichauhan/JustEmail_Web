"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      login: (userData: UserProfile, token?: string) =>
        set({
          user: userData,
          token: token || userData.token || null,
          isAuthenticated: true,
        }),
      signup: (account: RegisteredAccount) =>
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
        }),
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
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "justemails-auth-storage",
    }
  )
);
