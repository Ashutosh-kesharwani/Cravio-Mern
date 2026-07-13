import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/* 
TASK : Register Controller Task
>get data from user req
> check if all req are present
> check if all field required are present or not
> Check if user with same credentials already exist or not , if exist throw err , else proceed further
> Now retrieve the file data , if we have send in req.files and then extract localpath check validity and then upload on cloudinary , again check validity of res , 
> Finally create user document with create , or new 
> remove sensitive field like refreshToken , password before send the response
> again check if user doc created  successfully or not , if not throw 500 err
> If all are correct then finally send the response



*/

const options = {
  httpOnly: true,
  secure: false, // on localhost use this not true / on HTTP localhost, cookies won't be stored.
  sameSite: "lax",
};

// Helper func
/* 
TASK : Generate Access and RefreshToken
> Fetch user from db with given id
[As we have already created generateRefreshToken , generateAccessToken schema method in user model , so to call these method it only work with document , so for that we first find document then call] 
> generate refresh and accessToken
> update refreshToken field in db , use save and  validateBeforeSave: false
> return them
*/
const generateAccessAndRefreshToken = async (userId) => {
  try {
    //1. Fetch user from db , curr user
    const user = await User.findById(userId);

    //2. Generate access and refresh
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //3. Update refreshToken field in db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    //4. return both
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      `UserController :: generateAccessAndRefreshToken ::  Something went wrong while generating Refresh or Access Token :: ${error}`
    );
    throw new ApiError(
      500,
      `Something went wrong while generating Refresh or Access Token`
    );
  }
};

// Authetication Controller

// 1. Register Controller
const registerUser = asyncHandler(async (req, res) => {
  // 1. fetch user data given from req
  const { name, email, password } = req.body;
  // console.table({name, email, password});

  //2. check if all req field are present or not
  // Two things to check
  // i. if given field is undefined or not for that !field
  // ii. if its a empty value i.e field.trim()===""
  // 2 ways -> cond -> !field || field.trim()==="" / or short -> !field?.trim() , as this is short way and check both udefined and empty space value
  if ([name, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All required fields are mandatory");
  }

  //3. Check if user already exist or not , with unique field like email , username
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // 4. Create a user document :
  // create internally work like [ doc+ save]
  // so it automatically calls pre save middleware and all validation also
  const user = await User.create({
    name,
    email,
    password,
  });

  //5. Remove sensitive information like password , refreshToken
  // As select method only with a query object so find the created user again with its id
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //6. Check user has created in db or not if not throw server error
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering user , Please try again"
    );
  }

  //  7. Send the response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

//2. Login Controller
/*

2. Login Controller
Task :
> Fetched data from req.body
> check validity
> verify credentials like username , email and password
> generate token refresh , accesss
> Remove sensitive informaton liek pasword , refreshToken before sending the res
> send the response 
> In res we send token in form of cookie , data , statusCode and all..
> in cookie : we sent 3 things key , its value , and option
> in data we sent two things user:userData , accessToken
*/
const loginUser = asyncHandler(async (req, res) => {
  //1. Fetch data from req.body
  const { email, password } = req.body;
  // console.table({ email, password });

  //2. Check validity
  if (!email?.trim() || !password?.trim()) {
    throw new ApiError(400, "Required fields are mandatory");
  }

  //3. Find user with credentials like email , username
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //4. Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(400, "Username or password is invalid");
  }

  // 5. Generate Access and refresh Token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // 6. Remove sensitive information
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //7. Send the response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User LoggedIn Successfully"
      )
    );
});

// 3. Logout User
/* 
Task :

> 1) Create a auth middleware : verifyJWT
> Now as for logout user , and to reset refresh and accessToken we need , user id  \
> But logout we dont send as by form  
> so for that we create a custom middleware for that purpose 
> like auth.middleware.js , to get access of user._id


> LogOut simply means reset both Token from everywhere they are present 
> RefreshToken : present in db and in cookie [So for db we have to find user and update it , so for that we use req.user._id]
> AccessToken : present in cookie only 

> For cookie clear we use clearCookie(key,options) , at res directly 
*/
const logoutUser = asyncHandler(async (req, res) => {
  // 1. Reset refreshToken from db
  const user = await User.findByIdAndUpdate(
    req?.user?._id, // filter
    {
      // update field , we use set operator to update any field
      // use null to reset refreshToken , as undefined get ignore in update by mongoose sometime
      $set: { refreshToken: null },
    },
    {
      returnDocument: "after", // use to return updated document
    }
  );

  //2. Send response at that time clear cookies data
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, user, "User Logout successfully"));
});

/* 


Task : RefreshAccessToken
> Fetch refreshToken from cookie or header
> check if we get token or not
> verify token with verify method
> then as in refresh payload we pass id at time of creation so , use that id and find user
> generate new accessToken and refreshToken again with method 
> send in response with cookie and with data if want 

### **Refresh Token Rotation (Recommended Production Practice)**

**What is it?**

Every time the client uses a valid **Refresh Token** to get a new **Access Token**, the server also generates a **new Refresh Token**, stores it in the database, and invalidates the old one.

```text
Login
   ↓
Access Token + Refresh Token

↓

Refresh API

↓

New Access Token + New Refresh Token

↓

Old Refresh Token ❌ Invalid
```
---
### Why is it recommended?

* ✅ Improves security.
* ✅ Invalidates the old refresh token after every use.
* ✅ Prevents replay attacks if an old refresh token is stolen.
* ✅ Ensures only the **latest refresh token** stored in the database is valid.
* ✅ Widely used in production applications by modern authentication systems.

**In short:**
**Refresh Token Rotation** means **issuing a new refresh token every time the old one is used**, making previously issued refresh tokens unusable and significantly improving authentication security.


Yes, the **route is correct**, but one comment needs correction.

```js
// Refresh Access Token
// No verifyJWT middleware is used because the purpose of this endpoint
// is to verify the Refresh Token itself and issue new tokens.
// Authentication here is done using the Refresh Token, not the Access Token.
router.route("/refresh-token").post(refreshAccessToken);
```

---

## Where is this API called?

This endpoint is called **when the Access Token expires**.

### Flow

```text
User Login
      │
      ▼
Access Token (15 min)
Refresh Token (7 days)
      │
      ▼
User accesses protected APIs
      │
      ▼
Access Token expires
      │
      ▼
Protected API returns 401 Unauthorized
      │
      ▼
Frontend calls

POST /api/v1/users/refresh-token
      │
      ▼
Backend verifies Refresh Token
      │
      ▼
Generates NEW Access Token
Generates NEW Refresh Token
      │
      ▼
Stores NEW Refresh Token in DB
      │
      ▼
Sends new cookies
      │
      ▼
Frontend retries the original API request
```

---

## Who calls this endpoint?

**Frontend** (React/Axios).

Usually, this is done automatically using an Axios interceptor.

Example:

```text
User clicks "View Profile"

↓

GET /api/v1/users/profile

↓

401 Unauthorized (Access Token expired)

↓

POST /api/v1/users/refresh-token

↓

New Access Token received

↓

Retry GET /api/v1/users/profile

↓

200 OK
```

The user never notices the token refresh happening.

---

## Should `verifyJWT` middleware be used?

**No.**

Reason:

```text
verifyJWT

↓

Needs Access Token

↓

But Access Token has already expired

↓

Request would fail before reaching the controller.
```

So the **Refresh Token** is used to authenticate this endpoint instead.

---

### Production Note

In most production applications:

* `verifyJWT` protects **all other private routes**.
* `/refresh-token` is the **only authentication-related route** that is intentionally **not protected by `verifyJWT`**, because it performs its own authentication using the refresh token.


---------------------------

**No.** ❌ It does **not** happen automatically.

You have to **explicitly configure Axios** (usually using an Axios interceptor) to call the refresh token endpoint when it receives a **401 Unauthorized** response.

Flow:

```text
Protected API
      ↓
401 Unauthorized
      ↓
Axios Interceptor
      ↓
POST /refresh-token
      ↓
New Access Token
      ↓
Retry Original Request
```

✅ So **Axios can automate it**, **but only after you implement the interceptor**. It is **not automatic by default**.


-----------------


The production way is to use an **Axios Response Interceptor**.

## 1. Create Axios Instance

```js
// api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",

  withCredentials: true,
});

export default api;
```

---

## 2. Add Response Interceptor

```js
import api from "./api";

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Access Token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Call refresh token API
      await api.post("/users/refresh-token");

      // Retry original request
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
```

---

## 3. Make Normal API Calls

```js
const response = await api.get("/users/profile");
```

That's it.

---

## What happens internally?

```text
User

↓

GET /users/profile

↓

401 Unauthorized

↓

Axios Interceptor catches 401

↓

POST /users/refresh-token

↓

Backend verifies Refresh Token

↓

New Access Token + Refresh Token

↓

Cookies Updated

↓

Axios retries

GET /users/profile

↓

200 OK
```

The user doesn't notice anything.

---

## Where do we write this?

```text
src/

api/
   api.js
   axiosInterceptor.js

or

src/

utils/
   axios.js
```

Usually, you configure the interceptor once when creating your Axios instance.

### Summary

* ✅ You **do not** call `/refresh-token` manually every time.
* ✅ You configure an Axios interceptor **once**.
* ✅ Whenever any API returns **401**, the interceptor automatically:

  1. Calls `/refresh-token`.
  2. Gets new cookies/tokens.
  3. Retries the original request.
* ✅ This is the standard production pattern for React applications using JWT authentication.

*/

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    // 1. Fetch refreshToken from cookie sent by user in req
    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    //2. Check if token present or not
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    //3. Decode the token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    //4. Find user with id we get from payload
    const user = await User.findById(decodedToken._id);

    //5. Check if user present or not
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    //6. Check if token we get from user and one store in db match or not
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, " Refresh Token is expired or used");
    }

    //7. Finally generate new refresh and accessToken
    // Reason : here we also generate refreshToken called as Refresh Token Rotation
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // Here we dont have to update new refreshToken in db as we already do it in above generateAccessAndRefreshToken

    // 8. Send the response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
          },
          "Access Token refreshed successfully"
        )
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Refresh Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(
        401,
        "Refresh Token is invalid or has already been used"
      );
    }
    throw error;
  }
});

//------------------------------------------

// Get Controllers

// Get Curr User
/* 
Task :
> For curr user , as it is already store in our req.user , beacuse we use verifyJWT as it is a protected Api , so just send response directly
*/
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User fetched Successfully"));
});

export {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
};
