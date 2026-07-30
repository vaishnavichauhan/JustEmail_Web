import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "justEmails - Enterprise Business Email, Migration & Backup Platform",
  description: "Unified business email platform featuring zero-downtime cross-tenant migration, automated domain management, multi-tenant governance, and cloud backups.",
  keywords: ["Business Email", "Cross-Tenant Migration", "Email Backup", "Domain Management", "Microsoft 365 Migration", "Google Workspace Migration"],
  authors: [{ name: "justEmails Team" }],
};

import { CompareProvider } from "@/lib/compareContext";
import { CartProvider } from "@/lib/cartContext";
import BackToTop from "@/components/BackToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased selection:bg-primary selection:text-white bg-background text-foreground">
        <CompareProvider>
          <CartProvider>
            {children}
            <BackToTop />
          </CartProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
