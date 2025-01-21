"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "@/components/Menu";
import DynamicDialog from "@/components/DynamicDialog";
import { useFocusStore } from "@/stores/focusSessionStore";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stage = useFocusStore((state) => state.stage);

  return (
    <html lang="en">
      <Head>
        <title>Focus</title>
        <meta name="description" content="Boost your focus." />
      </Head>
      <body className={`dark:bg-black bg-white antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <Menu />
            {children}
            <DynamicDialog />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
