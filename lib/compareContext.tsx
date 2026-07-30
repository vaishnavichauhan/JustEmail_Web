"use client";

import React from "react";
import { useCompareStore, PlanItem as ZustandPlanItem } from "./compareStore";

export type PlanItem = ZustandPlanItem;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const useCompare = () => {
  const selectedPlans = useCompareStore((state) => state.selectedPlans);
  const toggleComparePlan = useCompareStore((state) => state.toggleComparePlan);
  const isPlanSelected = useCompareStore((state) => state.isPlanSelected);
  const clearComparePlans = useCompareStore((state) => state.clearComparePlans);

  return {
    selectedPlans,
    toggleComparePlan,
    isPlanSelected,
    clearComparePlans,
  };
};
