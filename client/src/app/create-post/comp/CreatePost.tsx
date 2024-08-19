"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import useCustomStorage from "@/hooks/useCustomStorageNext";
import { useMessage } from "@/hooks/useMessage";
import { useValidateImageUrl } from "@/hooks/useValidateUrl";
import DOMPurify from "isomorphic-dompurify";
import parser from "html-react-parser";
import { marked } from "marked";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import highlightSyntax from "./editor/highlightSyntax";
const Editor = dynamic(() => import("../comp/editor/Editor"), {
  ssr: false,
});

function CreatePost({ token, uid }: { token: string; uid: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { errorMessage, successMessage } = useMessage();
  const [value, setValue] = useCustomStorage("editorContent", "");
  const [title, setTitle] = useCustomStorage("title", "");
  const [coverImageUrl, setCoverImageUrl] = useCustomStorage("coverImage", "");
  const [coverImageOwnerName, setCoverImageOwnerName] = useCustomStorage(
    "coverImageOwner",
    ""
  );
  const [blogWriterName, setBlogWriterName] = useCustomStorage(
    "blogWriterName",
    ""
  );

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
  const imageUrlRef = useRef<any>(null);
  const setUrlToImageBlog = (e: React.FormEvent) => {
    const url = imageUrlRef.current.value;
    if (useValidateImageUrl(url)) {
      setCoverImageUrl(imageUrlRef.current.value);
    } else {
      return errorMessage("Please provide a valid image url");
    }
  };
  // Date
  const date = new Date();
  const today = date.toLocaleDateString();
  return (
    <>
      {isPreviewOpen && (
        <div className="h-screen fixed top-0 left-0 w-full bg-background text-foreground z-[99] overflow-y-auto">
          <PageWrapper>
            <h1 className="text-sm font-bold my-5 text-center">Preview Mode</h1>
            <h1 className="text-center font-bold text-2xl md:text-3xl my-4 text-balance">
              {title}
            </h1>
            <div className="flex  items-center my-4  px-4 ">
              <Image
                src={"/logo/Zlaam.jpg"}
                alt="Zlaam"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px]"
              />
              <div className="flex flex-col justify-start px-4 mt-5">
                <h1 className="text-lg font-semibold ">{blogWriterName}</h1>
                <p className="text-sm text-left">published on: {today}</p>
              </div>
            </div>
            <div>
              <Image
                src={coverImageUrl ?? ""}
                height={400}
                width={800}
                className="rounded-md shadow-md shadow-foreground/50"
                alt={blogWriterName}
              />
            </div>
            <p className="text-sm  text-center">
              Image by : {parser(coverImageOwnerName)}
            </p>
            <div
              className="font-normal text-lg my-5 leading-[2]"
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
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="relative">
          <input
            className="outline-none m-3 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3 font-bold pr-20"
            placeholder="Cover Image  Url..."
            ref={imageUrlRef}
            type="url"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
          />
          <Button
            variant={"link"}
            onClick={setUrlToImageBlog}
            className="bg-transparent absolute top-4 right-2"
          >
            set url
          </Button>
        </div>
        <input
          className="outline-none m-3 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3 font-bold pr-20"
          placeholder="Cover Image's owners name.."
          type="text"
          value={coverImageOwnerName}
          onChange={(e) => {
            setCoverImageOwnerName(e.target.value);
          }}
        />
        <input
          className="outline-none m-2 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-2 font-bold pr-20"
          placeholder="Blog Writer's  name.."
          type="text"
          value={blogWriterName}
          onChange={(e) => {
            setBlogWriterName(e.target.value);
          }}
        />
      </PageWrapper>
      <PageWrapper className="max-w-[1200px]">
        <Editor setValue={setValue} value={value} />
        <div className="my-2 flex justify-end px-5 select-none">
          <Button className="">Upload Article</Button>
        </div>
      </PageWrapper>
    </>
  );
}

export default CreatePost;
