import type { Request, Response } from "express";
import { BAD_REQUEST, CREATED, OK } from "../../CONSTANTS";
import { prisma } from "../../db";
import { apiResponse } from "../../utils/apiResponseUtil";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { generateRandomStrings } from "../../utils/randomStringGenerator";
// * create blog post controller
const createBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      authorId,
      blogTitle,
      blogDescription,
      blogSlug,
      blogThumbnail,
      blogThumbnailAuthor,
    } = req.body;
    const isBlogSlugExistAlready = await prisma.blogPost.findUnique({
      where: { blogSlug },
    });
    if (isBlogSlugExistAlready)
      throw { status: BAD_REQUEST, message: "Slug must be unique!!" };
    const randomId = generateRandomStrings(10);
    const blogPost = await prisma.blogPost.create({
      data: {
        authorId,
        blogTitle,
        blogDescription,
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
      select: {
        blogId: true,
        blogTitle: true,
        blogDescription: true,
        blogSlug: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
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
          totalBlogs,
          pagination,
        }
      )
    );
  }
);

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
        blogThumbnail: true,
        blogThumbnailAuthor: true,
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
      blogSlug,
      blogThumbnail,
      blogThumbnailAuthor,
    } = req.body;
    const newSlug = slug.split("_")[0];
    console.log(newSlug);
    const randomId = generateRandomStrings(10);
    const updateBlog = await prisma.blogPost.update({
      where: { blogSlug: slug },
      data: {
        blogTitle,
        blogDescription,
        blogSlug: `${newSlug}_${randomId}`,
        blogThumbnail,
        blogThumbnailAuthor,
      },
      select: {
        blogTitle: true,
        blogDescription: true,
        blogSlug: true,
        blogThumbnail: true,
        blogThumbnailAuthor: true,
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
          `${updateBlog.author.fullName || "You've"} updated this blog`,
          updateBlog
        )
      );
  }
);
export {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
};
