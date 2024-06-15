import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { errorHandler, notFoundHandler } from "../middlewares/errorMiddleware";
import { authRouter } from "../routers/authRouter";
const app: Express = express();
const corsOptions = {
  //TODO: check this if error related to cors
  origin: ["http://localhost:3000", "http://192.168.100.39:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//* Routes
app.use("/api/v2/auth", authRouter);
// * Error handlers
app.use(notFoundHandler);
app.use(errorHandler);
export { app };
