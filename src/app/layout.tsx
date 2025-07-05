import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VRTP Code Challenge",
  description: "Search and explore breweries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
