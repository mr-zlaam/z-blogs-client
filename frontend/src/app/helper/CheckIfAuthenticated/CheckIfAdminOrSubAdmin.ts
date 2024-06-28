import { API as axios } from "@/axios";
import useCookieGrabber from "@/hooks/useCookieGrabber";
async function CheckIfAdmin() {
  const token = useCookieGrabber();

  try {
    const response = await axios.get("/blogs/checkIfuserIsAdmin", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    return response.data;
  } catch (error: any) {
    error;
  }
}
async function CheckIfSubAdmin() {
  const token = useCookieGrabber();
  try {
    const response = await axios.get("/blogs/checkUserIsSubAdminOrAdmin", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    return response.data;
  } catch (error: any) {
    error;
  }
}
async function CheckIfUserLoggedIn() {
  const token = useCookieGrabber();
  try {
    const response = await axios.get("/blogs/checkIfUserLogin", {
      headers: {
        Authorization: `Bearer ${token?.value || ""}`,
      },
    });
    return response.data;
  } catch (error: any) {
    error;
  }
}

export { CheckIfSubAdmin, CheckIfAdmin, CheckIfUserLoggedIn };
