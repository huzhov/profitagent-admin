export { default as useThemeStore } from "@/store/theme-store";
import themeStore from "@/store/theme-store";

export function useTheme() {
  const mode = themeStore((state) => state.mode);
  const setMode = themeStore((state) => state.setMode);

  return {
    mode,
    setMode,
  };
}
