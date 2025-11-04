import type { ReactNode } from "react";

export default function MainContentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="flex-1 overflow-auto">{children}</main>;
}
