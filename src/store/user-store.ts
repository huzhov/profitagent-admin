import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  businessId: string | null;
  email: string | null;
  id: string | null;
  name: string | null;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

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
    { name: "userInfo" }
  )
);

export default useUserStore;
