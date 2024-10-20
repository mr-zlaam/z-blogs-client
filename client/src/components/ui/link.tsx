import { ReactNode } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { cn } from "@/lib/utils";

interface CustomLinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
  varient?: "expand-from-left" | "expand-from-right" | "expand-from-center";
}

export function Link({
  href,
  children,
  className,
  varient,
  ...props
}: CustomLinkProps) {
  return (
    <NextLink
      {...props}
      href={href}
      className={cn(
        className,
        varient === "expand-from-left"
          ? "relative  no-underline   w-fit block after:block after:content-[''] after:absolute after:h-[2px]  after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
          : "cursor-pointer no-underline ",
        varient === "expand-from-center" &&
          "relative   w-fit block after:block after:content-[''] after:absolute after:h-[2px]  after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center",
        varient === "expand-from-right" &&
          "relative   w-fit block after:block after:content-[''] after:absolute after:h-[2px]  after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right",
      )}
    >
      {children}
    </NextLink>
  );
}
