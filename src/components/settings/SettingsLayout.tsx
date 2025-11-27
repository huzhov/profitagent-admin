import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const router = useRouterState();

  // Determine active tab from current path
  const currentPath = router.location.pathname;
  const activeTab = currentPath.includes("/account")
    ? "account"
    : currentPath.includes("/reporting")
      ? "reporting"
      : "general";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account, integrations, and view reporting insights"
        showBorder={false}
        showButton={false}
      />

      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          {/* <TabsTrigger
            value="general"
            onClick={() => navigate({ to: "/settings/general" })}
          >
            <User className="w-4 h-4 mr-2" />
            General
          </TabsTrigger> */}
          <TabsTrigger
            value="account"
            onClick={() => navigate({ to: "/settings/account" })}
          >
            <Shield className="w-4 h-4 mr-2" />
            Account & Integration
          </TabsTrigger>
          {/* <TabsTrigger
            value="reporting"
            onClick={() => navigate({ to: "/settings/reporting" })}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Reporting
          </TabsTrigger> */}
        </TabsList>

        <div className="mt-6">{children}</div>
      </Tabs>
    </div>
  );
}
