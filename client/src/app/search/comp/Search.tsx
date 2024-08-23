"use client";
import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import BlogDataOptimizer from "@/app/(pages)/all-posts/comp/DataOptimizer";
import { DELAY, PAGE } from "@/constants";
import { fetchSearchPublicBlogs } from "@/helper/fetch/fetchBLogs";
import { BlogDataTypes, BlogTypes } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// GLOABL FILE VARIALBE
let page = 1;
function Search() {
  const { ref, inView } = useInView({});
  const [blogs, setBlogs] = useState<BlogDataTypes[]>([]);
  // const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  useEffect(() => {
    const loadBlogs = async () => {
      if (!inView || loading || !hasMore) return;
      setLoading(true);

      try {
        if (!query) return router.push("/home");
        const blogPost: BlogTypes = await fetchSearchPublicBlogs(query, page);
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
        <h1 className=" text-xl font-bold">Search Result for:- {query} </h1>
        <div className="h-10">
          {blogs.length === 0 && (
            <p className="h-10 text-foreground/60 font-bold text-sm text-center my-4">
              No result found for {query}
            </p>
          )}
        </div>
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
      {!hasMore && !loading && (
        <p className="h-10 text-foreground/60 font-bold text-sm text-center my-4">
          No more posts for now
        </p>
      )}
    </>
  );
}

export default Search;
