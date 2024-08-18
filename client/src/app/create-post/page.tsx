import { SECRET } from "@/config";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { PayLoadType } from "@/types";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import {} from "react";

function CreatePostPage() {
  const token = useCookieGrabber();
  if (!token?.value) {
    console.log("no token found");
    return redirect("/home");
  }
  const userInfoInsideToken = verify(token?.value, SECRET) as PayLoadType;
  if (
    userInfoInsideToken.role !== "ADMIN" &&
    userInfoInsideToken.role !== "MODERATOR"
  ) {
    console.log("unauthenticated user try to access this route");
    return redirect("/home");
  }
  return (
    <>
      <section>CreatePostPage</section>
    </>
  );
}

export default CreatePostPage;
