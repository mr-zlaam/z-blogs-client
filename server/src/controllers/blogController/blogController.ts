import type { Request, Response } from "express";
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from "../../CONSTANTS";
import { prisma } from "../../db";
import { BlogDataTypes } from "../../types";
import { apiResponse } from "../../utils/apiResponseUtil";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import {
  generateRandomStrings,
  generateSlug,
} from "../../utils/slug_and_str_generator";
// * create blog post controller
const createBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      authorId,
      blogTitle,
      blogDescription,
      blogThumbnail,
      blogThumbnailAuthor,
      blogOverView,
    } = req.body;
    const randomId = generateRandomStrings(10);
    const blogSlug = generateSlug(blogTitle);
    const blogPost = await prisma.blogPost.create({
      data: {
        authorId,
        blogTitle,
        blogDescription,
        blogOverView,
        blogSlug: `${blogSlug}_${randomId}`,
        blogThumbnail,
        blogThumbnailAuthor,
      },
      include: {
        author: {
          select: {
            uid: true,
            username: true,
            fullName: true,
            email: true,
            _count: true,
            role: true,
            createdAt: true,
          },
        },
      },
    });
    return res
      .status(CREATED)
      .json(
        apiResponse(
          CREATED,
          `${blogPost.author.fullName || "You"} have created this post successfully`,
          blogPost
        )
      );
  }
);
// * get all blogpost controller
const getAllBlogsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const pageLimit = Number(limit);
    if (
      isNaN(pageNumber) ||
      isNaN(pageLimit) ||
      pageNumber <= 0 ||
      pageLimit <= 0
    ) {
      throw { status: 400, message: "Invalid pagination parameters!!" };
    }

    const skip = (pageNumber - 1) * pageLimit;
    const take = pageLimit;
    const blogs = await prisma.blogPost.findMany({
      where: { isPublic: true },
      select: {
        blogId: true,
        blogTitle: true,
        blogDescription: true,
        blogSlug: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
        blogOverView: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            uid: true,
            fullName: true,
            username: true,
            email: true,
            role: true,
            blogPosts: {
              select: { blogTitle: true, blogSlug: true, blogThumbnail: true },
            },
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalBlogs = await prisma.blogPost.count();
    const totalPages = Math.ceil(totalBlogs / pageLimit);
    const totalPublicBlogs = blogs.length;
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;

    const pagination = {
      hasNextPage,
      hasPreviousPage,
    };
    return res.status(OK).json(
      apiResponse(
        OK,
        "All Blogs data fetched successfully",
        { blogs },
        {
          totalPages,
          totalPublicBlogs,
          totalBlogs,
          pagination,
        }
      )
    );
  }
);
// * Fetch Home page latest blogs
const getHomePageBlogs = asyncHandler(async (req: Request, res: Response) => {
  // Fetch the latest 6 public blogs
  const blogs = await prisma.blogPost.findMany({
    where: { isPublic: true },
    select: {
      blogId: true,
      blogTitle: true,
      blogDescription: true,
      blogSlug: true,
      blogThumbnail: true,
      blogOverView: true,
      blogThumbnailAuthor: true,
      isPublic: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          uid: true,
          username: true,
          fullName: true,
          email: true,
          role: true,
          createdAt: true,
          blogPosts: {
            select: { blogTitle: true, blogSlug: true, blogThumbnail: true },
          },
        },
      },
    },
    take: 6, // Limit to the latest 6 blogs
    orderBy: {
      createdAt: "desc", // Order by creation date in descending order (latest first)
    },
  });

  // Return the blogs as a response
  return res.json(
    apiResponse(200, "Latest Blogs fetched successfully", { blogs })
  );
});

// * get single blogpost controller
const getSingleBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { blogSlug } = req.params;
    const blog = await prisma.blogPost.findUnique({
      where: { blogSlug },
      select: {
        blogId: true,
        blogTitle: true,
        blogDescription: true,
        blogSlug: true,
        blogOverView: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            uid: true,
            username: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            blogPosts: {
              select: {
                blogTitle: true,
                blogSlug: true,
                blogThumbnail: true,
              },
            },
          },
        },
      },
    });
    return res
      .status(OK)
      .json(
        apiResponse(OK, `single blog post's data fetched successfully`, blog)
      );
  }
);

// * update blog controller
const updateBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { blogSlug: slug } = req.params;
    const {
      blogTitle,
      blogDescription,
      blogThumbnail,
      blogThumbnailAuthor,
      blogOverView,
      isPublic,
    } = req.body;

    const currentBlog = await prisma.blogPost.findUnique({
      where: { blogSlug: slug },
      select: {
        blogTitle: true,
        blogSlug: true,
        blogDescription: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
        blogOverView: true,
        isPublic: true,
      },
    });

    if (!currentBlog) {
      return res.status(404).json(apiResponse(404, "Blog not found", {}));
    }

    const updateData: BlogDataTypes = {};
    if (currentBlog.blogTitle !== blogTitle) {
      updateData.blogTitle = blogTitle;
      const randomId = generateRandomStrings(10);
      const newBlogSlug = generateSlug(blogTitle);
      updateData.blogSlug = `${newBlogSlug}_${randomId}`;
    }
    if (currentBlog.blogDescription !== blogDescription) {
      updateData.blogDescription = blogDescription;
    }
    if (currentBlog.blogThumbnail !== blogThumbnail) {
      updateData.blogThumbnail = blogThumbnail;
    }
    if (currentBlog.blogThumbnailAuthor !== blogThumbnailAuthor) {
      updateData.blogThumbnailAuthor = blogThumbnailAuthor;
    }
    if (currentBlog.isPublic !== isPublic) {
      updateData.isPublic = isPublic;
    }
    if (currentBlog.blogOverView !== blogOverView) {
      updateData.blogOverView = blogOverView;
    }

    if (Object.keys(updateData).length > 0) {
      const updatedBlog = await prisma.blogPost.update({
        where: { blogSlug: slug },
        data: updateData,
        select: {
          blogTitle: true,
          blogDescription: true,
          blogSlug: true,
          blogThumbnail: true,
          blogThumbnailAuthor: true,
          isPublic: true,
          blogOverView: true,
          updatedAt: true,
          createdAt: true,
          author: {
            select: {
              uid: true,
              username: true,
              fullName: true,
              email: true,
              role: true,

              createdAt: true,
              blogPosts: {
                select: {
                  blogTitle: true,
                  blogSlug: true,
                  blogThumbnail: true,
                },
              },
            },
          },
        },
      });

      return res
        .status(OK)
        .json(
          apiResponse(
            OK,
            `${updatedBlog.author.fullName || "You've"} updated this blog`,
            updatedBlog
          )
        );
    } else {
      return res
        .status(200)
        .json(apiResponse(200, "No changes detected", currentBlog));
    }
  }
);

// * delete blog controller
const deleteBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { blogSlug } = req.params;
    const deletedUser = await prisma.blogPost.delete({
      where: { blogSlug },
      select: {
        blogTitle: true,
        blogSlug: true,
        author: { select: { fullName: true } },
      },
    });
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          `${deletedUser.author.fullName || "You've"} deleted this blogPost`,
          deletedUser
        )
      );
  }
);

// * Search in Blog Controller

const searchBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q)
      throw { status: BAD_REQUEST, message: "Search query is required!!" };

    const searchQuery = q as string;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      throw { status: BAD_REQUEST, message: "Invalid pagination parameters!!" };
    }

    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;

    // Query for fetching blogs
    const blogs = await prisma.$queryRaw`
  SELECT * FROM "BlogPost"
  WHERE "isPublic" = true
  AND to_tsvector('english', "blogTitle" || ' ' || "blogDescription" || ' ' || "blogSlug") @@ plainto_tsquery('english', ${searchQuery})
  ORDER BY "createdAt" DESC
  OFFSET ${skip} LIMIT ${take}
`;

    const totalBlogCount: { count: string }[] = await prisma.$queryRaw`
          SELECT COUNT(*) FROM "BlogPost"
          WHERE "isPublic" = true
          AND to_tsvector('english', "blogTitle" || ' ' || "blogDescription" || ' ' || "blogSlug") @@ plainto_tsquery('english', ${searchQuery})`;
    const blogCount = Number(totalBlogCount[0].count);
    const totalPages = Math.ceil(blogCount / take);
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
      hasNextPage,
      hasPreviousPage,
    };

    return res.status(OK).json(
      apiResponse(
        OK,
        "Data searched successfully",
        { blogs },
        {
          totalPages,
          totalPublicBlogs: blogCount, //TODO: fix this later
          totalBlogs: blogCount,
          pagination,
        }
      )
    );
  }
);

//////////////////////////// * Private Blogs *//////////////////
const getAllPrivateBlogsController = asyncHandler(
  async (req: Request, res: Response) => {
    const privateBlogs = await prisma.blogPost.findMany({
      where: { isPublic: false },
      select: {
        blogId: true,
        blogSlug: true,
        blogDescription: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
        blogOverView: true,
        blogTitle: true,
        isPublic: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            uid: true,
            fullName: true,
            username: true,
            email: true,
            blogPosts: {
              select: { blogId: true, blogTitle: true, blogSlug: true },
            },
          },
        },
      },
    });
    if (privateBlogs.length === 0) {
      return res
        .status(NOT_FOUND)
        .json(apiResponse(NOT_FOUND, "No private Blog found", privateBlogs));
    }
    return res
      .status(OK)
      .json(
        apiResponse(
          OK,
          "All private blogs data fetched successfully",
          privateBlogs
        )
      );
  }
);

export {
  //public blogs
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  //private Blogs
  getAllPrivateBlogsController,
  getHomePageBlogs,
  getSingleBlogController,
  searchBlogController,
  updateBlogController,
};
