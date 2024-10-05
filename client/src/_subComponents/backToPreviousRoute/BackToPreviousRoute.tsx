"use client";
import { useRouter } from "next/navigation";
import {} from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
function BackToPreviousRoute() {
  const router = useRouter();
  const handleGoToPreviousRoute = () => {
    return router.back();
  };
  return (
    <div
      onClick={handleGoToPreviousRoute}
      className=" my-10  text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background "
    >
      <ChevronLeft />
    </div>
  );
}

export default BackToPreviousRoute;

export function GotoTheRoute({ path }: { path: string }) {
  const router = useRouter();
  return (
    <Link
      href={path}
      className=" my-10  text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background "
      onClick={() => {
        return router.refresh();
      }}
    >
      <ChevronLeft />
    </Link>
  );
}
