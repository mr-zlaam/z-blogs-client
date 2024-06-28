import { Suspense } from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import NavBar from "../components/NavBar/NavBar";
import GoBack from "./components/GoBack/GoBack";
import RenderAllPosts from "./components/RenderAllPosts/RenderAllPosts";
import { fetchBlogs as FetchAllPost } from "@/app/helper/fetchAllBlogs/FetchAllBlogs";
import ImgLoader from "@/_subComponents/imgLoader";
import { PublicBLogTypes } from "@/types";
import { useMessage } from "@/hooks/useMessage";
import ScrollToTop from "../(getSinglePost)/1/[slug]/components/ScrollToTop";
import { Metadata } from "next";
import { redirect } from "next/navigation";
async function AllPosts() {
  const getAllPosts: PublicBLogTypes = await FetchAllPost();

  if (!getAllPosts.success) return redirect("/home");
  const { publicBlogsList } = getAllPosts.data;
  const allPosts = publicBlogsList.reverse();
  const renderLoader = () => (
    <div className="h-[50dvh] justify-center flex items-center">
      <ImgLoader />
    </div>
  );
  return (
    <>
      <PageWrapper className="md:max-w-[920px]">
        <GoBack />
        <ScrollToTop />
        <NavBar />
        <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
        <Suspense fallback={renderLoader()}>
          <RenderAllPosts allPosts={allPosts} />
        </Suspense>
      </PageWrapper>
    </>
  );
}

export default AllPosts;
export const metadata: Metadata = {
  title: "All Posts - ",
};
