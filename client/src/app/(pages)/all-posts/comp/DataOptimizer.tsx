import { BlogDataTypes } from "@/types";
import {} from "react";
interface blogPostProps {
  post: BlogDataTypes;
}
async function BlogDataOptimizer({ post }: blogPostProps) {
  return (
    <>
      <section>BlogDataOptimizer</section>
    </>
  );
}

export default BlogDataOptimizer;
