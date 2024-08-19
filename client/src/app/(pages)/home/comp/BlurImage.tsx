"use client";
import Image from "next/image";
import {} from "react";

function BlurImage({
  src,
  alt,
  base64,
}: {
  src: string;
  alt: string;
  base64: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="contain"
        placeholder="blur"
        blurDataURL={base64}
        className="w-auto"
      />
    </>
  );
}

export default BlurImage;
