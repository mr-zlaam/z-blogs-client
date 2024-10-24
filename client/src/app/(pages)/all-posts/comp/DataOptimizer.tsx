"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SITE_VERSION } from "@/constants";
import { BlogDataTypes } from "@/types";
import moment from "moment";
import Image from "next/image";

interface blogPostProps {
  post: BlogDataTypes;
}

function BlogDataOptimizer({ post }: blogPostProps) {
  return (
    <>
      <section className="w-full h-full px-3">
        <div className="flex my-2 md:items-center flex-col-reverse md:flex-row md:py-2">
          <Link href={`/${SITE_VERSION}/${post.blogSlug}`} className="flex-[1]">
            <span className="text-foreground/90 text-xl font-semibold block mx-2">
              {post.blogTitle}
            </span>
            <span className="text-sm mx-2 text-green-600 block">
              Published : {moment(post.createdAt).format("MMMM Do, YYYY")}
            </span>
            {/* Updated text behavior */}
            <span className="text-sm font-normal block mx-2 text-foreground/70 pr-4 text-start">
              <span className="line-clamp-5 overflow-hidden text-ellipsis">
                {post.blogOverView}
              </span>
            </span>
            <Button variant={"link"} className="bg-transparent">
              Read More...
            </Button>
          </Link>
          <div className="image md:w-[250px] flex-[1] md:flex-[0.5] w-full my-4 md:my-0 overflow-hidden rounded-md">
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted overflow-hidden rounded-md"
            >
              <Link
                href={`/${SITE_VERSION}/${post.blogSlug}`}
                className="relative block h-full w-full"
              >
                <Image
                  src={post.blogThumbnail}
                  alt={post.blogTitle}
                  fill
                  className="h-full w-full rounded object-cover"
                  quality={100}
                  sizes="(max-width: 1200px) 100vw, (max-width: 800px) calc(80vw + 40px)"
                />
              </Link>
            </AspectRatio>
          </div>
        </div>
        <Separator />
      </section>
    </>
  );
}

export default BlogDataOptimizer;
