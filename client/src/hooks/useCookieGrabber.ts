import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default function useCookieGrabber() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  return token;
}
export function logoutUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (token?.value) {
    cookieStore.delete("accessToken");
  }
  return redirect("/user-auth/sign-in");
}
