"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogController = exports.searchBlogController = exports.getSingleBlogController = exports.getHomePageBlogs = exports.getAllPrivateBlogsController = exports.getAllBlogsController = exports.deleteBlogController = exports.createBlogController = void 0;
const CONSTANTS_1 = require("../../CONSTANTS");
const db_1 = require("../../db");
const apiResponseUtil_1 = require("../../utils/apiResponseUtil");
const asynhandlerUtil_1 = require("../../utils/asynhandlerUtil");
const slug_and_str_generator_1 = require("../../utils/slug_and_str_generator");
// * create blog post controller
const createBlogController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, blogTitle, blogDescription, blogThumbnail, blogThumbnailAuthor, blogOverView, } = req.body;
    const randomId = (0, slug_and_str_generator_1.generateRandomStrings)(10);
    const blogSlug = (0, slug_and_str_generator_1.generateSlug)(blogTitle);
    const blogPost = yield db_1.prisma.blogPost.create({
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
        .status(CONSTANTS_1.CREATED)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.CREATED, `${blogPost.author.fullName || "You"} have created this post successfully`, blogPost));
}));
exports.createBlogController = createBlogController;
// * get all blogpost controller
const getAllBlogsController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const pageLimit = Number(limit);
    if (isNaN(pageNumber) ||
        isNaN(pageLimit) ||
        pageNumber <= 0 ||
        pageLimit <= 0) {
        throw { status: 400, message: "Invalid pagination parameters!!" };
    }
    const skip = (pageNumber - 1) * pageLimit;
    const take = pageLimit;
    const blogs = yield db_1.prisma.blogPost.findMany({
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
    const totalBlogs = yield db_1.prisma.blogPost.count();
    const totalPages = Math.ceil(totalBlogs / pageLimit);
    const totalPublicBlogs = blogs.length;
    const hasNextPage = totalPages > pageNumber;
    const hasPreviousPage = pageNumber > 1;
    const pagination = {
        hasNextPage,
        hasPreviousPage,
    };
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "All Blogs data fetched successfully", { blogs }, {
        totalPages,
        totalPublicBlogs,
        totalBlogs,
        pagination,
    }));
}));
exports.getAllBlogsController = getAllBlogsController;
// * Fetch Home page latest blogs
const getHomePageBlogs = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the latest 6 public blogs
    const blogs = yield db_1.prisma.blogPost.findMany({
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
    return res.json((0, apiResponseUtil_1.apiResponse)(200, "Latest Blogs fetched successfully", { blogs }));
}));
exports.getHomePageBlogs = getHomePageBlogs;
// * get single blogpost controller
const getSingleBlogController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogSlug } = req.params;
    const blog = yield db_1.prisma.blogPost.findUnique({
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
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `single blog post's data fetched successfully`, blog));
}));
exports.getSingleBlogController = getSingleBlogController;
// * update blog controller
const updateBlogController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogSlug: slug } = req.params;
    const { blogTitle, blogDescription, blogThumbnail, blogThumbnailAuthor, blogOverView, isPublic, } = req.body;
    const currentBlog = yield db_1.prisma.blogPost.findUnique({
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
        return res.status(404).json((0, apiResponseUtil_1.apiResponse)(404, "Blog not found", {}));
    }
    const updateData = {};
    if (currentBlog.blogTitle !== blogTitle) {
        updateData.blogTitle = blogTitle;
        const randomId = (0, slug_and_str_generator_1.generateRandomStrings)(10);
        const newBlogSlug = (0, slug_and_str_generator_1.generateSlug)(blogTitle);
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
        const updatedBlog = yield db_1.prisma.blogPost.update({
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
            .status(CONSTANTS_1.OK)
            .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${updatedBlog.author.fullName || "You've"} updated this blog`, updatedBlog));
    }
    else {
        return res
            .status(200)
            .json((0, apiResponseUtil_1.apiResponse)(200, "No changes detected", currentBlog));
    }
}));
exports.updateBlogController = updateBlogController;
// * delete blog controller
const deleteBlogController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogSlug } = req.params;
    const deletedUser = yield db_1.prisma.blogPost.delete({
        where: { blogSlug },
        select: {
            blogTitle: true,
            blogSlug: true,
            author: { select: { fullName: true } },
        },
    });
    return res
        .status(CONSTANTS_1.OK)
        .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, `${deletedUser.author.fullName || "You've"} deleted this blogPost`, deletedUser));
}));
exports.deleteBlogController = deleteBlogController;
// * Search in Blog Controller
const searchBlogController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q)
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "Search query is required!!" };
    const searchQuery = q;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (isNaN(pageNumber) ||
        isNaN(limitNumber) ||
        pageNumber <= 0 ||
        limitNumber <= 0) {
        throw { status: CONSTANTS_1.BAD_REQUEST, message: "Invalid pagination parameters!!" };
    }
    const skip = (pageNumber - 1) * limitNumber;
    const take = limitNumber;
    // Query for fetching blogs
    const blogs = yield db_1.prisma.$queryRaw `
  SELECT * FROM "BlogPost"
  WHERE "isPublic" = true
  AND to_tsvector('english', "blogTitle" || ' ' || "blogDescription" || ' ' || "blogSlug") @@ plainto_tsquery('english', ${searchQuery})
  ORDER BY "createdAt" DESC
  OFFSET ${skip} LIMIT ${take}
`;
    const totalBlogCount = yield db_1.prisma.$queryRaw `
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
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "Data searched successfully", { blogs }, {
        totalPages,
        totalPublicBlogs: blogCount, //TODO: fix this later
        totalBlogs: blogCount,
        pagination,
    }));
}));
exports.searchBlogController = searchBlogController;
//////////////////////////// * Private Blogs *//////////////////
const getAllPrivateBlogsController = (0, asynhandlerUtil_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const privateBlogs = yield db_1.prisma.blogPost.findMany({
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
            .status(CONSTANTS_1.NOT_FOUND)
            .json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.NOT_FOUND, "No private Blog found", privateBlogs));
    }
    return res.status(CONSTANTS_1.OK).json((0, apiResponseUtil_1.apiResponse)(CONSTANTS_1.OK, "All private blogs data fetched successfully", {
        blogs: privateBlogs,
    }));
}));
exports.getAllPrivateBlogsController = getAllPrivateBlogsController;
