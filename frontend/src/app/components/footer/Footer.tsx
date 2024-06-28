import {} from "react";
import { navLinks } from "../NavBar/components/NavLinks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Footer() {
  return (
    <>
      <footer className="text-xs bg-foreground/80 text-background p-5 mt-2 flex justify-between sm:justify-evenly items-center ">
        &copy; 2024 &nbsp;&nbsp;&nbsp;Zlaam&trade;.All Rights Reserved
        <div className="flex flex-col sm:flex-row">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <Button
                variant={"link"}
                className={cn("text-background text-sm")}
              >
                {link.name}
              </Button>
            </Link>
          ))}
          <Link
            href={"mailto:zlaam.dev@gmail.com"}
            className="hover:underline text-sm"
          >
            <Button variant={"link"} className={cn("text-background text-sm")}>
              @E-Mail
            </Button>
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
