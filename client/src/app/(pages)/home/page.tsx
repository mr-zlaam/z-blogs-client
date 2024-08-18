import { Link } from "@/components/ui/link";
import { BACKEND_URI } from "@/config";
import { fetchHomePageBlogs } from "@/helper/fetch/fetchHompageBlogs";
import { BlogDataTypes, BlogTypes } from "@/types";
import BlogRenderer from "./comp/BlogRenderer";

async function HomePage() {
  try {
    const blogs = (await fetchHomePageBlogs()) as BlogTypes;
    if (!blogs.data || blogs?.data?.blogs.length === 0) {
      return (
        <div className="h-[60dvh] flex justify-center items-center">
          <h1 className="text-red-500">No Blog Post Found!</h1>
        </div>
      );
    }

    const blogPosts = blogs.data.blogs;
    return (
      <>
        <section>
          <BlogRenderer blogPosts={blogPosts} />
        </section>
      </>
    );
  } catch (error: any) {
    console.log(error.message);
    return <div>Error loading blog posts.</div>;
  }
}

export default HomePage;
