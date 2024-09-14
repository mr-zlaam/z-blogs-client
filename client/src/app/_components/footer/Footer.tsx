import {} from "react";
import PageWrapper from "../pageWrapper/PageWrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "@/images/logo/z-logo.png";
function Footer() {
  return (
    <footer className="relative">
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
        <Image
          src={image}
          alt="logo"
          width={200}
          height={200}
          placeholder="blur"
          className="rounded-full"
        />
      </div>
      <PageWrapper className="h-[300px] w-full bg-background/10 backdrop-blur-sm my-3  ">
        <div className="flex justify-between w-full h-full px-3 items-center">
          <div className="flex flex-col justify-center ">
            <h3 className="mx-3">Quick links</h3>

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
            <h3 className="mx-3">Social</h3>
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
    </footer>
  );
}

export default Footer;
