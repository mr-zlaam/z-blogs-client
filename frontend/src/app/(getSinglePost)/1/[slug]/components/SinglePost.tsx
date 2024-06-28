"use client";
import { BlogDataTypes } from "@/types";
import parser from "html-react-parser";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {} from "react";
import ScrollToTop from "./ScrollToTop";
function SinglePost({ SinglePostData }: { SinglePostData: BlogDataTypes }) {
  const router = useRouter();

  return (
    <>
      <ScrollToTop />
      <article className="">
        <div
          className=" my-10 bg-transparent text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background "
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeft />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center">
            {SinglePostData?.blogTitle || "No title for this Post"}
          </h1>
          <div className="flex  items-center my-4 gap-3 px-4">
            <Image
              src={"/logo/Zlaam.jpg"}
              alt="Zlaam"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col justify-start">
              <h1 className="text-lg font-semibold ">
                {SinglePostData?.blogAuthor || "Zlaam"}
              </h1>
              <p className="text-sm text-left">
                published on:{" "}
                {moment(SinglePostData?.createdAt).format("MMMM Do, YYYY")}
              </p>
            </div>
          </div>
          <aside>
            <Image
              src={SinglePostData.blogThumbnail || "/logo/Zlaam.jpg"}
              alt={SinglePostData?.blogThumbnailAuthor || "Zlaam"}
              width={820}
              height={820}
              className="rounded-md "
            />
            <p className="text-center my-2">
              Photo By &nbsp;&nbsp;
              <span className="text-blue-500 underline cursor-pointer">
                {parser(SinglePostData?.blogThumbnailAuthor || "")}
              </span>
            </p>
            <article className=" text-[18px] leading-[2] overflow-x-hidden">
              {parser(
                SinglePostData?.blogDescription || "<h1>Hello World Error</h1>"
              )}
            </article>
          </aside>
        </div>
      </article>
    </>
  );
}

export default SinglePost;
