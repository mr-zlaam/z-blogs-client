"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
interface ImageProps {
  src: string;
  alt: string;
  base64: string;
}
function BlurImage({ src, alt, base64 }: ImageProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <>
      <Image
        ref={ref}
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={base64}
        className={cn(
          "w-auto transition-opacity duration-400 ease-in-out object-contain",
          inView ? "opacity-0" : "opacity-100"
        )}
      />
    </>
  );
}

export default BlurImage;
