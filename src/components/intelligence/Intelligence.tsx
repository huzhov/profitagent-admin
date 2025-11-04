import { PageHeader } from "@/components/ui/page-header";

export default function Intelligence() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <PageHeader
        title="Intelligence"
        description="AI intelligence and insights coming soon..."
        showBorder={false}
        showButton={false}
      />
    </div>
  );
}
