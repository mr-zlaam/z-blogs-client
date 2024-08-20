"use client";

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useRouter } from "next/navigation";

function BlogDescription({ blogDescription }: { blogDescription: string }) {
  const router = useRouter();
  const rawHtml = DOMPurify.sanitize(marked(blogDescription) as string);
  return (
    <>
      <div
        onClick={() => {
          router.push(``);
        }}
        dangerouslySetInnerHTML={{
          __html: rawHtml.length === 0 ? "Write something...." : rawHtml,
        }}
        className="text-foreground/70 my-2  text-sm mx-4 truncate	line-clamp-4 text-clip cursor-pointer "
      ></div>{" "}
    </>
  );
}

export default BlogDescription;
