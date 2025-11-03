import type { ReactNode } from "react";

export default function MainContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 space-y-6">{children}</div>
    </main>
  );
}
