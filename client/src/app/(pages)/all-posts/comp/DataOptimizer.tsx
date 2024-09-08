"use client";
import { Link } from "@/components/ui/link";
import { BlogDataTypes } from "@/types";
import { getPlaiceholder } from "plaiceholder";
import {} from "react";
import BlogDescription from "../../home/comp/BlogDescription";
import { SITE_VERSION } from "@/constants";
import moment from "moment";
import BlurImage from "@/_subComponents/blurImage/BlurImage";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
interface blogPostProps {
  post: BlogDataTypes;
}
function BlogDataOptimizer({ post }: blogPostProps) {
  // if (!post) return null;
  // const buffer = await fetch(post?.blogThumbnail).then(async (res) =>
  //   Buffer.from(await res.arrayBuffer())
  // );
  // const { base64 } = await getPlaiceholder(buffer);
  return (
    <>
      <section className="px-2 ">
        <div className="relative  md:h-fit py-3 h-[300px] rounded-md flex justify-start  items-start w-full ">
          <div className="relative w-[800px] h-[200px] overflow-hidden rounded-md">
            <Link
              href={`/${SITE_VERSION}/${post.blogSlug}`}
              className=" w-full h-full block relative"
            >
              <Image
                src={post.blogThumbnail}
                alt={post.blogTitle}
                className="rounded w-auto object-cover "
                sizes="(max-width: 1200px) 100vw, (max-width: 800px) calc(80vw + 40px)"
                fill
              />
            </Link>
          </div>
          <div>
            <h1 className="mx-4 my-2 text-xl">
              <Link
                href={`/${SITE_VERSION}/${post.blogSlug}`}
                className="text-foreground"
              >
                {post.blogTitle}
              </Link>
            </h1>
            <span className="text-sm  mx-4 mb-4 text-green-600">
              Published : {moment(post.createdAt).format("MMMM Do, YYYY")}
            </span>
            <div className="w-full mx-4 line-clamp-4 select-none">
              <BlogDescription
                blogDescription={post.blogOverView}
                blogSlug={post.blogSlug}
              />
            </div>
            <Link
              href={`/${SITE_VERSION}/${post.blogSlug}`}
              className="my-2 mx-4 after:bg-blue-400 text-sm hover:underline"
            >
              Read More...
            </Link>
          </div>
        </div>
        <Separator />
      </section>
    </>
  );
}

export default BlogDataOptimizer;
