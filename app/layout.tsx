import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "台灣芒果簡介",
  description: "探索台灣美味芒果品種",
  icons: {
    icon: "/mango-elf.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
