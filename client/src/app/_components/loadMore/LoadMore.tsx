"use client";
import { useInView } from "react-intersection-observer";
import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import { Fragment, useEffect, useState } from "react";
import { BlogDataTypes, BlogTypes } from "@/types";
import { fetchAllPublicBlogs } from "@/helper/fetch/fetchBLogs";
import BlogDataOptimizer from "@/app/(pages)/all-posts/comp/DataOptimizer";
import { DELAY, PAGE } from "@/constants";

// GLOABL FILE VARIALBE
let page = PAGE;
function LoadMore() {
  const { ref, inView } = useInView({});
  const [blogs, setBlogs] = useState<BlogDataTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      if (!inView || loading || !hasMore) return;
      setLoading(true);

      try {
        const blogPost: BlogTypes = await fetchAllPublicBlogs(page);
        console.log(blogPost.metaData.pagination.hasNextPage);
        const fetchedBlogs = blogPost.data?.blogs;

        if (fetchedBlogs && fetchedBlogs.length > 0) {
          setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
          // setPage((prevPage) => prevPage + 1);
          page = PAGE + 1;
          setHasMore(blogPost?.metaData?.pagination?.hasNextPage);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to load more blogs", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      loadBlogs();
    }, DELAY);
  }, [inView]);
  console.log(blogs);
  return (
    <>
      <section>
        {blogs.map((post) => (
          <Fragment key={post.blogId}>
            <BlogDataOptimizer post={post} />
          </Fragment>
        ))}
      </section>

      {hasMore && (
        <div ref={ref} className="h-10">
          {loading && (
            <div className="flex justify-center">
              <PageLoader />
            </div>
          )}
        </div>
      )}
      {!hasMore && (
        <p className="h-10 text-foreground/60 font-bold text-sm text-center my-4">
          No more posts for now
        </p>
      )}
    </>
  );
}

export default LoadMore;
