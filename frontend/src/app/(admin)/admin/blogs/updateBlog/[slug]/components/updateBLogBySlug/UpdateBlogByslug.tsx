"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { AlloweTags } from "@/app/createBlog/helper/toolbar";
import { API as axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessage } from "@/hooks/useMessage";
import { useValidateImageUrl as UseValidateImageUrl } from "@/hooks/useValidateUrl";
import { cn } from "@/lib/utils";
import { BlogDataTypes } from "@/types";
import { AxiosError } from "axios";
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
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

function UpdateBlogBySlug({
  slugForUpdate,
  previousData,
  token,
}: {
  slugForUpdate: string;
  previousData: any;
  token: string;
}) {
  const getObjectOfFetchedData: BlogDataTypes = previousData.data;

  const oldData = getObjectOfFetchedData;
  const { errorMessage, successMessage } = useMessage();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const router = useRouter();
  //states
  const [updateTitle, setupdateTitle] = useState(oldData?.blogTitle || "");
  const [isPublic, setIsPublic] = useState(oldData?.isPublic || false);
  const [updateBlogAuthor, setupdateBlogAuthor] = useState(
    oldData?.author?.fullName || ""
  );
  const [updateBlogThumbnail, setUpdateBlogThumbnail] = useState(
    oldData?.blogThumbnail ||
      "https://code.visualstudio.com/assets/docs/languages/javascript/jsx.png"
  );
  const [updateBlogThumbnailAuthor, setUpdateBlogThumbnailAuthor] = useState(
    oldData?.blogThumbnailAuthor
  );
  const [updateBlogDesc, setUpdateBlogDesc] = useState(() => {
    return oldData?.blogDescription || localStorage.getItem("savedHtml") || "";
  });
  //handleOnchageFunction

  const handleUpdateBlog = async (e: React.FormEvent) => {
    if (
      !updateBlogAuthor ||
      !updateTitle ||
      !updateBlogDesc ||
      !updateBlogThumbnail ||
      !updateBlogThumbnailAuthor
    ) {
      return errorMessage("Please Provide all fields");
    }
    e.preventDefault();
    try {
      const responseFromUpdateBlog = await axios.put(
        `/blog/updateBlog/${slugForUpdate}`,
        {
          author: updateBlogAuthor,
          blogTitle: updateTitle,
          blogDescription: updateBlogDesc,
          blogThumbnail: updateBlogThumbnail,
          blogThumbnailAuthor: updateBlogThumbnailAuthor,
          isPublic: isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responseFromUpdateBlog.status === 200) {
        successMessage("Blog Updated Successfully");
        return router.push("/admin/blogs/privateBlogs");
      }
      return;
    } catch (error: any) {
      const err = error as AxiosError;
      console.log(err.status, err.message);
      errorMessage(error.response.data.message || error.message);
      setTimeout(() => {
        return router.push("/home");
      }, 3000);
    }
  };

  //Handle show preview
  const handleShowPreview = () => {
    setShowPreview((prev) => !prev);
  };

  const imageUrlRef = useRef<any>(oldData?.blogThumbnail || null);
  const setUrlToImageBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const url: string = imageUrlRef.current.value;
    if (UseValidateImageUrl(url)) {
      if (url.includes("_next/image"))
        return errorMessage("This url can't be set!");
      setUpdateBlogThumbnail(imageUrlRef.current.value);
    } else {
      return errorMessage("Please provide a valid image url");
    }
  };
  const today = new Date();
  const monthName = today.toLocaleString("en-US", { month: "short" });
  const date = new Date().getDate();
  const month = monthName;
  const year = new Date().getFullYear();
  const full_date = `${date}- ${month}- ${year}`;
  return (
    <>
      <Button
        onClick={handleShowPreview}
        className="fixed right-2 z-[101] top-14 border border-foreground shadow-md shadow-black"
        size="default"
      >
        {showPreview ? "Hide Preview" : "Show Preview"}
      </Button>
      <section className="px-5 py-2">
        <form onSubmit={handleUpdateBlog} className="w-full">
          <div className="my-2">
            <label htmlFor="updateTitle">UpdateTilte</label>
            <Input
              type="text"
              id="updateTitle"
              value={updateTitle}
              onChange={(e) => setupdateTitle(e.target.value)}
              placeholder="Update Title of this Blog..."
            />
          </div>
          <div className="my-2">
            <label htmlFor="updateBlogAuthor">UpdateBlogAuthor</label>
            <Input
              type="text"
              id="updateBlogAuthor"
              value={updateBlogAuthor}
              onChange={(e) => setupdateBlogAuthor(e.target.value)}
              placeholder="Update Title of this Blog..."
            />
          </div>
          <div className="my-2">
            <label htmlFor="updateBlogAuthor">UpdateBlogThumbnail</label>
            <div className="relative">
              <Input
                type="url"
                id="UpdateBlogThumbnail"
                ref={imageUrlRef}
                placeholder="Update Title of this Blog..."
                defaultValue={updateBlogThumbnail}
              />
              <Button
                variant={"link"}
                onClick={setUrlToImageBlog}
                className="absolute top-[2px] right-3 text-xs"
              >
                Set Url
              </Button>
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="UpdateBlogThumbnailAuthor">
              UpdateBlogThumbnailAuthor
            </label>
            <Input
              type="text"
              id="UpdateBlogThumbnailAuthor"
              value={updateBlogThumbnailAuthor}
              onChange={(e) => setUpdateBlogThumbnailAuthor(e.target.value)}
              placeholder="Update Title of this Blog..."
            />
          </div>
          <div className="my-2">
            <label htmlFor="isPublic">isPublic</label>
            <input
              id="isPublic"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              placeholder="Update Title of this Blog..."
              className="mx-4"
            />
          </div>
          {`<pre style="display: block;border: 2px solid #fff;color: #ffffff;background:#000000;padding: 20px 15px;border-radius: 10px;overflow-x: auto;height: fit-content;" id="code" class="code"></pre>
      `}
          <div className="relative h-fit overflow-hidden my-4">
            <FroalaEditor
              model={updateBlogDesc}
              onModelChange={(e: string) => setUpdateBlogDesc(e)}
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
            <div className="bg-white absolute bottom-4 h-[20px] w-full max-w-4xl" />
          </div>
          <div className="flex justify-end w-full px-5">
            <Button className="">Update Blog</Button>
          </div>
        </form>
        {showPreview && (
          <div
            className={cn(
              "py-5 p-4  fixed overflow-auto bg-background z-[100] w-full top-0 left-0 h-screen"
            )}
          >
            <PageWrapper className="md:max-w-[920px]">
              <h1 className="text-center font-bold text-2xl md:text-4xl my-4 text-balance">
                {updateTitle}
              </h1>
              <div className="flex  items-center my-4  px-4">
                <Image
                  src={"/logo/Zlaam.jpg"}
                  alt="Zlaam"
                  width={50}
                  height={50}
                  className="rounded-full"
                />

                <div className="flex flex-col px-4 justify-start">
                  <h1 className="text-lg font-semibold ">{updateBlogAuthor}</h1>
                  <p className="text-sm text-left">
                    published on:{" "}
                    {moment(oldData.createdAt || full_date).format(
                      "MMMM Do, YYYY"
                    )}
                  </p>
                </div>
              </div>
              <div className="w-fit mx-auto my-4">
                {updateBlogThumbnail && (
                  <Image
                    src={updateBlogThumbnail}
                    alt={updateBlogAuthor}
                    width={920}
                    height={920}
                  />
                )}
                <p className="text-center my-2">
                  Photo By &nbsp;&nbsp;
                  <span className="text-blue-500 underline cursor-pointer">
                    {parser(updateBlogThumbnailAuthor || "")}
                  </span>
                </p>
              </div>

              <div className="text-left w-full text-lg">
                {parser(updateBlogDesc)}
              </div>
            </PageWrapper>
          </div>
        )}
      </section>
    </>
  );
}

export default UpdateBlogBySlug;
