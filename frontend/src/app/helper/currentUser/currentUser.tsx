"use server";
import { axios } from "@/axios";
import UseCookieGrabber from "@/hooks/useCookieGrabber";
export const fetchCurrentUser = async () => {
  const token = UseCookieGrabber();

  try {
    const currentUser = await axios("/auth/currentUser", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    return currentUser.data.data;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
