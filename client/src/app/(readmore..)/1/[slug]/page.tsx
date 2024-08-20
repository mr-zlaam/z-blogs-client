import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { SinglePostBlogTypes } from "@/types";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import {} from "react";
export interface SlugTypes {
  slug: string;
}
// Fetching full article

const fetchSinglePost = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getSingleBlog/${slug}`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      return error.message + " ErrorFrom fetching single post";
    }
    return error;
  }
};

async function ReadMorePage({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const singlePost = (await fetchSinglePost(slug)) as SinglePostBlogTypes;
  if (!singlePost) {
    return <div>Blog not found</div>;
  }
  const article = DOMPurify.sanitize(
    marked(singlePost?.data?.blogDescription) as string
  );
  return (
    <>
      <PageWrapper>ReadMorePage</PageWrapper>
      <p>{slug}</p>
    </>
  );
}

export default ReadMorePage;
