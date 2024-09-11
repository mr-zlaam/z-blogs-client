import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/Theme";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./editor.global.css";
import "./globals.css";
import Head from "next/head";
const arimo = Arimo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://zlaam-vercel.app/"),
  title: {
    default: "Zlaam - Read the quality articles",
    template: "%s - Zlaam - Read the quality articles",
  },
  description:
    "The collection of wonderful bussiness articles for developers and tech enthusiasts!",
  openGraph: {
    title: "Zlaam | Read the quality articles",
    description:
      "The collection of wonderful bussiness articles for developers and tech enthusiasts!",
    type: "website",
    locale: "en_US",
    url: "https://zlaam-vercel.app/",
    siteName: "Zlaam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={cn(arimo.className, "font-medium bg-background font-sans")}
      >
        <main>
          <Toaster />
          <NextTopLoader
            showSpinner={false}
            color="#8d8dff"
            height={4}
            crawl
            zIndex={999}
          />
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="سمة"
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
