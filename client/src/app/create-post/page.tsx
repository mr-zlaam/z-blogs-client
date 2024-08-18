import { SECRET } from "@/config";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { PayLoadType } from "@/types";
import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import {} from "react";
import CreatePost from "./comp/CreatePost";

function CreatePostPage() {
  const token = useCookieGrabber();
  if (!token?.value) {
    console.log("no token found");
    return redirect("/home");
  }
  try {
    const userInfoInsideToken = verify(token?.value, SECRET) as PayLoadType;
    if (
      userInfoInsideToken.role !== "ADMIN" &&
      userInfoInsideToken.role !== "MODERATOR"
    ) {
      console.log("unauthenticated user tried to access this route");
      return redirect("/home");
    }
    return (
      <>
        <section>
          <CreatePost token={token?.value} />
        </section>
      </>
    );
  } catch (error: any) {
    return <div>You can't access this page..</div>;
  }
}

export default CreatePostPage;
