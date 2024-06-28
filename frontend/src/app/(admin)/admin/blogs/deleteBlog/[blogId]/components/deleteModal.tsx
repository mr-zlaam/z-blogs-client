"use client";
import { Button } from "@/components/ui/button";
import { BACKEND_URI } from "@/config";
import { useMessage } from "@/hooks/useMessage";
import { API as axios } from "@/axios";
import { useRouter } from "next/navigation";
import {} from "react";
function Delete({ id, token }: { id: string; token: string }) {
  const router = useRouter();

  const { errorMessage, successMessage } = useMessage();
  const RedirectToPreviousPage = () => {
    router.push("/admin/blogs/privateBlogs");
  };
  const deleteThisUser = async () => {
    try {
      const response = await axios.delete(`blogs/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        RedirectToPreviousPage();
        return successMessage("BlogPost has been deleted successfully");
      } else return null;
    } catch (error: any) {
      return errorMessage(
        error.response.data.message ||
          "something went wrong while deleting BlogPost."
      );
    }
  };
  return (
    <>
      <section className="backdrop-blur-lg h-screen  absolute left-0 top-0 w-full z-50 px-5">
        <div className="h-40 flex flex-col justify-around border bg-background border-foreground max-w-lg mx-auto relative top-80  rounded-md p-4 ">
          <h1>Are You sure that you want to delete this Blog Post?</h1>
          <p>{id}</p>
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
