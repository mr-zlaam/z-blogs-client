"use client";
import { API as axios } from "@/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMessage } from "@/hooks/useMessage";
import { useSlugGenerator as UseSlugGenerator } from "@/hooks/useSlugGenerator";

import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { useValidateImageUrl as UseValidateImageUrl } from "@/hooks/useValidateUrl";
import { cn } from "@/lib/utils";
import Froalaeditor from "froala-editor";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/save.min.js";
import parser from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { AlloweTags } from "../helper/toolbar";
import moment from "moment";
function CreatePosts({ token }: { token: string }) {
  const [desc, setDesc] = useState(() => {
    return localStorage.getItem("savedHtml") || "";
  });
  const [showPreview, setShowPreview] = useState(false);
  const { errorMessage, successMessage } = useMessage();
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [blogImage, setBlogImage] = useState();
  const [data, setData] = useState({
    blogAuthor: "",
    blogImageAuthor: "",
  });
  const router = useRouter();
  const handleOnchange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    console.log(data);
  };
  const handleChangeTitleAndSlug = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(UseSlugGenerator(newTitle));
  };
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !title ||
      !slug ||
      !desc ||
      !data.blogAuthor ||
      !data.blogImageAuthor ||
      !blogImage
    ) {
      return errorMessage("Please Provide all fields");
    }
    try {
      const response = await axios.post(
        "/blogs/createBlog",
        {
          blogTitle: title,
          blogSlug: `${slug}`,
          blogDescription: desc,
          blogThumbnail: blogImage,
          blogThumbnailAuthor: data.blogImageAuthor,
          blogAuthor: data.blogAuthor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        localStorage.removeItem("savedHtml");
        successMessage("Blog submitted to the admin for review successfully");
        return router.push("/home");
      }
    } catch (error: any) {
      console.log(error);
      return errorMessage(error.response.data.message || error.message);
    }
  };
  const imageUrlRef = useRef<any>(null);
  const setUrlToImageBlog = (e: FormEvent) => {
    e.preventDefault();
    const url = imageUrlRef.current.value;
    if (UseValidateImageUrl(url)) {
      setBlogImage(imageUrlRef.current.value);
    } else {
      return errorMessage("Please provide a valid image url");
    }
  };
  const today = new Date();
  const monthName = today.toLocaleString("en-US", { month: "short" });
  const date = new Date().getDate();
  const month = monthName;
  const year = new Date().getFullYear();
  const fullDate = `${date}- ${month}- ${year}`;
  return (
    <>
      <Button
        className="fixed top-0 right-2 m-4 z-[101]"
        onClick={() => {
          setShowPreview((prev) => !prev);
        }}
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <section className="px-5 py-2">
        <div className="w-full">
          <div className="my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
              placeholder="Enter Title Here."
            />
          </div>
          <div className="my-2">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              name="slug"
              value={slug}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleChangeTitleAndSlug}
              readOnly
              placeholder="Slug will be written automaticaly You don't have to write it."
            />
          </div>
          <div className="my-2 relative">
            <label htmlFor="blogImage">BlogImage</label>
            <input
              id="blogImage"
              type="url"
              name="blogImage"
              ref={imageUrlRef}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              placeholder="Image::https://live.staticflickr.com/65535/53281434521_eeef635514_z.jpg"
            />
            <Button
              variant={"link"}
              className="absolute top-3 right-3"
              onClick={setUrlToImageBlog}
            >
              SetUrl
            </Button>
          </div>
          <div className="my-2">
            <label htmlFor="BlogImageAuthor">BlogImageAuthor</label>
            <input
              id="BlogImageAuthor"
              type="text"
              name="blogImageAuthor"
              value={data.blogImageAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
              placeholder="Enter Blog's Image Author Name Here."
            />
          </div>
          <div className="my-2">
            <label htmlFor="BlogAuthorName">BlogAuthorName</label>
            <input
              id="BlogAuthorName"
              type="text"
              name="blogAuthor"
              value={data.blogAuthor}
              className="border border-t-0 border-l-0 border-r-0 outline-none w-full py-2 px-4 border-b-2 border-foreground bg-transparent"
              onChange={handleOnchange}
              placeholder="Write name of owner here."
            />
          </div>

          <div />
          {`<pre style="display: block;border: 2px solid #fff;color: #ffffff;background:#000000;padding: 20px 15px;border-radius: 10px;overflow-x: auto;height: fit-content;" id="code" class="code"></pre>
      `}
          <label htmlFor="">
            <br />
            Blog Description
          </label>
          <div className="relative h-fit overflow-hidden my-4">
            <FroalaEditor
              model={desc}
              onModelChange={(e: string) => setDesc(e)}
              config={{
                toolbarSticky: true,
                placeholderText: "Start writing from here...",
                saveInterval: 2000,
                charCounterCount: true,
                enter: Froalaeditor.ENTER_BR,
                htmlAllowedTags: AlloweTags,
                htmlUntouched: true,
                height: 450,
                width: "100%",
                events: {
                  "save.before": function (html: string) {
                    localStorage.setItem("savedHtml", html);
                  },
                },
              }}
            />
            <div className=" bg-white absolute bottom-2 left-1 h-[23px] w-full max-w-4xl" />
          </div>
          <Dialog>
            <div className=" w-full flex justify-end px-5 py-3">
              <DialogTrigger asChild className="">
                <Button className="">Upload Blog</Button>
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  You can&apos;t edit this blog once you&apos;ve uploaded!
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-around flex items-center w-full relative flex-col md:flex-row ">
                <DialogClose asChild className="mx-4 my-3">
                  <Button type="button">Close</Button>
                </DialogClose>
                <DialogClose asChild onClick={handleCreateBlog}>
                  <Button type="button">Yes, I am sure</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {showPreview && (
        <div
          className={cn(
            "py-5 p-4  fixed overflow-auto bg-background z-[100] w-full top-0 left-0 h-screen"
          )}
        >
          <PageWrapper className="md:max-w-[920px]">
            <h1 className="text-center font-bold text-2xl md:text-4xl my-4 text-balance">
              {title}
            </h1>
            <div className="flex  items-center my-4  px-4">
              <Image
                src={"/logo/Zlaam.jpg"}
                alt="Zlaam"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex flex-col justify-start px-4">
                <h1 className="text-lg font-semibold ">{data.blogAuthor}</h1>
                <p className="text-sm text-left">
                  published on: {moment(fullDate).format("MMMM Do, YYYY")}
                </p>
              </div>
            </div>
            <div className="w-fit mx-auto my-4">
              {blogImage && (
                <Image
                  src={blogImage}
                  alt={data.blogImageAuthor}
                  width={920}
                  height={920}
                  className="rounded-md shadow-lg"
                />
              )}
            </div>

            <div className="text-left w-full text-lg">{parser(desc)}</div>
          </PageWrapper>
        </div>
      )}
    </>
  );
}

export default CreatePosts;
