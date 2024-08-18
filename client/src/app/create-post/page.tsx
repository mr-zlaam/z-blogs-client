import useCookieGrabber from "@/hooks/useCookieGrabber";
import { redirect } from "next/navigation";
import {} from "react";

function CreatePostPage() {
  const token = useCookieGrabber();
  if (!token?.value) {
    console.log("no token found");
    return redirect("/home");
  }
  return (
    <>
      <section>CreatePostPage</section>
    </>
  );
}

export default CreatePostPage;
