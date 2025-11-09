import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserStore } from "@/types/user";

const user: User = {
  businessId: "",
  email: "",
  id: "",
  name: "",
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: user,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: user }),
    }),
    { name: "user" }
  )
);

export default useUserStore;
