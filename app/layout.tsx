import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "さかさま不動産クエスト MVP0.1",
  description: "MVP0.1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
