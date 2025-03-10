"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "@/components/Menu";
import DynamicDialog from "@/app/dialogs/DynamicDialog";
import { useFocusSessionStore } from "@/stores/focusSessionStore";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "../../../@components/ui/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const inFocusSession = useFocusSessionStore((state) => state.sessionStage);
  const pathname = usePathname();

  //   <Head>
  //     <title>Focus</title>
  //     <meta name="description" content="Boost your focus." />
  //     <meta name="apple-mobile-web-app-title" content="Bryzi" />
  //   </Head>;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex">
        {!inFocusSession && pathname.startsWith("/app") && <Menu />}
        <ScrollArea className="flex-1 h-screen">
          <div className="flex-1">{children}</div>
          <Toaster position="top-right" />
        </ScrollArea>
        <DynamicDialog />
      </div>
    </ThemeProvider>
  );
}
