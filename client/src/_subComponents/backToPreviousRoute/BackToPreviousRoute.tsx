"use client";
import { useRouter } from "next/navigation";
import {} from "react";
import { ChevronLeft } from "lucide-react";
function BackToPreviousRoute() {
  const router = useRouter();
  const handleGoToPreviousRoute = () => {
    return router.back();
  };
  return (
    <div className=" my-10 bg-transparent text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background ">
      <ChevronLeft />
    </div>
  );
}

export default BackToPreviousRoute;
