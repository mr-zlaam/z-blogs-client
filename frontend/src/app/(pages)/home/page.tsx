import ButtonLoader from "@/_subComponents/buttonLoader";
import NavBar from "@/app/components/NavBar/NavBar";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import {
  CheckIfAdmin,
  CheckIfSubAdmin,
  CheckIfUserLoggedIn,
} from "@/app/helper/CheckIfAuthenticated/CheckIfAdminOrSubAdmin";
import { Button } from "@/components/ui/button";
import { BACKEND_URI } from "@/config";
import { PublicBLogTypes } from "@/types";
import { SquarePen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense, lazy } from "react";
import Logo from "./components/logo";
import { fetchBlogs } from "@/app/helper/fetchAllBlogs/FetchAllBlogs";
const BlogRendererComponent = lazy(() => import("./components/BlogRenderer"));

async function Home() {
  const data: PublicBLogTypes = await fetchBlogs();
  const isAdmin = await CheckIfAdmin();
  const isSubAdmin = await CheckIfSubAdmin();
  const isUserLogined = await CheckIfUserLoggedIn();
  if (!data.success) return;
  const posts = data.data.publicBlogsList.reverse().slice(0, 6);
  const renderLoader = () => (
    <div className="h-[50dvh] justify-center flex items-center">
      <ButtonLoader />
    </div>
  );
  // const hanldeLogout = () => {};
  return (
    <main className="py-5">
      {isSubAdmin
        ? isSubAdmin.statusCode === 200 && (
            <Link
              href={"/createBlog"}
              className=" absolute top-10 right-10 flex items-center "
            >
              <SquarePen size={20} /> <Button variant={"link"}>Write</Button>
            </Link>
          )
        : ""}
      <PageWrapper className="lg:max-w-screen-xl ">
        <Logo />
        {isAdmin
          ? isAdmin.statusCode === 200 && (
              <Link href={"/admin/users"} className="block w-fit mx-auto my-4">
                <Button>Go To Admin Pannel</Button>
              </Link>
            )
          : ""}
        {!isUserLogined && (
          <Link
            href={"/user-auth/sign-in"}
            className="block w-fit mx-auto my-4"
          >
            <Button>Login</Button>
          </Link>
        )}

        <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
        <NavBar />
        <Suspense fallback={renderLoader()}>
          <BlogRendererComponent posts={posts} />
        </Suspense>
      </PageWrapper>
    </main>
  );
}

export default Home;
export const metadata: Metadata = {
  title: "Home - ",
};
