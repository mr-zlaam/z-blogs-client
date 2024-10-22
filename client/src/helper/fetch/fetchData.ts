import { axios } from "@/axios";
import { BACKEND_URI } from "@/config";
import { LIMIT, REVALIDATE } from "@/constants";
import { BlogTypes } from "@/types";

// get home page blog
export const fetchHomePageBlogs = async () => {
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getHomePagePublicBlog`, {
      next: { revalidate: REVALIDATE },
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
      "error from home page blog fetching in src/helper/fetch/fetchHompage.ts",
    );
    return error;
  }
};
// get All Public  Blogs
export const fetchAllPublicBlogs = async (
  page = 1 as number,
  limit = LIMIT,
) => {
  try {
    const response = await fetch(
      `${BACKEND_URI}/blog/getAllPublicBlogs?page=${page}&limit=${limit}`,
      {
        next: { revalidate: REVALIDATE },
      },
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
      "error from home page blog fetching in src/helper/fetch/fetchAllPosts.ts",
    );
    return error;
  }
};
// get public blogs for dashboard using axios
export const fetchDashboardPublicBlogs = async (
  page = 1 as number,
  limit = LIMIT,
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URI}/blog/getAllPublicBlogs?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      const result = response.data;
      return result;
    } else throw new Error("Something went wrong while fetching hompage data");
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
// get public blogs through search query
export const fetchSearchPublicBlogs = async (
  query: string,
  page: number,
  limit = LIMIT,
) => {
  try {
    const response = await axios.get(
      `${BACKEND_URI}/blog/getAllBlogs/search?q=${query}&limit=${limit}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.status === 200) {
      const result = response.data;
      return result;
    }
  } catch (error: any) {
    console.log(error);
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
// fetch private blogs
export const fetchPrivateBlogs = async (token: string) => {
  if (!token) {
    return console.log("token is not given for fecthing private stuff");
  }
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getAllPrivateBlogs`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data as BlogTypes;
      if (newData?.data?.blogs?.length === 0) return "No private blog found";
      return newData;
    }
  } catch (error: any) {
    console.log(error.message);
    return error.response.data || 403;
  }
};
// fetch single post
export const fetchSinglePost = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URI}/blog/getSingleBlog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      return error.message + " ErrorFrom fetching single post";
    }
    return error;
  }
};
