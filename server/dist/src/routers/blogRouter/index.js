"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blogController_1 = require("../../controllers/blogController/blogController");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const schemas_1 = require("../../schemas");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const apiResponseUtil_1 = require("../../utils/apiResponseUtil");
const CONSTANTS_1 = require("../../CONSTANTS");
const blogRouter = (0, express_1.Router)();
exports.blogRouter = blogRouter;
blogRouter
    .route("/createBlog")
    .post((0, validationMiddleware_1.validateData)(schemas_1.BlogValidation), authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsModerator_OR_Admin, blogController_1.createBlogController);
blogRouter.route("/getAllPublicBlogs").get(blogController_1.getAllBlogsController);
blogRouter.route("/getHomePagePublicBlog").get(blogController_1.getHomePageBlogs);
blogRouter
    .route("/getAllPrivateBlogs")
    .get(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, blogController_1.getAllPrivateBlogsController);
blogRouter.route("/getSingleBlog/:blogSlug").get(blogController_1.getSingleBlogController);
blogRouter
    .route("/updateBlog/:blogSlug")
    .put(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, blogController_1.updateBlogController);
blogRouter
    .route("/deleteBlog/:blogSlug")
    .delete(authMiddleware_1.CheckToken, authMiddleware_1.ifUserIsAdmin, blogController_1.deleteBlogController);
blogRouter.route("/getAllBlogs/search").get(blogController_1.searchBlogController);
//check points
// ** check if user login
blogRouter.route("/checkIfUserLogin").get(authMiddleware_1.ifUser, (req, res) => {
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "user is loggedin"));
});
// ** check if user is admin
blogRouter.route("/checkIfuserIsAdmin").get(authMiddleware_1.ifUserIsAdmin, (req, res) => {
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "user is logged in as admin"));
});
// ** check if user is moderator
blogRouter
    .route("/checkUserIsSubAdminOrAdmin")
    .get(authMiddleware_1.ifUserIsModerator_OR_Admin, (req, res) => {
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "user is logged in as moderator or subadmin"));
});
