"use client";

import { SITE_VERSION } from "@/constants";
import { useRouter } from "next/navigation";

function BlogDescription({
  blogDescription,
  blogSlug,
}: {
  blogDescription: string;
  blogSlug: string;
}) {
  const router = useRouter();
  const rawHtml = blogDescription;
  return (
    <>
      <span
        onClick={() => {
          blogSlug &&
            router.push(`/${SITE_VERSION}/${blogSlug}
`);
        }}
        dangerouslySetInnerHTML={{
          __html: rawHtml.length === 0 ? "Write something...." : rawHtml,
        }}
      ></span>{" "}
    </>
  );
}

export default BlogDescription;
