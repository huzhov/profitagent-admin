import useUserStore from "@/store/user-store";
import { LogoIcon } from "@/components/assets/index";
import { getInitials } from "@/helper/getInitials";
import DarkModeToggle from "../common/DarkModeToggle";

export default function Header() {
  const { user } = useUserStore();

  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-black">
          <LogoIcon className="w-full h-full object-contain p-1" />
        </div>
        <h1 className="text-lg font-semibold">ProfitAgent</h1>
      </div>
      <div className="flex items-center gap-4">
        <DarkModeToggle />
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
