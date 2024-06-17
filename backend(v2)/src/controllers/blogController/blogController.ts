import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynhandlerUtil";
import { prisma } from "../../db";
import { BAD_REQUEST, CREATED } from "../../CONSTANTS";
import { apiResponse } from "../../utils/apiResponseUtil";

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
    const blogPost = await prisma.blogPost.create({
      data: {
        authorId,
        blogTitle,
        blogDescription,
        blogSlug,
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
export { createBlogController };
