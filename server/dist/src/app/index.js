"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const authRouter_1 = require("../routers/authRouter");
const blogRouter_1 = require("../routers/blogRouter");
const app = (0, express_1.default)();
exports.app = app;
const corsOptions = {
    //TODO: check this if error related to cors
    origin: [
        "https://zlaam.vercel.app",
        "https://zlaam.netlify.app",
        "http://localhost:3000",
        "http://192.168.100.39:3000",
    ],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.get("/", (req, res) => {
    return res.send("<h1>Welcome Zlaam</h1>");
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//* Routes
app.use("/api/v2/auth", authRouter_1.authRouter);
app.use("/api/v2/blog", blogRouter_1.blogRouter);
// * Error handlers
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
