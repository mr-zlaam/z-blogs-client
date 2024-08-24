"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollToEnd() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToEnd = () => {
    const maxHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: maxHeight, behavior: "smooth" });
  };

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
    <div
      className={cn(
        "fixed bottom-4 right-2 sm:right-10 my-10 bg-foreground md:bg-transparent text-background md:text-foreground border border-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background",
        isVisible ? "block" : "hidden"
      )}
      onClick={scrollToEnd}
    >
      <ChevronDown className="text-foreground" />
    </div>
  );
}

export default ScrollToEnd;
