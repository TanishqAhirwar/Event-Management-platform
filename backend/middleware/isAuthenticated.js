import jwt from "jsonwebtoken";
import ApiResponse from "../response/pattern.js";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(false, null, "User not Authenticated"));
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.id = decoded.userId;

    next();
  } catch (error) {
    return res
      .status(401)
      .json(new ApiResponse(false,null, "Invalid or Expired Token"));
  }
};