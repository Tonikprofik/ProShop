import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization)

  // Check Bearer Token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      try {
          //get Token, split to Array - Bearer[0], Token [1]
          token = req.headers.authorization.split(' ')[1]

          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          console.log(decoded);
          next()
      } catch (error) {}
  }
  
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }

  next();
});

export { protect };
