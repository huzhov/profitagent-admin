import useUserStore from "@/store/user-store";
import { Sun, Moon } from "lucide-react";
import { LogoIcon } from "@/components/assets/index";
import { getInitials } from "@/helper/getInitials";
import { useTheme } from "@/context/AppContext";
import { Button } from "../ui/button";

export default function Header() {
  const { user } = useUserStore();
  const { mode, setMode } = useTheme();

  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-black">
          <LogoIcon className="w-full h-full object-contain p-1" />
        </div>
        <h1 className="text-lg font-semibold">ProfitAgent</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setMode({ mode: mode !== "dark" ? "dark" : "light" })}
          variant="ghost"
          className="inline-flex items-center justify-center px-2.5 w-9 h-9 p-0"
        >
          {mode !== "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm">{getInitials(user?.name)}</span>
          </div>
          <div>
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
