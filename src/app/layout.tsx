import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>Focus</title>
        <meta name="description" content="Boost your focus." />
        <meta name="apple-mobile-web-app-title" content="Bryzi" />
      </Head>
      <body className={`dark:bg-black bg-white antialiased ${inter.className}`}>
        <div className="flex">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
