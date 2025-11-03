import { PageHeader } from "@/components/ui/page-header";

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Settings"
        description="Settings and configuration options coming soon..."
        showBorder={false}
        showButton={false}
      />
    </div>
  );
}
