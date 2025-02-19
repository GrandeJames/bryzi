"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "@/components/Menu";
import DynamicDialog from "@/app/dialogs/DynamicDialog";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const inFocusSession = useFocusSessionStore((state) => state.sessionStage);
  const pathname = usePathname();

  const hiddenNavPages = ["/landing"];

  return (
    <html lang="en">
      <Head>
        <title>Focus</title>
        <meta name="description" content="Boost your focus." />
        <meta name="apple-mobile-web-app-title" content="Bryzi" />
      </Head>
      <body className={`dark:bg-black bg-white antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            {!inFocusSession && !hiddenNavPages.includes(pathname) && <Menu />}
            <ScrollArea className="flex-1 h-screen">
              <div className="flex-1 mb-28">{children}</div>
            </ScrollArea>
            <DynamicDialog />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
