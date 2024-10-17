"use client";
declare global {
  interface Window {
    copyToClipboard: (id: string) => void;
  }
}
import highlightSyntax from "@/helper/higlightSyntax/HiglightSyntax";
import { AuthorType } from "@/types";
import moment from "moment";
import Image from "next/image";
import { Fragment, useEffect, useMemo } from "react";
import parser from "html-react-parser";
import { useMessage } from "@/hooks/useMessage";
import BackToPreviousRoute from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";
import ScrollToTop from "@/_subComponents/scrollToTop/ScrollToTop";
import { RandomAvatar } from "react-random-avatars";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SinglePostProps {
  article: string;
  author: AuthorType;
  coverImage: string;
  coverImageOwner: string;
  createdAt: Date;
  blogTitle: string;
}
function SinglePost({
  article,
  author,
  blogTitle,
  createdAt,
  coverImage,
  coverImageOwner,
}: SinglePostProps) {
  const { successMessage } = useMessage();
  const renderedHtml = useMemo(() => {
    const highlightedHtml = highlightSyntax(article, "js");

    // Add copy buttons to each <pre> block
    const copyButtonHtml = (id: string) => `
    <div class="relative ">
    <button class="absolute right-5 top-4 px-3 py-1  bg-black  rounded-md  cursor-pointer  duration-200 transition-all " onclick="copyToClipboard('${id}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="White" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
    </button>
    </div>
    `;
    const withCopyButtons = highlightedHtml.replace(
      /(<pre[^>]*>)(.*?)(<\/pre>)/gs,
      (_, openingTag, codeContent, closingTag) => {
        const uniqueId = `codeBlock-${Math.random().toString(36).substr(2, 9)}`;
        return `<div class="code-container">${
          copyButtonHtml(
            uniqueId,
          )
        }${openingTag}<code id="${uniqueId}">${codeContent}</code>${closingTag}</div>`;
      },
    );
    return withCopyButtons;
  }, [article]);
  useEffect(() => {
    // * This function will copy the code snippet
    window.copyToClipboard = (id: string) => {
      const codeElement = document.getElementById(id);
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText).then(() => {
          successMessage("copied successfully", "top-center", 1000);
        });
      }
    };
  }, [successMessage]);
  return (
    <Fragment>
      <ScrollToTop />
      <article className=" overflow-y-auto relative">
        <BackToPreviousRoute />
        <h1 className="text-center font-bold text-2xl md:text-3xl my-4 text-balance">
          {blogTitle}
        </h1>
        <div className="flex  items-center my-4  px-4">
          <div className="mt-3 rounded-full overflow-hidden cursor-pointer  border-none flex items-center justify-center bg-foreground/50">
            <RandomAvatar
              size={35}
              mode="random"
              name={author.username || "hero"}
              square
            />
          </div>
          <div className="flex flex-col justify-start px-4 mt-5">
            <h1 className="text-lg font-semibold ">
              {author.fullName}
              <span className="text-xs font-[300]">
                {author.role === "ADMIN"
                  ? " (admin)"
                  : author.role === "MODERATOR"
                  ? " (moderator)"
                  : ""}
              </span>
            </h1>
            <p className="text-sm text-left  font-normal ">
              Published: {moment(createdAt).format("MMMM Do, YYYY")}
            </p>
          </div>
        </div>
        <div className="image  flex-[1] md:flex-[0.5]  w-full my-4 md:my-0 overflow-hidden rounded-md">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted overflow-hidden rounded-md relative"
          >
            <Image
              src={coverImage}
              alt={blogTitle}
              fill
              className="h-full w-full rounded object-cover"
              quality={100}
              sizes="(max-width: 1200px) 100vw, (max-width: 800px) calc(80vw + 40px)"
            />
          </AspectRatio>
        </div>
        <p className="text-sm  text-center">
          Image by : {parser(coverImageOwner)}
        </p>
        <div
          className="font-normal mx-2  my-5 leading-[2]"
          dangerouslySetInnerHTML={{
            __html: renderedHtml.length === 0
              ? "Write something...."
              : renderedHtml,
          }}
        >
        </div>
      </article>
    </Fragment>
  );
}

export default SinglePost;
