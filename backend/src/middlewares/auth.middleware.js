import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
/* 

Task : Create a Auth Middleware
> This middleware is used to create a protected req , i.e only allow user to send the req to access protected service if  he is loggedIn , 
> Here we dont make user to loggedIn again and again  , we use accessToken
> As if user currently loggedIn hoga to uske browser cookie me iss smay accessToken bhi store hoga 
> This middleware is used for verfying is user is still authenticated or not to access the protected resource .
> for verfying we use accessToken 
> means is user have accessToken or not 
> If hai to expired to nhi hai 

> Now to get accessToken we get it from our cookies , that we have sent to client at login

> To get cookies use req.cookies

> const token = 
req.cookies?.accessToken  // use for web apps
||  req.header("Authorization")?.replace("Bearer " , ""); // for mobile apps jha ham cookie nhi header ka use 
> and mainly ham data jo cookie me bhjete hai , usse yha header me bhejte hai -> Authorization : Bearer <token> | this way


Task :
> fetch token from cookies
> check if token present or not , if  not throw unauthorized req 401 err
> decode the token, here as we use jwt verify so here if token is valid then only it give paypload else erro dega jisme hamne catch bloak me catch karlenge
> find user from db with _id present in payload data 
> then add user in req , req.user = user
> finally call next() middleware


1. Get token
        ↓
2. Token exists?
        ↓
3. jwt.verify()
        ↓
4. Find user
        ↓
5. User exists?
        ↓
6. req.user = user
        ↓
7. next()

*/
const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // 1. Fetch token from req
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // 2. Check if token present or not
    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    //3. Get payload data by Decode token by verify the token
    // Now to verify token
    // we use jwt.verify method
    // where we pass two things
    // token get from user and secret key
    // it going to generate new token and match there signature if
    // valid : return user payload which we have upload while create token
    // else error , for expiry : TokenExpireError , for invalid signature : JsonWebTokenError
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    //4. Find user , same time remove sensitive info
    // After get decoded info we have also _id  , so now with this id retrieve user doc from db
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    //5.
    // if user not found , send err , Invalid Token
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired");
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    }

    throw error;
  }
});

export default verifyJWT;
