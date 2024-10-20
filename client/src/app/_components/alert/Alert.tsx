"use client";
import DivWrapper from "@/_subComponents/divWrapper/DivWrapper";
import { AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function Alert() {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="sticky w-full top-0 z-[999]">
      <AlertDescription
        className={cn(
          "bg-green-700 text-center text-background  relative  flex items-center justify-center top-3 sm:top-0 ",
          isDisabled && "hidden",
        )}
      >
        <span className="text-xs md:text-sm  block w-[80%]">
          This site is still under development. If you experience any bug,
          please report it on{" "}
          <Link
            target="_blank"
            href={"https://github.com/mr-zlaam/z-blogs/issues"}
            className="text-background underline hover:no-underline"
          >
            Github
          </Link>
        </span>
        <DivWrapper
          className="h-[25px] w-[25px] absolute top-[-2px] right-[-5px] md:right-3 text-foreground "
          onClick={() => {
            setIsDisabled(!isDisabled);
          }}
        >
          <RxCross2 size={15} className="font-bold text-white" />
        </DivWrapper>
      </AlertDescription>
    </div>
  );
}

export default Alert;
