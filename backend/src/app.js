import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// App configuration
const app = express();

// Global middleware
// 1) Cors middleware
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
const allowedOrigins = process.env.CORS_ORIGINS.split(",");

// For IP whitelist at time of development
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// 2) Req Data Configuration
// Use to set in Advance
// req data -> must be sent always in json form , with limit of 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// 3) Url encoded data Configuration
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// 4) Middleware For setting static folder
// Public -> temp local storage
// we have to specify it , that if any request comes for static file then go to public folder and find it
app.use(express.static("public"));

// 5) Cookie-Parser : For reading cookie from req which sent by browser
app.use(cookieParser());

// Custom route
// Route import
import cartRouter from "./routes/cart.routes.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";

//  Global Error Middleware
import errorHandler from "./middlewares/error.middleware.js";

// Route Setup

// user route
app.use("/api/v1/users", userRouter);

// food route
app.use("/api/v1/foods", foodRouter);

// cart route
app.use("/api/v1/carts", cartRouter);

// Global Error Handler (Always the LAST middleware)

app.use(errorHandler);

export { app };
