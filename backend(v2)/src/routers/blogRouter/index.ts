import { Router } from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getAllPrivateBlogsController,
  getSingleBlogController,
  searchBlogController,
  updateBlogController,
} from "../../controllers/blogController/blogController";
import { validateData } from "../../middlewares/validationMiddleware";
import { BlogValidation } from "../../schemas";
import {
  ifUserIsAdmin,
  ifUserIsModerator_OR_Admin,
} from "../../middlewares/authMiddleware";

const blogRouter = Router();
blogRouter
  .route("/createBlog")
  .post(
    validateData(BlogValidation),
    ifUserIsModerator_OR_Admin,
    createBlogController
  );
blogRouter.route("/getAllPublicBlogs").get(getAllBlogsController);
blogRouter
  .route("/getAllPrivateBlogs")
  .get(ifUserIsAdmin, getAllPrivateBlogsController);
blogRouter.route("/getSingleBlog/:blogSlug").get(getSingleBlogController);
blogRouter
  .route("/updateBlog/:blogSlug")
  .put(ifUserIsAdmin, updateBlogController);
blogRouter
  .route("/deleteBlog/:blogSlug")
  .delete(ifUserIsAdmin, deleteBlogController);
blogRouter.route("/getAllBlogs/search").get(searchBlogController);
export { blogRouter };
