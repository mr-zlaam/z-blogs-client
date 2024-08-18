import { BlogDataTypes } from "@/types";
import {} from "react";

interface blogPostProps {
  blogPosts: BlogDataTypes[];
}

function BlogRenderer({ blogPosts }: blogPostProps) {
  console.log(blogPosts, "from blog renderer");
  return (
    <>
      <section>BlogRenderer</section>
    </>
  );
}

export default BlogRenderer;
