import { SITE_URL } from "@/constants";
import { MetadataRoute } from "next";
import { fetchAllPublicBlogs } from "../helper/fetch/fetchData";
import { BlogTypes } from "@/types";

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap | undefined
> {
  const posts = (await fetchAllPublicBlogs()) as BlogTypes;
  if (!posts) return;
  const postUrls = posts.data?.blogs.map((post) => ({
    url: `${SITE_URL}/${post.blogSlug}`,
    lastModified: new Date(post.createdAt),
  }));
  if (!postUrls) return;
  return [
    {
      url: SITE_URL + "/home",
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/all-posts`,
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
