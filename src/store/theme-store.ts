import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Theme {
  theme: string;
}

export interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const theme: Theme = {
  theme: "light",
};

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: theme,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    { name: "theme" }
  )
);

export default useThemeStore;
