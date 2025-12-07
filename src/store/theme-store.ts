import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Mode {
  mode: string;
}

export interface ThemeStore {
  mode: string;
  setMode: (mode: Mode) => void;
}

const mode: Mode = {
  mode: "light",
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: mode?.mode,
      setMode: (mode: Mode) => set({ mode: mode?.mode }),
    }),
    { name: "theme" }
  )
);

export default useThemeStore;
