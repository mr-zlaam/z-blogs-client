import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/Theme";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./editor.global.css";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import Footer from "./_components/footer/Footer";

const arimo = Arimo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://zlaam-vercel.app/"),
  title: {
    default: "Zlaam - Read the quality articles",
    template: "%s - Zlaam | Read the quality articles",
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
    images: [
      {
        url: "https://live.staticflickr.com/65535/53987616162_1856ddcf4d_b.jpg",
        width: 1200,
        height: 630,
      },
    ],
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
        <CookiesProvider>
          {" "}
          <main className="">
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
              <Footer />
            </ThemeProvider>
          </main>
        </CookiesProvider>
      </body>
    </html>
  );
}
