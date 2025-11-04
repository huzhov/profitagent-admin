import { PageHeader } from "@/components/ui/page-header";

export default function Templates() {
  return (
    <div className="container mx-auto p-6 space-y-6">
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
