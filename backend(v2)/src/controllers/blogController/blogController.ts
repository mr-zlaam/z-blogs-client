import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynhandlerUtil";

const createBlogController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      blogAuthor,
      blogTitle,
      blogDescription,
      blogSlug,
      blogThumbnail,
      blogThumbnailAuthor,
    } = req.body;
  }
);
export { createBlogController };
