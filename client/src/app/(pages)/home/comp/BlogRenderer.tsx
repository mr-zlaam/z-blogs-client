import { BlogDataTypes } from "@/types";
import Image from "next/image";
import { Fragment } from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
interface blogPostProps {
  post: BlogDataTypes;
}

async function BlogRenderer({ post }: blogPostProps) {
  const buffer = await fetch(post.blogThumbnail).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  console.log(buffer);
  return (
    <section className="px-2 ">
      <div className="relative border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md">
        <Image
          src={post.blogThumbnail}
          alt={post.blogTitle}
          fill
          objectFit="contain"
          placeholder="blur"
          blurDataURL={base64}
          className="w-auto"
        />
      </div>
    </section>
  );
}

export default BlogRenderer;
