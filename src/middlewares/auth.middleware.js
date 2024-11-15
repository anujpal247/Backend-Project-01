import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // get token from cookies or header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    console.log(token);
    // check for token
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    // verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // find user
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }
    // add user to req obj
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token");
  }
});

export default verifyJWT;
