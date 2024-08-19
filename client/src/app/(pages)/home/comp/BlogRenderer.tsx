import { BlogDataTypes } from "@/types";
import Image from "next/image";
import { Fragment } from "react";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";
import BlurImage from "./BlurImage";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/ui/link";
interface blogPostProps {
  post: BlogDataTypes;
}

async function BlogRenderer({ post }: blogPostProps) {
  const buffer = await fetch(post?.blogThumbnail).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);

  return (
    <section className="px-2 ">
      <div className="relative  md:h-fit py-3 h-[300px] rounded-md flex justify-start  items-start  overflow-hidden">
        <Link href={`#`}>
          <BlurImage
            src={post.blogThumbnail}
            alt={post.blogTitle}
            base64={base64}
            width={500}
            height={200}
            className="rounded"
          />
        </Link>
        <h1 className="mx-4">
          <Link href={`#`} className="text-foreground">
            {post.blogTitle}
          </Link>
        </h1>
      </div>
      <Separator />
    </section>
  );
}

export default BlogRenderer;
