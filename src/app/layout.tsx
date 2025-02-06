"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "@/components/Menu";
import DynamicDialog from "@/app/dialogs/DynamicDialog";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { usePathname } from "next/navigation";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stage = useFocusSessionStore((state) => state.sessionStage);
  const pathname = usePathname();

  const hiddenNavPages = ["/landing"];

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
          <div className="flex w-full min-h-screen">
            {!stage && !hiddenNavPages.includes(pathname) && <Menu />}
            <div className="flex-1">{children}</div>
            <DynamicDialog />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
