import { cookies } from "next/headers";

export default function useCookieGrabber() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  return token;
}
