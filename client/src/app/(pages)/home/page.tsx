/* TODOS:
 ** Forgot password feature is pending
 ** Search functionality in Admin dashboard is waiting for implementation
 ** bug* Fix the search bug feature which is next js caching issue
 */
import { fetchHomePageBlogs } from "@/helper/fetch/fetchData";
import { BlogTypes } from "@/types";
import { Fragment } from "react";
import BlogRenderer from "./comp/BlogRenderer";
import BlogDataOptimizer from "../all-posts/comp/DataOptimizer";

async function HomePage() {
  try {
    const blogs = (await fetchHomePageBlogs()) as BlogTypes;
    if (!blogs?.data || blogs?.data?.blogs.length === 0) {
      return (
        <div className="h-[60dvh] flex justify-center items-center">
          <h1 className="text-red-500">No Blog Post Found!</h1>
        </div>
      );
    }

    const blogPosts = blogs?.data?.blogs;
    return (
      <>
        <section>
          {blogPosts.map((post) => (
            <Fragment key={post.blogId}>
              {/* <BlogRenderer post={post} /> */}
              <BlogDataOptimizer post={post} />
            </Fragment>
          ))}
        </section>
      </>
    );
  } catch (error: any) {
    console.log(error.message);
    return <div>Error loading blog posts.</div>;
  }
}

export default HomePage;
