/* <div
          dangerouslySetInnerHTML={{
            __html: article.length === 0 ? "Write something...." : article,
          }}
        ></div> */

import highlightSyntax from "@/app/create-post/comp/editor/highlightSyntax";
import { AuthorType } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useMemo } from "react";
import logoImage from "../../../../../../public/logo/Zlaam.jpg";
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
  const renderedHtml = useMemo(() => {
    const highlightedHtml = highlightSyntax(article, "js");

    // Add copy buttons to each <pre> block
    const copyButtonHtml = (id: string) =>
      `
    <div class="relative ">
    <button class="absolute right-5 top-4 px-3 py-1  rounded-md bg-transparent cursor-pointer  duration-200 transition-all " onclick="copyToClipboard('${id}')">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="White" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
    </button>
    </div>
    `;

    const withCopyButtons = highlightedHtml.replace(
      /(<pre[^>]*>)(.*?)(<\/pre>)/gs,
      (_, openingTag, codeContent, closingTag) => {
        const uniqueId = `codeBlock-${Math.random().toString(36).substr(2, 9)}`;
        return `<div class="code-container">${copyButtonHtml(
          uniqueId
        )}${openingTag}<code id="${uniqueId}">${codeContent}</code>${closingTag}</div>`;
      }
    );

    return withCopyButtons;
  }, [article]);
  return (
    <>
      <article className="my-5 overflow-y-auto">
        <h1 className="text-center font-bold text-2xl md:text-3xl my-4 text-balance">
          {blogTitle}
        </h1>
        <div className="flex  items-center my-4  px-4 ">
          <Image
            src={logoImage}
            alt="Zlaam"
            placeholder="blur"
            className="rounded-full w-[50px] h-[50px]"
          />
          <div className="flex flex-col justify-start px-4 mt-5">
            <h1 className="text-lg font-semibold ">{author.fullName}</h1>
            <p className="text-sm text-left">
              Published: {moment(createdAt).format("MMMM Do, YYYY")}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

export default SinglePost;
