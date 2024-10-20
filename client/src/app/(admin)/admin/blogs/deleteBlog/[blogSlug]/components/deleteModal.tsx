"use client";
import ButtonLoader from "@/_subComponents/buttonLoader/buttonLoader";
import { axios } from "@/axios";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import { } from "react";
function Delete({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const { isLoading, stopLoading, startLoading } = useLoading()

  const { errorMessage, successMessage } = useMessage();
  const RedirectToPreviousPage = () => {
    router.push("/admin/blogs/privateBlogs");
  };
  const deleteThisUser = async () => {
    try {
      startLoading()
      const response = await axios.delete(`blog/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        RedirectToPreviousPage();
        router.refresh()
        return successMessage("BlogPost has been deleted successfully");
      } else return null;
    } catch (error: any) {
      console.log(error);
      return errorMessage(
        error.response.data.message ||
        "something went wrong while deleting BlogPost.",
      );
    } finally {
      stopLoading()
    }
  };
  return (
    <>
      {isLoading && <div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-[1000]">
          <ButtonLoader />
          <p className="text-sm font-normal text-center my-2">
            wait..
          </p>
        </div>
        <div className="fixed top-0 left-0 w-full h-screen  z-[998] backdrop-blur-sm bg-background/20" />
      </div>
      }
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
