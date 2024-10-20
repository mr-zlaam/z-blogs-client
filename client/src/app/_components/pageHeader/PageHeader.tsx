"use client";
import { Button } from "@/components/ui/button";
import { useActivePath } from "@/helper/checkActivePath/CheckActivePath";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { navLinks } from "./components/NavLinks";
import SearchAcrossTheSite from "@/_subComponents/searchAcrossTheSite/SearchAcrossTheSite";

function PageHeader() {
  const isActivePath = useActivePath();
  const pathName = usePathname();
  if (pathName === "/settings") return null;
  return (
    <header className="flex items-center justify-between">
      <div className="w-full flex items-center  my-4  overflow-x-auto overflow-y-hidden">
        {navLinks.map((data) => (
          <Fragment key={data.name}>
            <Link
              href={data.path}
              className="mx-2 my-4 border border-solid rounded-md"
            >
              <Button
                variant={data.variant}
                className={cn(
                  isActivePath(data.path) &&
                    "bg-foreground text-background duration-300 ",
                  data.className,
                )}
              >
                {data.name}
              </Button>
            </Link>
          </Fragment>
        ))}
      </div>
      <SearchAcrossTheSite />
    </header>
  );
}

export default PageHeader;
