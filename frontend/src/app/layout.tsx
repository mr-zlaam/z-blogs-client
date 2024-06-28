import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
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
      <body className={cn(arimo.className, "font-medium bg-background")}>
        <main>
          <Toaster />
          <NextTopLoader showSpinner={false} color="#8d8dff" height={4} crawl />
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
