import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";
import { SITE_URL } from "@/constants";
import { fetchSinglePost } from "@/helper/fetch/fetchData";
import { SinglePostBlogTypes } from "@/types";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Fragment } from "react";
import SinglePost from "./comp/SinglePost";
import { ThemeToggler } from "@/theme/ThemeToggler";
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
    twitter: {
      title: { absolute: data?.blogTitle },
      description: data?.blogOverView,
      creator: "@mrzlaam",
      images: [data?.blogThumbnail],
    },
    keywords: [
      "mr-zlaam",
      "Mern-Stack Developer",
      "A blog application",
      "zlaam",
      "siraj",
      "Zlaam",
      "web-developer",
      "articles",
      `${data?.blogTitle}`,
      `${data?.blogOverView}`,
      "github",
      "mrzlaam",
      "mr-zlaam",
      "mr-zlaam",
      "mr-zlaam",
      "mr-zlaam",
    ],
    applicationName: "mr-zlaam",
    authors: [{ name: "mr-zlaam", url: "https://github.com/mr-zlaam" }],
    category: "A Blog Application for Developers and Tech Enthusiasts",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    appLinks: {
      web: {
        url: `${SITE_URL}/1/${slug}`,
        should_fallback: true,
      },
    },
    publisher: "mr-zlaam",
    generator: "mr-zlaam",
    openGraph: {
      title: { absolute: data?.blogTitle },
      description: data?.blogOverView,
      type: "article",
      locale: "en_US",
      tags: [
        "mr-zlaam",
        "a-full-stack-developer",
        `${data?.blogTitle}`,
        `${data?.blogOverView}`,
      ],
      url: `${SITE_URL}/1/${slug}`,
      siteName: "mr-zlaam",

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
  if (!singlePost?.data) {
    return redirect("/home");
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
      <div className="lg:fixed lg:left-8 lg:top-12 z-[999] flex  justify-center relative top-5 lg:inline ">
        <ThemeToggler />
      </div>
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
