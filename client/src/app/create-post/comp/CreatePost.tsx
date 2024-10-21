"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { axios } from "@/axios";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@/components/ui/link";
import highlightSyntax from "@/helper/higlightSyntax/HiglightSyntax";
import useCustomStorage from "@/hooks/useCustomStorageNext";
import { useMessage } from "@/hooks/useMessage";
import { useValidateImageUrl as UseValidateImageUrl } from "@/hooks/useValidateUrl";
import parser from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logoImage from "../../../../public/logo/Zlaam.jpg";
import { ThemeToggler } from "@/theme/ThemeToggler";
import ButtonLoader from "@/_subComponents/buttonLoader/buttonLoader";
import { useLoading } from "@/hooks/useLoading";
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
    "",
  );
  const [isSessionExpiredError, setIsSessionExpiredError] = useState(false);
  const [isBlogReadyForUpload, setIsBlogReadyForUpload] = useState(false);
  const router = useRouter();
  const [blogWriterName, setBlogWriterName] = useCustomStorage(
    "blogWriterName",
    "",
  );
  const [blogOverView, setBlogOverView] = useCustomStorage("blogOverView", "");
  const { isLoading, stopLoading, startLoading } = useLoading();

  // applying higlighter
  const renderedHtml = useMemo(() => {
    const rawHtml = DOMPurify.sanitize(marked(value) as string);
    const highlightedHtml = highlightSyntax(rawHtml, "js");

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
        return `<div class="code-container">${copyButtonHtml(
          uniqueId,
        )
          }${openingTag}<code id="${uniqueId}">${codeContent}</code>${closingTag}</div>`;
      },
    );

    return withCopyButtons;
  }, [value]);
  const imageUrlRef = useRef<any>(null);
  const setUrlToImageBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const url = imageUrlRef.current.value;
    if (UseValidateImageUrl(url)) {
      setCoverImageUrl(imageUrlRef.current.value);
      setIsPreviewOpen((prev) => !prev);
    } else {
      return errorMessage("Please provide a valid image url");
    }
  };
  // Date
  const date = new Date();
  const today = date.toLocaleDateString();
  // upload article to database
  const handleCreateBlogs = async () => {
    if (!title) return errorMessage("Write the title of the blog ");
    if (!coverImageOwnerName) {
      return errorMessage("Write the name of the owner of the cover image");
    }
    if (!coverImageUrl) return errorMessage("Write cover image url");
    if (!blogWriterName) {
      return errorMessage("Write the name of author who write blog");
    }
    if (!value) return errorMessage("Write atleast some of it");
    if (!blogOverView) return errorMessage("Write atleast some of it");
    if (!UseValidateImageUrl(coverImageUrl)) return errorMessage("Please provide a valid image url");
    try {
      startLoading();
      const response = await axios.post(
        "/blog/createBlog",
        {
          authorId: uid,
          blogTitle: title,
          blogDescription: value,
          blogThumbnail: coverImageUrl,
          blogThumbnailAuthor: coverImageOwnerName
            ? coverImageOwnerName
            : "Zlaam",
          blogOverView,
          blogAuthor: blogWriterName ? blogWriterName : "zlaam",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        setValue("");
        setTitle("");
        setCoverImageUrl("");
        setCoverImageOwnerName("");
        setBlogWriterName("");
        setBlogOverView("");
        successMessage(
          "Blog submitted to the admin for review successfully",
          "bottom-right",
          6000,
        );
        return router.push("/home");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 400) {
        return setIsSessionExpiredError(true);
      }
    } finally {
      stopLoading();
    }
  };
  const handeTogglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };
  const logoutTheUser = useCallback(async () => {
    try {
      startLoading();
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res?.status === 200) {
        successMessage("User logout successfully");
        if (typeof window !== "undefined") return location.reload();
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      stopLoading();
    }
  }, [successMessage, startLoading, stopLoading]);
  useEffect(() => {
    if (isSessionExpiredError) {
      setTimeout(() => {
        logoutTheUser();
      }, 1500);
    }
  }, [isSessionExpiredError, startLoading, stopLoading, logoutTheUser]);
  const checkIfBlogIsReady = useCallback(() => {
    if (
      title &&
      coverImageUrl &&
      coverImageOwnerName &&
      blogWriterName &&
      value &&
      blogOverView
    ) {
      setIsBlogReadyForUpload(true);
    } else {
      setIsBlogReadyForUpload(false);
    }
  }, [
    blogOverView,
    blogWriterName,
    title,
    coverImageOwnerName,
    coverImageUrl,
    value,
  ]);

  useEffect(() => {
    checkIfBlogIsReady();
  }, [
    title,
    coverImageUrl,
    coverImageOwnerName,
    blogWriterName,
    value,
    blogOverView,
    checkIfBlogIsReady,
  ]);
  return (
    <>
      {isLoading && (
        <div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-[100]">
            <ButtonLoader />
          </div>
          <div className="fixed top-0 left-0 w-full h-screen  z-[99] backdrop-blur-sm bg-background/20" />
        </div>
      )}
      {isSessionExpiredError && (
        <div className="bg-background/80 backdrop-blur-md fixed top-0 left-0 h-screen z-[200] w-full flex justify-center items-center px-3">
          <div className="  p-5 rounded break-words border-spacing-3 border-solid border-foreground/40 m">
            <h1>Your Session is Expired Please sign in again</h1>
            <Button
              onClick={logoutTheUser}
              variant={"destructive"}
              className="block mx-auto w-fit my-5"
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
      {isPreviewOpen && (
        <div className="h-screen fixed top-0 left-0 w-full bg-background text-foreground z-[99] overflow-y-auto">
          <div className="fixed top-10 left-10"></div>
          <PageWrapper className="relative">
            <h1 className="text-sm font-bold my-5 text-center">Preview Mode</h1>
            <h1 className="text-center font-bold text-2xl md:text-3xl my-4 text-balance">
              {title}
            </h1>
            <div className="flex  items-center my-4  px-4 ">
              <Image
                src={logoImage}
                alt="Zlaam"
                className="rounded-full w-[50px] h-[50px]"
              />
              <div className="flex flex-col justify-start px-4 mt-5">
                <h1 className="text-lg font-semibold ">{blogWriterName}</h1>
                <p className="text-sm text-left">published on: {today}</p>
              </div>
            </div>
            <div className="image flex-[1] md:flex-[0.5]  w-full my-4 md:my-0 overflow-hidden rounded-md">
              <AspectRatio
                ratio={16 / 9}
                className="bg-muted overflow-hidden rounded-md relative"
              >
                <Image
                  decoding="async"
                  src={!coverImageUrl
                    ? "https://live.staticflickr.com/65535/53281434521_eeef635514_z.jpg"
                    : coverImageUrl}
                  alt={title ?? "zlaam"}
                  fill
                  className="h-full w-full rounded object-cover"
                  quality={100}
                  sizes="(max-width: 1200px) 100vw, (max-width: 800px) calc(80vw + 40px)"
                />
              </AspectRatio>
            </div>
            <p className="text-sm  text-center">
              Image by : {parser(coverImageOwnerName)}
            </p>
            <div
              className="font-normal text-lg my-5 leading-[2]"
              dangerouslySetInnerHTML={{
                __html: renderedHtml.length === 0
                  ? "Write something...."
                  : renderedHtml,
              }}
            >
            </div>
          </PageWrapper>
        </div>
      )}
      <Button
        title="Press(ctrl+shift+l)"
        className="fixed right-4 top-3 z-[100]"
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === "L" && e.ctrlKey && e.shiftKey) {
            handeTogglePreview();
          }
        }}
        autoFocus
        onClick={() => {
          setIsPreviewOpen((prev) => !prev);
        }}
      >
        {isPreviewOpen ? "Hide Preview" : "ShowPreview"}
      </Button>
      <div className="flex justify-center items-center">
        <Link
          varient="expand-from-left"
          href={"/home"}
          className="text-blue-500 after:bg-blue-500  mx-4"
        >
          Go Back
        </Link>
        <p className="text-center font-bold text-lg mx-4">
          Preview(ctrl+shift+l)
        </p>
        <ThemeToggler />
      </div>

      <div className="max-w-[1450px] mx-auto">
        <input
          className="outline-none  w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-2 font-bold"
          placeholder=" Write Title here..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "L" && e.ctrlKey && e.shiftKey) {
              setIsPreviewOpen((prev) => !prev);
            }
          }}
        />
        <textarea
          className="outline-none p w-full  bg-transparent resize-none border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3"
          placeholder=" Write some information about your blog..."
          value={blogOverView}
          onChange={(e) => {
            setBlogOverView(e.target.value);
          }}
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "L" && e.ctrlKey && e.shiftKey) {
              setIsPreviewOpen((prev) => !prev);
            }
          }}
        />
        <div className="relative">
          <input
            className="outline-none m-3 w-full text-lg bg-transparent border-solid border-b-foreground border-t-0 border-r-0 border-l-0 p-3 font-bold pr-20 text-thin text-[12px] font-mono "
            placeholder="Cover Image  Url..."
            ref={imageUrlRef ?? ""}
            type="url"
            onChange={(e) => {
              setCoverImageUrl(e.target.value);
            }}
            value={coverImageUrl}
            onKeyDown={(e) => {
              if (e.key === "L" && e.ctrlKey && e.shiftKey) {
                setIsPreviewOpen((prev) => !prev);
              }
            }}
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
          onKeyDown={(e) => {
            if (e.key === "L" && e.ctrlKey && e.shiftKey) {
              setIsPreviewOpen((prev) => !prev);
            }
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
          onKeyDown={(e) => {
            if (e.key === "L" && e.ctrlKey && e.shiftKey) {
              setIsPreviewOpen((prev) => !prev);
            }
          }}
        />
      </div>
      <div className="max-w-[1450px] mx-auto">
        <div className="my-2 flex justify-end px-5 select-none">
          <Dialog>
            <div className=" w-full flex justify-end px-5 ">
              <DialogTrigger asChild className="">
                <Button className="" disabled={!isBlogReadyForUpload}>
                  Upload Blog
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  You can&apos;t edit this blog once you&apos;ve uploaded!
                </DialogDescription>
              </DialogHeader>

              <AlertDialogFooter className="justify-around flex items-center w-full relative flex-col md:flex-row">
                <DialogClose asChild className="mx-4 my-3">
                  <Button type="button">Close</Button>
                </DialogClose>
                <DialogClose asChild onClick={handleCreateBlogs}>
                  <Button type="button">Yes, I am sure</Button>
                </DialogClose>
              </AlertDialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Editor
          setValue={setValue}
          value={value}
          className=""
          setIsPreviewOpen={setIsPreviewOpen}
        />
      </div>
    </>
  );
}

export default CreatePost;
