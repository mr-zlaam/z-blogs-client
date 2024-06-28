import {} from "react";
import AllPublicBlogs from "./components/AllPublicBlogs";
import { API as axios } from "@/axios";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { redirect } from "next/navigation";
const ChekcIfUserIsAdmin = async (token: string) => {
  try {
    const response = await axios.get("/blogs/checkIfuserIsAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
async function PublicBlogs() {
  const token = useCookieGrabber();
  const isUserAdmin = await ChekcIfUserIsAdmin(token?.value || "");
  if (isUserAdmin.statusCode !== 200) return redirect("/home");
  return (
    <>
      <main>
        <AllPublicBlogs />
      </main>
    </>
  );
}

export default PublicBlogs;
