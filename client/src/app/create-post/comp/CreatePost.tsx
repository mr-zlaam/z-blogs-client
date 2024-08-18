"use client";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {} from "react";

function CreatePost({ token, uid }: { token: string; uid: string }) {
  console.log(uid);
  return (
    <>
      <Button className="fixed right-4 top-5">Preview</Button>
      <Link
        varient="expand-from-left"
        href={"/home"}
        className="text-blue-500 after:bg-blue-500 block w-fit mx-auto p-2"
      >
        Go Back
      </Link>
      <PageWrapper className="border border-solid border-foreground">
        hello world
      </PageWrapper>
    </>
  );
}

export default CreatePost;
