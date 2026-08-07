import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eurowindow | Door & Building Material Solutions",
  description: "Eurowindow – complete solutions for doors, aluminium-glass partitions and building materials.",
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
