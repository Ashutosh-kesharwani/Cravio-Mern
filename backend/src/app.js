import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
const app = express();

// GLOBAL MIDDLEWARE

// 1. CORS
const allowedOrigins = process.env.CORS_ORIGINS;
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, etc.) || if origin then must be in allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

//2. Json Configuration
// req -> body -> data must be always send in json
app.use(
  express.json({
    limit: "16kb",
  })
);

//3. URL encoded configuration
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

//4. Local Storage [Static file setup]
app.use(express.static("public"));

//5. Cookie Parser
app.use(cookieParser());

// Custom Route

// Route import
import userRouter from "./routes/user.routes.js";

// Route Setup
app.use("/api/v1/users", userRouter);

// Global-Error Middleware
app.use(errorHandler);

export { app };
