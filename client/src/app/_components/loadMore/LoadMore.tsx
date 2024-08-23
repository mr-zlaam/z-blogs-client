"use client";
import { useInView } from "react-intersection-observer";

import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import { useState } from "react";
import { BlogDataTypes } from "@/types";
const fetchBlogs = async () => {};
function LoadMore() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [blogs, setBlogs] = useState<BlogDataTypes[]>([]);
  return (
    <div ref={ref}>
      <PageLoader />
    </div>
  );
}

export default LoadMore;
