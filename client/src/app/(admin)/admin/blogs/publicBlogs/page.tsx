import { } from "react";
import AllPublicBlogs from "./components/AllPublicBlogs";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { redirect } from "next/navigation";
import { verify } from "jsonwebtoken";
import { SECRET } from "@/config";
import { PayLoadType } from "@/types";

async function PublicBlogs() {
  const token = useCookieGrabber();
  if (!token) return redirect("/home");
  let user;

  try {
    user = verify(token?.value, SECRET) as PayLoadType;
  } catch (error: any) {
    console.log(error.message);
  }

  if (!user || user.role !== "ADMIN") return redirect("/home");
  return (
    <>
      <main>
        <AllPublicBlogs />
      </main>
    </>
  );
}

export default PublicBlogs;
