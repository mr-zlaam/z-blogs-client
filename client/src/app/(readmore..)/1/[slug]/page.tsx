import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { SITE_URL } from "@/constants";
import { fetchSinglePost } from "@/helper/fetch/fetchData";
import { SinglePostBlogTypes } from "@/types";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import SinglePost from "./comp/SinglePost";
export async function generateMetadata({
  params,
}: {
  params: SlugTypes;
}): Promise<Metadata | undefined> {
  const { slug } = params;
  const post = (await fetchSinglePost(slug as string)) as SinglePostBlogTypes;
  if (!post) {
    return;
  }
  const { data } = post;
  if (!data) return notFound();
  return {
    title: { absolute: data?.blogTitle },
    description: data?.blogOverView,
    openGraph: {
      title: { absolute: data?.blogTitle },
      description: data?.blogOverView,
      type: "article",
      locale: "en_US",
      url: `${SITE_URL}/1/${slug}`,
      siteName: "Zlaam",
      images: [
        {
          url: data?.blogThumbnail,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
export interface SlugTypes {
  slug: string;
}
// Fetching full article
// generate MetaData
async function ReadMorePage({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const singlePost = (await fetchSinglePost(slug)) as SinglePostBlogTypes;
  if (!singlePost) {
    return notFound();
  }
  const {
    author,
    blogDescription,
    blogThumbnail,
    blogThumbnailAuthor,
    createdAt,
    blogTitle,
  } = singlePost && singlePost.data;
  const article = DOMPurify.sanitize(marked(blogDescription) as string);

  return (
    <Fragment>
      <PageWrapper className="">
        <SinglePost
          article={article}
          author={author}
          coverImage={blogThumbnail}
          coverImageOwner={blogThumbnailAuthor}
          createdAt={createdAt}
          blogTitle={blogTitle}
        />
      </PageWrapper>
    </Fragment>
  );
}

export default ReadMorePage;
