import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bryzi: AI Task Management for Students - Automatically Plan Your Work",
  description:
    "Bryzi is an AI-powered task management tool designed specifically for students in University. It automatically generates and plans your tasks, helping you stay organized and focused on your studies. Available for for free on the web.",
  keywords: [
    "Bryzi",
    "Best Task Management App for Students",
    "Student",
    "Schedule",
    "AI",
    "Task Management",
    "To do",
    "Todo",
    "Productivity",
    "Organization",
    "Planner",
    "Pomodoro",
    "ADHD",
    "Calendar",
    "Assignment",
    "Homework",
  ],
  creator: "Bryzi",
  applicationName: "Bryzi",
  authors: [
    {
      name: "Bryzi",
      url: "https://bryzi.com",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://bryzi.com",
    title: "AI Task Management for Students - Automatically Create and Plan Your Work",
    description:
      "Bryzi is an AI-powered task management tool designed specifically for students in University. It automatically generates and plans your tasks, helping you stay organized and focused on your studies. Available for for free on the web.",
    siteName: "Bryzi",
    // images:
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black bg-white antialiased ${inter.className}`}>
        <div className="flex">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
