"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {} from "react";

function GoBack() {
  const router = useRouter();
  return (
    <>
      <div
        className=" my-10 bg-transparent text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background "
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeft />
      </div>{" "}
    </>
  );
}

export default GoBack;
