import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ThemeProvider } from "@/theme/Theme";
import PageWrapper from "./_components/pageWrapper/PageWrapper";
import Header from "./_components/header/Header";
import Footer from "./_components/footer/Fotter";
import { Separator } from "@/components/ui/separator";
const arimo = Arimo({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "zlaam.dev",
    template: "%s  zlaam.dev",
  },
  description: "The habit of reading is awesome.",
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
          <NextTopLoader showSpinner={false} color="#8d8dff" height={4} crawl />
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="light"
            enableSystem
            storageKey="سمة"
          >
            <PageWrapper className="sticky top-0 left-0 w-full bg-background mb-4">
              <Header />
              <Separator />
            </PageWrapper>
            <PageWrapper className="py-3">{children}</PageWrapper>
            {/* <Footer /> */}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
