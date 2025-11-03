import { PageHeader } from "@/components/ui/page-header";

export default function Templates() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Templates"
        description="Agent templates coming soon..."
        showBorder={false}
        showButton={false}
      />
    </div>
  );
}
