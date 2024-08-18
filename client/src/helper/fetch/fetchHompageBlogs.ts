import { BACKEND_URI } from "@/config";
import { BlogTypes } from "@/types";

export const fetchHomePageBlogs = async () => {
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getHomePagePublicBlog`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return data as BlogTypes;
    } else {
      throw new Error("Something went wrong while fetching hompage data");
    }
  } catch (error: any) {
    console.log(
      error.message,
      "error from home page blog fetching in src/helper/fetch/fetchHompage.ts"
    );
    return error;
  }
};
