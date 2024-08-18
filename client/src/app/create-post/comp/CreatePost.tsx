"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import useCustomStorage from "@/hooks/useCustomStorageNext";
import DOMPurify from "dompurify";
import { marked } from "marked";
import highlightSyntax from "./editor/highlightSyntax";
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
    const highlightedHtml = highlightSyntax(rawHtml, "js"); // Replace 'js' with the appropriate language

    // Add copy buttons to each <pre> block
    const copyButtonHtml = (id: string) =>
      `
    <div class="relative ">
    <button class="absolute right-5 top-4 px-3 py-1 rounded-md bg-white cursor-pointer hover:bg-gray-500 hover:text-white duration-200 transition-all " onclick="copyToClipboard('${id}')">
    copy
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
              className="mx-10"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            ></div>
          </PageWrapper>
        </div>
      )}
      <Button
        className="fixed right-4 top-5 z-[100]"
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
      <PageWrapper className="border border-solid border-foreground">
        <Editor setValue={setValue} value={value} />
      </PageWrapper>
    </>
  );
}

export default CreatePost;
