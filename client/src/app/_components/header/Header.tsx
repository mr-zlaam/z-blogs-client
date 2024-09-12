"use client";

import { IoIosCheckmark } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/components/ui/link";

import { handleLogout } from "@/helper/fetch/fetchBLogs";
import { useMessage } from "@/hooks/useMessage";
import logo from "@/images/logo/z-logo.png";
import { PayLoadType } from "@/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { RandomAvatar } from "react-random-avatars";
import SendOTP from "../send-otp/SendOTP";

function Header({ user, token }: { user: PayLoadType; token: string }) {
  const { successMessage } = useMessage();
  const pathName = usePathname();
  if (pathName === "/all-posts") return null;
  const logoutTheUser = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
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
      <header className=" h-[70px]  mb-3 py-3">
        <nav className=" flex justify-between items-center ">
          <Link href={"/"}>
            <Image src={logo} alt="zlaam" height={60} width={60} />
          </Link>

          <div className="flex items-center mr-3 sm:mr-0">
            <div className="h-fit w-fit bg-background rounded-full  overflow-hidden ">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-transparent cursor-pointer  border-none flex items-center justify-center">
                  {user && user.uid ? (
                    <RandomAvatar
                      size={35}
                      mode="random"
                      name={user && user?.username}
                      square
                    />
                  ) : (
                    <FaUserCircle size={35} />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="h-fit w-[200px] shadow-md shadow-foreground/20">
                  {user && (
                    <DropdownMenuItem>
                      <div className="flex-[1]">
                        <p className="flex flex-col p-1">
                          <span className="font-normal cursor-pointer">
                            {user.fullName}
                          </span>
                          <span className="text-sm hover:underline text-foreground/70 cursor-pointer">
                            @{user.username}
                          </span>
                        </p>
                      </div>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  {/*  */}
                  {user && user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/create-post"}
                        className="p-1 text-foreground w-full  cursor-pointer"
                      >
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user && user.role === "MODERATOR" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/create-post"}
                        className="p-1 text-foreground cursor-pointer w-full"
                      >
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {/*  */}
                  {user && user.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link
                        href={"/admin/users"}
                        className="p-1 cursor-auto text-foreground w-full"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <Link
                      href={"/settings"}
                      className="p-1 text-foreground cursor-pointer w-full"
                    >
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {user && (
                    <div className="p-3 transition-all duration-200 hover:bg-foreground/20">
                      {user && (
                        <span className="text-foreground/50 cursor-not-allowed bg-transparent w-full transition-all duration-200 hover:bg-foreground/20">
                          {user && user.isVerfied ? (
                            <span className="flex items-center ">
                              Verified
                              <IoIosCheckmark
                                size={25}
                                className="text-foreground/60 mx-4"
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
                    </div>
                  )}
                  <DropdownMenuItem>
                    {user ? (
                      <span
                        onClick={logoutTheUser}
                        className="text-red-500 select-none flex-1 block p-1  cursor-pointer w-full"
                      >
                        Sign Out
                      </span>
                    ) : (
                      <Link
                        href={"/user-auth/sign-in"}
                        className="text-green-600 select-none flex-1 block p-1 w-full"
                      >
                        Sign in
                      </Link>
                    )}
                  </DropdownMenuItem>
                  {!user && (
                    <DropdownMenuItem>
                      <Link
                        href={"/user-auth/sign-up"}
                        className="text-green-600 select-none flex-1 block p-1 w-full"
                      >
                        Create Account
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
