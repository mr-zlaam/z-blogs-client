"use client";
import { ChevronDownCircleIcon } from "lucide-react";
import DivWrapper from "../divWrapper/DivWrapper";
import { useEffect, useState } from "react";

function ScrollToEnd() {
  const [isVisible, setIsVisible] = useState<boolean>(true); // Change this to true

  const scrollToEnd = () => {
    const maxHeight =
      document.documentElement.scrollHeight + window.innerHeight; // Subtract the window height
    window.scrollTo({ top: maxHeight, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
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
      {isVisible && ( // Change this to isVisible
        <DivWrapper onClick={scrollToEnd}>
          <ChevronDownCircleIcon
            className="text-foreground  cursor-pointer"
            size={30}
          />
        </DivWrapper>
      )}
    </>
  );
}

export default ScrollToEnd;
