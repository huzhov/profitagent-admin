import type { ReactNode } from "react";

export default function MainContentContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto px-8 py-8">{children}</div>
    </main>
  );
}
