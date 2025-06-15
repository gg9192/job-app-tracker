import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { palette } from "@/lib/theme/colors";
import { Link } from "@/components/link";
import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import { LogoutButton } from "@/components/logoutbutton";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const currentUser = await getLoggedInUser(session);
  const isLoggedIn = currentUser !== null;


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${palette.primaryBg} ${palette.secondaryBg.replace(
          "bg-",
          "to-",
        )} bg-gradient-to-br ${palette.lightText}`}
      >
        <nav
          className={`sticky top-0 z-50 w-full backdrop-blur ${palette.primaryBg} shadow-xl px-6 py-4 flex justify-between items-center`}
        >
          <a href="/" className="text-xl font-bold text-white drop-shadow-sm">
            Job Tracker
          </a>

          {isLoggedIn ? (
            <div className="space-x-4">
              <LogoutButton />
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login">Log In</Link>
              <Link href="/sign-up">Sign Up</Link>
            </div>
          )}
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
