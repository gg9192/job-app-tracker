import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { palette } from "@/lib/theme/colors"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${palette.primaryBg} ${palette.secondaryBg.replace(
          "bg-",
          "to-"
        )} bg-gradient-to-br ${palette.lightText}`}
      >
        <nav
          className={`sticky top-0 z-50 w-full backdrop-blur bg-gray-700/80 shadow-xl px-6 py-4 flex justify-between items-center`} // Changed shadow-md to shadow-xl
        >
          <a href="/" className="text-xl font-bold text-white drop-shadow-sm">
            Job Tracker
          </a>
          <div className="space-x-4">
            <a
              href="/login"
              className="text-white hover:text-lime-200 transition font-medium"
            >
              Login
            </a>
            <a
              href="/sign-up"
              className="text-white hover:text-lime-200 transition font-medium"
            >
              Sign Up
            </a>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}