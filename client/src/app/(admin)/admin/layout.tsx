import Link from "next/link";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import DashBoardHeader from "./components/dashboard-header/header";
import Aside from "./components/aside/aside";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useCookieGrabber();
  if (!token) {
    return (
      <div className="min-h-[100dvh] flex justify-center items-center flex-col gap-5">
        <h1 className="text-4xl font-bold italic">
          You Can&apos;t Access this page
        </h1>
        <Link href={"/"} className=" text-blue-500 font-medium text-xl ">
          Return To Home
        </Link>
      </div>
    );
  }
  return (
    <section className="flex min-h-screen w-full flex-col bg-background ">
      <Aside />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashBoardHeader />
        {children}
      </div>
    </section>
  );
}
