import { PageHeader } from "@/components/ui/page-header";

export default function Settings() {
  return (
    <div className="container mx-auto p-6 space-y-6">
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
