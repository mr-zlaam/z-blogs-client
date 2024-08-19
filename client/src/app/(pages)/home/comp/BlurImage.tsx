"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface ImageProps {
  src: string;
  alt: string;
  base64?: string;
  width?: number;
  height?: number;
  className?: string;
}
function BlurImage({ src, alt, base64, className, height, width }: ImageProps) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        // placeholder="blur"
        // blurDataURL={base64}
        className={cn(className, "w-auto object-contain")}
      />
    </>
  );
}

export default BlurImage;
