import { BlogDataTypes } from "@/types";
import {} from "react";

interface blogPostProps {
  blogPosts: BlogDataTypes[];
}

function BlogRenderer({ blogPosts }: blogPostProps) {
  console.log(blogPosts, "from blog renderer");
  return (
    <section className="px-2 ">
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
      <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md"></div>
    </section>
  );
}

export default BlogRenderer;
