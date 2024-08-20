"use client";

import { SITE_VERSION } from "@/constants";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useRouter } from "next/navigation";

function BlogDescription({
  blogDescription,
  blogSlug,
}: {
  blogDescription: string;
  blogSlug: string;
}) {
  const router = useRouter();
  const rawHtml = DOMPurify.sanitize(marked(blogDescription) as string);
  return (
    <>
      <div
        onClick={() => {
          blogSlug &&
            router.push(`/${SITE_VERSION}/${blogSlug}
`);
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
