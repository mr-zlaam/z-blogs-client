"use client";
import ImgLoader from "@/_subComponents/imgLoader";
import { Card } from "@/components/ui/card";
import { VERSION } from "@/constants";
import { BlogDataTypes } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function BlogRenderer({ posts }: { posts: BlogDataTypes[] }) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <Fragment>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center px-3">
        {posts.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="md:min-h-[420px] shadow-lg sm:min-h-[600px] mdx:min-h-[520px] smx:min-h-[400px] min-h-[300px] ronuded overflow-hidden relative my-2 ">
                <div className="  overflow-hidden  ">
                  {isImageLoaded ? (
                    <Link href={`/${VERSION}/${post.blogSlug || "/home"}`}>
                      <Image
                        src={post.blogThumbnail || "/logo/logo.jpeg"}
                        alt={post.blogThumbnailAuthor || "zlaam"}
                        className="rounded object-cover"
                        width={1000}
                        height={1000}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  ) : (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-[40%] left-[50%]">
                      <ImgLoader />
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-bold text-balance px-4  text-clip line-clamp-2 my-3 absolute w-full bottom-20">
                  <Link href={`/${VERSION}/${post.blogSlug || "/home"}`}>
                    {post.blogTitle}
                  </Link>
                </h1>
                <div className="my-2 flex gap-3 items-center px-3 absolute bottom-2 w-full">
                  <Image
                    src={"/logo/Zlaam.jpg"}
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt="zlaam"
                    onLoad={handleImageLoad}
                  />
                  <div>
                    {post.blogAuthor} &nbsp;&nbsp;- &nbsp;&nbsp;
                    {moment(post.createdAt).format("MMMM Do, YYYY")}
                  </div>
                </div>
              </Card>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
