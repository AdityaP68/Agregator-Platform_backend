import jwt from "jsonwebtoken";
import createError from "http-errors";
import config from "../config/config.js";

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = config.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "3 days",
      issuer: "baracuda.com",
      audience: userId,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = config.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "5 days",
      issuer: "baracuda.com",
      audience: userId,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

const verifyRefreshToken =async(refreshToken)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, payload)=>{
            if(err) return reject(createError.Unauthorized())
            const userId = payload.aud

            resolve(userId)
        })
    })
}

export default {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
