"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface JobsState {
  savedJobIds: string[];
  appliedJobIds: string[];
  toggleSaveJob: (id: string) => void;
  unsaveJob: (id: string) => void;
  markApplied: (id: string) => void;
}

export const useJobsStore = create<JobsState>()(
  persist(
    (set) => ({
      savedJobIds: [],
      appliedJobIds: [],

      toggleSaveJob: (id) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.includes(id)
            ? state.savedJobIds.filter((j) => j !== id)
            : [...state.savedJobIds, id],
        })),

      unsaveJob: (id) =>
        set((state) => ({
          savedJobIds: state.savedJobIds.filter((j) => j !== id),
        })),

      markApplied: (id) =>
        set((state) =>
          state.appliedJobIds.includes(id)
            ? state
            : { appliedJobIds: [...state.appliedJobIds, id] }
        ),
    }),
    {
      name: "career-nexus-jobs",
      storage: createJSONStorage(() => localStorage),
      // Hydrate manually after mount (see Providers) to avoid SSR mismatch.
      skipHydration: true,
    }
  )
);
