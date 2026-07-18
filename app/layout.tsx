import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PageviewTracker } from "@/components/analytics/pageview-tracker";
import { generateHomeMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateHomeMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={{ viewTransitionName: "root" }}>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <PageviewTracker />
        </body>
      </ThemeProvider>
    </html>
  );
}
