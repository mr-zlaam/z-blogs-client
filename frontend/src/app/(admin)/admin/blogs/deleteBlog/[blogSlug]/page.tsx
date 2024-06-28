import {} from "react";
import Delete from "./components/deleteModal";
import useCookieGrabber from "@/hooks/useCookieGrabber";
interface ParamType {
  blogSlug: string;
}
function DeleteBlog({ params }: { params: ParamType }) {
  const token = useCookieGrabber();
  return (
    <>
      <Delete id={params.blogSlug} token={token?.value || ""} />
    </>
  );
}

export default DeleteBlog;
