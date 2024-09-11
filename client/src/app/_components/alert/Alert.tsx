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
    <div>
      <AlertDescription
        className={cn(
          "bg-green-700 text-center text-background rounded relative h-10 flex items-center justify-center",
          isDisabled && "hidden"
        )}
      >
        <span>
          This site is still under development. If you experience any bug,
          please report it on {" "}
          <Link
            target="_blank"
            href={"https://github.com/mr-zlaam/z-blogs/issues"}
            className="text-background underline hover:no-underline"
          >
            Github
          </Link>
        </span>
        <DivWrapper
          className="h-[25px] w-[25px] absolute top-[7px] right-3 text-foreground"
          onClick={() => {
            setIsDisabled(!isDisabled);
          }}
        >
          <RxCross2 size={20} className="font-bold" />
        </DivWrapper>
      </AlertDescription>
    </div>
  );
}

export default Alert;
