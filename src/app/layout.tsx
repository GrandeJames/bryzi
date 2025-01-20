import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "@/components/Menu";
import DynamicDialog from "@/components/DynamicDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focus",
  description: "Boost your focus and elevate motivation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
