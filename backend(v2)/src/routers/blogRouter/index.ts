import { Router } from "express";
import { createBlogController } from "../../controllers/blogController/blogController";
import { validateData } from "../../middlewares/validationMiddleware";
import { BlogValidation } from "../../schemas";

const blogRouter = Router();
blogRouter
  .route("/createBlog")
  .post(validateData(BlogValidation), createBlogController);
export { blogRouter };
