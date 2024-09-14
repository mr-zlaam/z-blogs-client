"use client";
import {} from "react";
import PageWrapper from "../pageWrapper/PageWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "@/images/logo/z-logo.png";
import { usePathname } from "next/navigation";
function Footer() {
  const path = usePathname();
  if (path === "/search") return null;
  return (
    <div className="relative">
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={image}
          alt="logo"
          width={200}
          height={200}
          placeholder="blur"
          className="rounded-full dark:opacity-100 opacity-50"
        />
      </div>
      <PageWrapper className="h-[300px] w-full bg-background/80 backdrop-blur-sm my-3  ">
        <div className="flex justify-between w-full h-full px-3 items-center">
          <div className="flex flex-col justify-center ">
            <h3 className="mx-3 text-xl font-semibold">Quick links</h3>

            <Link className="my-1" href={"/home"}>
              <Button variant={"link"} className="bg-transparent ">
                Latest Posts
              </Button>
            </Link>
            <Link className="my-1" href={"/all-posts"}>
              <Button variant={"link"} className="bg-transparent">
                All Posts
              </Button>
            </Link>
            <Link className="my-1" href={"/about"}>
              <Button variant={"link"} className="bg-transparent">
                About
              </Button>
            </Link>
            <Link className="my-1" href={"/dmca"}>
              <Button variant={"link"} className="bg-transparent">
                DMCA
              </Button>
            </Link>
            <Link className="my-1" href={"/privacypolicy"}>
              <Button variant={"link"} className="bg-transparent">
                Privacy Policy
              </Button>
            </Link>
          </div>
          <div className="flex flex-col  justify-center">
            <h3 className="mx-3 text-xl font-semibold">Social</h3>
            <Link
              className="my-1"
              href={"https://www.facebook.com/learnprogrammingzlaam"}
              target="_blank"
            >
              <Button variant={"link"} className="bg-transparent">
                Facebook
              </Button>
            </Link>
            <Link
              className="my-1"
              href={"https://instagram.com/its_zlaam"}
              target="_blank"
            >
              <Button variant={"link"} className="bg-transparent">
                Instagram
              </Button>
            </Link>
            <Link
              className="my-1"
              href={"https://x.com/mr_zlaam"}
              target="_blank"
            >
              <Button variant={"link"} className="bg-transparent">
                X-Twitter
              </Button>
            </Link>
            <Link
              className="my-1"
              href={"https://github.com/mr-zlaam"}
              target="_blank"
            >
              <Button variant={"link"} className="bg-transparent">
                Github
              </Button>
            </Link>
            <Link
              className="my-1"
              href={"https://www.threads.net/@its_zlaam"}
              target="_blank"
            >
              <Button variant={"link"} className="bg-transparent">
                Threads
              </Button>
            </Link>
          </div>
        </div>
      </PageWrapper>
      <div className="bg-background shadow-sm shadow-foreground/40 py-6">
        <div className="container mx-auto text-center">
          <p className="text-xs">
            &copy; 2024 <Link href={"/home"}>Zlaam</Link>. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
