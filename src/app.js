import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// built in middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// third party middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

// import routes
import UserRouter from "./routes/user.routes.js";

// routes declaration
// app.use("prefix", Router)
app.use("/api/v1/users", UserRouter);   // http://localhost:8000/api/v1/users/

export default app;
