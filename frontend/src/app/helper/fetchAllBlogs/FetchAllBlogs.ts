import { BACKEND_URI } from "@/config";

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getAllPublicBlogs`, {
      cache: "no-store",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Some thing went wrong while fetching the data");
    }
  } catch (error: any) {
    return error;
  }
};
