"use client";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={cn(
          "fixed bottom-4 right-2 sm:right-10 my-10 bg-foreground md:bg-transparent text-background md:text-foreground border border-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background ",
          isVisible ? "fixed" : "hidden"
        )}
        onClick={scrollToTop}
      >
        <ChevronUp />
      </div>
    </>
  );
}

export default ScrollToTop;
