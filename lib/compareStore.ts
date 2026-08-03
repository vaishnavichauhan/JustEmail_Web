"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlanItem {
  id: string;
  providerId: string;
  providerName: string;
  planName: string;
  subtitle?: string;
  price: string;
  period: string;
  logo: string;
  storage: string;
  sla: string;
  attachment: string;
  features: string[];
}

interface CompareState {
  selectedPlans: PlanItem[];
  toggleComparePlan: (plan: PlanItem) => void;
  isPlanSelected: (planId: string) => boolean;
  clearComparePlans: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selectedPlans: [],

      toggleComparePlan: (plan: PlanItem) => {
        const { selectedPlans } = get();
        const exists = selectedPlans.some((p) => p.id === plan.id);

        if (exists) {
          set({
            selectedPlans: selectedPlans.filter((p) => p.id !== plan.id),
          });
        } else {
          if (selectedPlans.length >= 4) {
            alert("You can compare up to 4 plans simultaneously.");
            return;
          }
          set({
            selectedPlans: [...selectedPlans, plan],
          });
        }
      },

      isPlanSelected: (planId: string) => {
        return get().selectedPlans.some((p) => p.id === planId);
      },

      clearComparePlans: () => {
        set({ selectedPlans: [] });
      },
    }),
    {
      name: "justEmails_compare_store",
    }
  )
);
