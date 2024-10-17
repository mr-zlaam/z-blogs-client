import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/Theme";
import type { Metadata } from "next";
import { Arimo, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./editor.global.css";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import Footer from "./_components/footer/Footer";
import { SITE_DESCRIPTION, SITE_URL } from "@/constants";

const arimo = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "mr-zlaam- Read the quality articles",
    template: "%s - mr-zlaam | Read the quality articles",
  },
  authors: [{ name: "mr-zlaam", url: "https://github.com/mr-zlaam" }],
  category: "A Blog Application for Developers and Tech Enthusiasts",
  keywords: [
    "mr-zlaam",
    "Mern-Stack Developer",
    "A blog application",
    "zlaam",
    "siraj",
    "Zlaam",
    "web-developer",
    "articles",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  publisher: "mr-zlaam",
  creator: "mr-zlaam",
  description: SITE_DESCRIPTION,
  twitter: {
    card: "summary_large_image",
    title: "mr-zlaam | Read the quality articles",
    description:
      "The collection of wonderful bussiness articles for developers and tech enthusiasts!",
    creator: "mr-zlaam",
    images: [`${SITE_URL}/opengraph-image.png`],
    site: SITE_URL,
    siteId: SITE_URL,
    creatorId: SITE_URL,
  },
  appLinks: {
    web: {
      url: SITE_URL || "",
      should_fallback: true,
    },
  },
  applicationName: "mr-zlaam",

  openGraph: {
    title: "mr-zlaam | Read the quality articles",
    description:
      "The collection of wonderful bussiness articles for developers and tech enthusiasts!",
    type: "website",
    locale: "en_US",
    url: SITE_URL || "",
    siteName: "mr-zlaam",
    images: [
      {
        url: `${SITE_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        hostname: "mr-zlaam",
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
              defaultTheme="light"
              enableSystem
              storageKey="سمة"
            >
              {children}
              <footer className="">
                <Footer />
              </footer>
            </ThemeProvider>
          </main>
        </CookiesProvider>
      </body>
    </html>
  );
}
