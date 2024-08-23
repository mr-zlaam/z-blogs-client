import { axios } from "@/axios";
import { BACKEND_URI } from "@/config";
import { BlogTypes } from "@/types";

// get home page blog
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
      error,
      "error from home page blog fetching in src/helper/fetch/fetchHompage.ts"
    );
    return error;
  }
};
// get All Public  Blogs
export const fetchAllPublicBlogs = async (page = 1 as number, limit = 2) => {
  try {
    const response = await fetch(
      `${BACKEND_URI}/blog/getAllPublicBlogs?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data as BlogTypes;
    } else {
      throw new Error("Something went wrong while fetching hompage data");
    }
  } catch (error: any) {
    console.log(
      error.message,
      "error from home page blog fetching in src/helper/fetch/fetchAllPosts.ts"
    );
    return error;
  }
};
// make logout user from the session
export const handleLogout = async (token: string) => {
  try {
    const res = await axios.get(`${BACKEND_URI}/auth/logoutUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};
