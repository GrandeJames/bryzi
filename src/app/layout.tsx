import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  // <= 60 characters
  title: "Bryzi: AI Task Management for Students - Auto-Plan Your Work",

  // <= 150-160 characters
  description:
    "Bryzi: AI Task Management for Students. Generate tasks from course syllabus, auto-plan semesters, & track progress. Available for free on the web.",
  keywords: [
    "Best Task Management App for Students",
    "Student Task Planner",
    "AI Task Management",
    "AI Academic Scheduler",
    "Auto Task Generator",
    "Productivity Tool",
    "ADHD-Friendly Planner",
    "University Assigment Tracker",
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
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}
