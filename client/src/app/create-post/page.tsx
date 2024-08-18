import { SECRET } from "@/config";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import {} from "react";

function CreatePostPage() {
  const token = useCookieGrabber();
  if (!token?.value) {
    console.log("no token found");
    return redirect("/home");
  }
  const userInfoInsideToke = verify(token?.value, SECRET);
  return (
    <>
      <section>CreatePostPage</section>
    </>
  );
}

export default CreatePostPage;
