import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insight Institute | World-Class Math Monitoring",
  description: "Enterprise performance tracking for the Insight Institute of Management and Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full bg-black">
        {/* Persistent Global Background System */}
        <div className="global-bg">
          <div className="ambient-orb orb-1" />
          <div className="ambient-orb orb-2" />
          <div className="grid-overlay" />
        </div>
        
        {children}
      </body>
    </html>
  );
}
