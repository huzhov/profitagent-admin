import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "../ui/button";

export default function DarkModeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button
      onClick={() => setMode({ mode: mode === "dark" ? "light" : "dark" })}
      variant="ghost"
      className="inline-flex items-center justify-center px-2.5 w-9 h-9 p-0"
    >
      {mode !== "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
}
