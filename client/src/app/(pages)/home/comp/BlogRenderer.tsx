import { BlogDataTypes } from "@/types";
import { Fragment } from "react";

interface blogPostProps {
  blogPosts: BlogDataTypes[];
}

function BlogRenderer({ blogPosts }: blogPostProps) {
  console.log(blogPosts, "from blog renderer");
  return (
    <section className="px-2 ">
      {blogPosts.map((post) => {
        return (
          <Fragment key={post.blogId}>
            <div className="border-solid border border-foreground/20 my-5 shadow-lg shadow-foreground/50 md:h-[350px] h-[300px] rounded-md">
              <h1>{post.blogTitle}</h1>
            </div>
          </Fragment>
        );
      })}
    </section>
  );
}

export default BlogRenderer;
