import { Router } from "express";
import {
  createBlogController,
  getAllBlogsController,
} from "../../controllers/blogController/blogController";
import { validateData } from "../../middlewares/validationMiddleware";
import { BlogValidation } from "../../schemas";

const blogRouter = Router();
blogRouter
  .route("/createBlog")
  .post(validateData(BlogValidation), createBlogController);
blogRouter.route("/getAllBlogs").get(getAllBlogsController);
export { blogRouter };
