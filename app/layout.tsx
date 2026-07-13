import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Protect Me",
  description: " Protect Me - 3M Authorized Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      {/* Applying inter.className directly to the body sets it as the default */}
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[#E0E0E0]`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
