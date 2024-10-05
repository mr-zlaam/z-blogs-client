import { axios } from "@/axios";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { SinglePostBlogTypes } from "@/types";
import { AxiosError } from "axios";
import { notFound, redirect } from "next/navigation";
import {} from "react";
import UpdateBlogBySlug from "./components/updateBLogBySlug/UpdateBlogByslug";

export interface SlugTypes {
  slug: string;
}
const fetchSingleBlog = async (slug: string) => {
  try {
    const response = await axios.get(`/blog/getSingleBlog/${slug}`);
    if (response.status !== 200) {
      return redirect("/admin/blogs/privateBlogs");
    }
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.status;
  }
};
async function Slug({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const token = useCookieGrabber();
  if (!token) return redirect("/home");
  const data: SinglePostBlogTypes = await fetchSingleBlog(slug);
  if (!data?.data) return notFound();
  return (
    <section className="mx-5 overflow-auto ">
      <UpdateBlogBySlug
        slugForUpdate={slug.toString()}
        previousData={data}
        token={token?.value || ""}
      />
    </section>
  );
}

export default Slug;
