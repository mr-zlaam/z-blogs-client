import {} from "react";

import { ThemeToggler } from "@/theme/ThemeToggler";
import Footer from "../components/footer/Footer";
import { Metadata } from "next";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex   flex-col  min-h-screen">
        <div className="md:fixed md:left-3 lg:top-9 top-[43px] md:top-5 z-[999] m-4">
          <ThemeToggler />
        </div>
        <header className="z-[998] sticky top-0 ">{/* <Header /> */}</header>
        <section className="flex-[1] flex-grow relative z-[997]">
          {children}
        </section>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
