"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useState } from "react";
import Editor from "./editor/Editor";

function CreatePost({ token, uid }: { token: string; uid: string }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  console.log(uid);
  return (
    <>
      {isPreviewOpen && (
        <div className="h-screen fixed top-0 left-0 w-full bg-background text-foreground z-[99]">
          <PageWrapper>hello</PageWrapper>
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
        <Editor />
      </PageWrapper>
    </>
  );
}

export default CreatePost;
