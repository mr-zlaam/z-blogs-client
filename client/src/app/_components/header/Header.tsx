"use client";
import { Separator } from "@/components/ui/separator";

import DivWrapper from "@/_subComponents/divWrapper/DivWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosCheckmark } from "react-icons/io";

import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleLogout } from "@/helper/fetch/fetchBLogs";
import { useMessage } from "@/hooks/useMessage";
import logo from "@/images/logo/z-logo.png";
import { PayLoadType } from "@/types";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { RandomAvatar } from "react-random-avatars";
import SendOTP from "../send-otp/SendOTP";

function Header({ user, token }: { user: PayLoadType; token: string }) {
  const { successMessage } = useMessage();
  const router = useRouter();
  const pathName = usePathname();
  if (pathName === "/all-posts") return null;
  const logoutTheUser = async () => {
    try {
      const res = await handleLogout(token as string);
      if (res?.status === 200) {
        successMessage("User logout successfully");
        if (typeof window !== "undefined") return location.reload();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <header className=" h-[70px]  ">
        <nav className=" flex justify-between items-center ">
          <Link href={"/"}>
            <Image src={logo} alt="zlaam" height={70} width={70} />
          </Link>

          <div className="flex items-center">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <DivWrapper title="Search">
                    <GoSearch size={20} />
                  </DivWrapper>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded shadow-md shadow-foreground/30">
                  <DialogHeader>
                    <DialogDescription>
                      <div className="relative  h-fit border-[2px] border-black w-full">
                        <Input
                          type="text"
                          className="w-[90%] border-solid h-full font-semibold sm:text-lg p-4 outline-none  shadow-md shadow-foreground/20 pr-14 bg-transparent"
                          placeholder="Search"
                          autoFocus
                          autoComplete="off"
                        />
                        <button className="bg-transparent border-none cursor-pointer absolute top-2 right-7 lg:right-10 ">
                          <DialogClose asChild>
                            <DivWrapper className="h-[35px] w-[35px]">
                              <GoSearch size={25} />
                            </DivWrapper>
                          </DialogClose>
                        </button>
                      </div>
                    </DialogDescription>
                    <DialogFooter>
                      <p className="w-full text-center font-normal text-xs py-3 select-none">
                        Search Posts across the site
                      </p>
                    </DialogFooter>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2"></div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="h-[40px] w-[40px] bg-background rounded-full  overflow-hidden border border-solid border-foreground/60">
              <Popover>
                <PopoverTrigger className="bg-transparent cursor-pointer  border-none">
                  {user && user.uid ? (
                    <RandomAvatar
                      size={42}
                      name={(user && user.username) || "hero"}
                      square
                    />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                </PopoverTrigger>
                <PopoverContent className="h-fit w-[200px] shadow-md shadow-foreground/20">
                  {user && user.fullName && (
                    <div className="flex-[1] p-3">
                      <p className="flex flex-col p-2">
                        <span className="font-normal cursor-pointer">
                          {user.fullName}
                        </span>
                        <span className="text-sm hover:underline text-foreground/70 cursor-pointer">
                          @{user.username}
                        </span>
                      </p>
                    </div>
                  )}
                  <Separator />

                  <div className="flex-[2] flex flex-col  ">
                    {(user && user.role === "ADMIN") ||
                      (user && user.role === "MODERATOR" && (
                        <Link
                          href={"/create-post"}
                          className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                        >
                          Create Post
                        </Link>
                      ))}
                    {user && user.role === "ADMIN" && (
                      <Link
                        href={"#"}
                        className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user && (
                      <span className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded">
                        {user && user.isVerfied ? (
                          <span className="flex items-center ">
                            Verified
                            <IoIosCheckmark
                              size={25}
                              className="text-foreground mx-4"
                            />
                          </span>
                        ) : (
                          <SendOTP
                            email={user && (user.email as string)}
                            token={token as string}
                          />
                        )}
                      </span>
                    )}
                    <Link
                      href={"/settings"}
                      className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                    >
                      Settings
                    </Link>
                  </div>
                  <Separator />

                  <div>
                    {user ? (
                      <span
                        onClick={logoutTheUser}
                        className="text-red-500 select-none flex-1 block p-2 my-1 hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                      >
                        Sign Out
                      </span>
                    ) : (
                      <Link
                        href={"/user-auth/sign-in"}
                        className="text-green-600 select-none flex-1 block p-2 my-1  hover:bg-foreground/10 duration-200 transition-all cursor-pointer  rounded"
                      >
                        Sign in
                      </Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
