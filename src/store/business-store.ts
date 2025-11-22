import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Business } from "@/context/types";
import { getCurrentUserBusiness } from "@/services/business";

export interface BusinessStore {
  business: Business | null;
  loading: boolean;
  error: string | null;
  setBusiness: (business: Business | null) => void;
  fetchBusiness: (user: { businessId?: string | null }) => Promise<void>;
  clearBusiness: () => void;
}

const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      business: null,
      loading: false,
      error: null,

      setBusiness: (business: Business | null) =>
        set({ business, error: null }),

      fetchBusiness: async (user: { businessId?: string | null }) => {
        // If no businessId, clear business immediately
        if (!user?.businessId) {
          set({ business: null, loading: false, error: null });
          // Also clear from localStorage
          localStorage.removeItem("business");
          return;
        }

        // If current business doesn't match user's businessId, clear it
        const currentBusiness = get().business;
        if (currentBusiness && currentBusiness.id !== user.businessId) {
          set({ business: null, loading: false, error: null });
          localStorage.removeItem("business");
        }

        set({ loading: true, error: null });
        try {
          const business = await getCurrentUserBusiness(user);
          set({ business, loading: false, error: null });
        } catch (error: any) {
          set({
            business: null,
            loading: false,
            error: error?.message || "Failed to fetch business",
          });
        }
      },

      clearBusiness: () => set({ business: null, loading: false, error: null }),
    }),
    {
      name: "business",
      // Only persist business data, not loading/error states
      partialize: (state) => ({ business: state.business }),
    }
  )
);

export default useBusinessStore;
