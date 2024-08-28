"use client";

import { Link } from "@/components/ui/link";
import { SITE_VERSION } from "@/constants";
import { useRouter } from "next/navigation";

function BlogDescription({
  blogDescription,
  blogSlug,
}: {
  blogDescription: string;
  blogSlug: string;
}) {
  return (
    <>
      <Link
        className="text-foreground/70 my-2  text-sm font-normal cursor-pointer select-none "
        href={`/${SITE_VERSION}/${blogSlug}`}
      >
        {blogDescription}
      </Link>
    </>
  );
}

export default BlogDescription;
