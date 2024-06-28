import { SlugTypes } from "@/app/(admin)/admin/blogs/updateBlog/[slug]/page";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { BlogDataTypes } from "@/types";
import parser from "html-react-parser";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SinglePost from "./components/SinglePost";

const fetchSinglePost = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URI}/blogs/getSingleBlog/${slug}`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      return error;
    }
  }
};

export async function generateMetadata({
  params,
}: {
  params: SlugTypes;
}): Promise<Metadata> {
  const response = await fetch(
    `${BACKEND_URI}/blogs/getSingleBlog/${params?.slug as string}`
  );
  const post = await response.json();
  const { data: getDataFromSinglePost } = post;
  const data: BlogDataTypes = getDataFromSinglePost;
  if (!data) return notFound();
  return {
    title: data.blogTitle,
    description: (parser(data.blogDescription) as string) || "", // Ensure description is a string
    openGraph: {
      images: [
        {
          url: data.blogThumbnail,
        },
      ],
    },
  };
}

async function GetSinglePost({ params }: { params: SlugTypes }) {
  const { slug } = params;

  if (!slug) return redirect("/home");
  const getDataFromSinglePost = await fetchSinglePost(slug);
  if (!getDataFromSinglePost.success) {
    return redirect("/home");
  }
  const { data } = getDataFromSinglePost;
  const singlePostData: BlogDataTypes = data!;
  if (!singlePostData) return notFound();
  return (
    <>
      <PageWrapper className="md:max-w-[820px] px-4">
        <SinglePost SinglePostData={singlePostData} />
      </PageWrapper>
    </>
  );
}

export default GetSinglePost;
