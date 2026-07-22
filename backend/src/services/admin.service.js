import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

/* 
More optimized way 

> Create a query Object , then used i.e for the fields that are present add in qiery object 
const query = [];

if (email) query.push({ email });
if (username) query.push({ username });

const admin = await User.findOne({
  $or: query,
});
*/
export const getExistingAdmin = async ({ email, username }) => {
  const admin = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!admin) {
    throw new ApiError(401, AUTH_MESSAGES.ADMIN_INVALID_CREDENTIALS);
  }
  if (admin.role !== "admin") {
    throw new ApiError(403, AUTH_MESSAGES.FORBIDDEN);
  }
  return admin;
};

export const getSafeAdmin = async (adminId) => {
  return await User.findById(adminId).select("-password -refreshToken");
};
