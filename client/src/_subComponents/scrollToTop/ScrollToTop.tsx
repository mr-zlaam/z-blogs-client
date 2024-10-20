"use client";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import DivWrapper from "../divWrapper/DivWrapper";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <DivWrapper
        className={cn(
          "fixed bottom-4 right-2 sm:right-10 z-[200] my-10 bg-foreground  text-background  border border-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full active:scale-75 hover:bg-foreground hover:text-background",
          isVisible ? "fixed" : "hidden",
        )}
        onClick={scrollToTop}
      >
        <ChevronUp />
      </DivWrapper>
    </>
  );
}

export default ScrollToTop;
