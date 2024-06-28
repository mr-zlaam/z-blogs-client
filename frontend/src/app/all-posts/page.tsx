import ImgLoader from "@/_subComponents/imgLoader";
import { fetchBlogs as FetchAllPost } from "@/app/helper/fetchAllBlogs/FetchAllBlogs";
import { PublicBLogTypes } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ScrollToTop from "../(getSinglePost)/1/[slug]/components/ScrollToTop";
import NavBar from "../components/NavBar/NavBar";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import GoBack from "./components/GoBack/GoBack";
import RenderAllPosts from "./components/RenderAllPosts/RenderAllPosts";
async function AllPosts() {
  const getAllPosts: PublicBLogTypes = await FetchAllPost();

  if (!getAllPosts.success) return redirect("/home");
  const { blogs } = getAllPosts.data;
  const allPosts = blogs.reverse();
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
