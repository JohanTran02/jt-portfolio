import type { Metadata } from "next";

import "../index.css";

export const metadata: Metadata = {
  description: "jt-portfolio",
  title: "jt-portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}