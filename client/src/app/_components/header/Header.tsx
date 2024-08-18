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
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import logo from "@/images/logo/z-logo.png";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import { RandomAvatar } from "react-random-avatars";
import { DialogClose } from "@radix-ui/react-dialog";

function Header() {
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
            <div className="h-[40px] w-[40px] bg-background rounded-full  overflow-hidden ">
              <Popover>
                <PopoverTrigger className="bg-transparent cursor-pointer  border-none">
                  <RandomAvatar size={42} name="hero" square />
                </PopoverTrigger>
                <PopoverContent className="h-fit w-[200px] shadow-md shadow-foreground/20">
                  <div className="flex-[1] p-3 hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded">
                    username
                  </div>
                  <Separator />

                  <div className="flex-[2] flex flex-col cursor-pointer ">
                    <Link
                      href={"/create-post"}
                      className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                    >
                      Create Post
                    </Link>
                    <Link
                      href={"#"}
                      className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={"/settings"}
                      className="p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded"
                    >
                      Settings
                    </Link>
                  </div>
                  <Separator />

                  <div className="flex-1 p-2 my-1 text-foreground hover:bg-foreground/10 duration-200 transition-all cursor-pointer font-normal rounded">
                    Sign out
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
