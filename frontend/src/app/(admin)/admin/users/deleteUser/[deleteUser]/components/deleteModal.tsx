"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URI } from "@/config";
import UseCookieGrabber from "@/hooks/useCookieGrabber";
import { useMessage } from "@/hooks/useMessage";
import { axios } from "@/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface ParamType {
  deleteUser: string;
}
function Delete({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const uid = id?.split("-")[0];
  const username = id?.split("-")[1];
  const { errorMessage, successMessage } = useMessage();
  const RedirectToPreviousPage = () => {
    return router.push("/admin/users");
  };
  const deleteThisUser = async () => {
    try {
      const isUserLogout = await axios.post(`/auth/logoutUser/${uid}`, {
        withCredentials: true,
      });
      console.log(isUserLogout.data);

      const response = await axios.delete(`/auth/deleteUser/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        RedirectToPreviousPage();
        return successMessage("user has been deleted successfully");
      } else return null;
    } catch (error: any) {
      console.log(error);
      return errorMessage(
        error.response.data.message ||
          "something went wrong while deleting user."
      );
    }
  };
  return (
    <>
      <section className="backdrop-blur-lg h-screen  absolute left-0 top-0 w-full z-50 px-5">
        <div className="h-40 flex flex-col justify-around border bg-background border-foreground max-w-lg mx-auto relative top-80  rounded-md p-4 ">
          <h1>Are You sure that you want to delete this user?</h1>
          <p>{username}</p>
          <div className="w-full flex justify-end items-center gap-5">
            <Button onClick={RedirectToPreviousPage}>Close</Button>
            <Button onClick={deleteThisUser}>Yes I am sure</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Delete;
