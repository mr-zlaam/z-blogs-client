import {} from "react";
import CreatePosts from "./components/Post";
import Link from "next/link";
import { API as axios } from "@/axios";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { redirect } from "next/navigation";
const checkUserIsSubAdminOrAdmin = async (token: string) => {
  try {
    const response = await axios.get("/blogs/checkUserIsSubAdminOrAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
async function CreateBLog() {
  const token = useCookieGrabber();
  const isAdminOrSubAdmin = await checkUserIsSubAdminOrAdmin(
    token?.value || ""
  );
  if (isAdminOrSubAdmin.statusCode !== 200) return redirect("/home");
  return (
    <>
      <h1 className="py-5 bg-background z-[99]  text-center font-bold text-xl sticky top-0 w-full ">
        <Link
          href="/home"
          className="duration-300 transition-all hover:text-blue-300"
        >
          Go To Home Page
        </Link>
      </h1>
      <CreatePosts token={token?.value || ""} />
    </>
  );
}

export default CreateBLog;
