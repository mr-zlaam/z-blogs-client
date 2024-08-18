"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {} from "react";

function CreatePost({ token, uid }: { token: string; uid: string }) {
  const router = useRouter();
  console.log(uid);
  return (
    <>
      <section>
        <Button
          variant={"link"}
          className="bg-transparent font-bold text-xl text-blue-400 w-fit mx-auto block"
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      </section>
    </>
  );
}

export default CreatePost;
