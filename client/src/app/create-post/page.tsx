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
    return redirect("/user-auth/sign-in");
  }
  try {
    const userInfoInsideToken = verify(token?.value, SECRET) as PayLoadType;
    // TODO: enable this after integrating rte but make sure to create opt form first
    if (!userInfoInsideToken.isVerfied) {
      console.log("You are not verified");
      return redirect("/home");
    }
    if (
      userInfoInsideToken.role !== "ADMIN" &&
      userInfoInsideToken.role !== "MODERATOR"
    ) {
      console.log("unauthenticated user tried to access this route");
      return redirect("/user-auth/sign-in");
    }
    return (
      <>
        <section>
          <CreatePost token={token?.value} uid={userInfoInsideToken.uid} />
        </section>
      </>
    );
  } catch (error: any) {
    return redirect("/user-auth/sign-in");
  }
}

export default CreatePostPage;
