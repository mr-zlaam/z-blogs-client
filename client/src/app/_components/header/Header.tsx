"use client";

import {} from "react";
import logo from "@/images/logo/z-logo.png";
import Image from "next/image";
import Link from "next/link";
import { RandomAvatar } from "react-random-avatars";
import { GoSearch } from "react-icons/go";

import { Input } from "@/components/ui/input";
import DivWrapper from "@/_subComponents/divWrapper/DivWrapper";

function Header() {
  return (
    <>
      <header className=" h-[70px] ">
        <nav className=" flex justify-around items-center">
          <Link href={"/"}>
            <Image src={logo} alt="zlaam" height={70} width={70} />
          </Link>
          <div className="relative">
            <Input
              type="text"
              className="border-foreground/50 border min-w-[300px] shadow-md shadow-foreground/20 py-5  pr-14"
              placeholder="Search"
            />
            <button className="bg-transparent border-none cursor-pointer">
              <DivWrapper className="absolute top-1 right-2 h-[35px] w-[35px]">
                <GoSearch size={25} />
              </DivWrapper>
            </button>
          </div>
          <div>
            <div className="h-[40px] w-[40px] bg-background rounded-full  overflow-hidden ">
              <Link href={"#"}>
                <RandomAvatar size={42} name="hero" square />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
