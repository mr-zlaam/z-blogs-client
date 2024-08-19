"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useCustomStorage from "@/hooks/useCustomStorageNext";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import highlightSyntax from "./editor/highlightSyntax";
import { Input } from "@/components/ui/input";
const Editor = dynamic(() => import("../comp/editor/Editor"), {
  ssr: false,
});

function CreatePost({ token, uid }: { token: string; uid: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [value, setValue] = useCustomStorage("editorContent", "");

  console.log(uid);
  // applying higlighter
  const renderedHtml = useMemo(() => {
    const rawHtml = DOMPurify.sanitize(marked(value) as string);
    const highlightedHtml = highlightSyntax(rawHtml, "js");

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
  }, [value]);
  return (
    <>
      {isPreviewOpen && (
        <div className="h-screen fixed top-0 left-0 w-full bg-background text-foreground z-[99]">
          <PageWrapper>
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html:
                  renderedHtml.length === 0
                    ? "Write something...."
                    : renderedHtml,
              }}
            ></div>
          </PageWrapper>
        </div>
      )}
      <Button
        className="fixed right-4 top-10 z-[100]"
        onClick={() => {
          setIsPreviewOpen((prev) => !prev);
        }}
      >
        {isPreviewOpen ? "Hide Preview" : "ShowPreview"}
      </Button>
      <Link
        varient="expand-from-left"
        href={"/home"}
        className="text-blue-500 after:bg-blue-500 block w-fit mx-auto p-2"
      >
        Go Back
      </Link>
      <PageWrapper className="max-w-[1200px]">
        <input
          className="outline-none m-3 w-full text-4xl bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3"
          placeholder=" Write Title here..."
        />
        <div className="relative">
          <input
            className="outline-none m-3 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3 font-bold pr-20"
            placeholder="Thumbnail Url..."
          />
          <Button
            variant={"link"}
            className="bg-transparent absolute top-4 right-2"
          >
            set url
          </Button>
        </div>
        <input
          className="outline-none m-3 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3 font-bold pr-20"
          placeholder="Thumbnail owner's name.."
        />
        <input
          className="outline-none m-2 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-2 font-bold pr-20"
          placeholder="Blog Write's  name.."
        />
      </PageWrapper>
      <PageWrapper className="max-w-[1200px]">
        <Editor setValue={setValue} value={value} />
      </PageWrapper>
    </>
  );
}

export default CreatePost;
