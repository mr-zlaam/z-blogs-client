"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface ImageProps {
  src: string;
  alt: string;
  base64: string;
}
function BlurImage({ src, alt, base64 }: ImageProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={base64}
        className={cn("w-auto")}
      />
    </>
  );
}

export default BlurImage;
