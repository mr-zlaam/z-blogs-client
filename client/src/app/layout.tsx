import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/theme/Theme";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "./editor.global.css";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
            <Alert>
              <AlertDescription className="bg-foreground/60 text-center text-background rounded">
                This site is still underdevelopment. You may find some bugs.
              </AlertDescription>
            </Alert>

            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
