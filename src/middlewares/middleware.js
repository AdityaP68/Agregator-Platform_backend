import jwt from "jsonwebtoken";
import createError from "http-errors";
import config from "../config/config.js";

const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized());
  }
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log(token);
  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
};

export default { verifyAccessToken };
