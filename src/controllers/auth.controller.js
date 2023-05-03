import User from "../models/user.model.js";
import userSchemaValidation from "../validation/userschema.validation.js";
import createError from "http-errors";
import jwt_helper from "../helpers/jwt_helper.js";
import formatter from "../helpers/formatter.js";

const { userAuthSchema } = userSchemaValidation;
const { signAccessToken, signRefreshToken, verifyRefreshToken } = jwt_helper;
const {JoiErrorFormatter} = formatter

const userRegisterController = async (req, res, next) => {
  try {
    const result = await userAuthSchema.validateAsync(req.body);
    const doesExists = await User.findOne({ email: result.email });
    
    //console.log(doesExists);
    if (doesExists) {
      throw createError.Conflict(`${result.email} is an existing user`);
    }

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    //console.log(error)
    // if error is thrown by joi schema validation append to the current error
    if (error.isJoi) {
      // const message = {};
      // error.details?.forEach((item) => {
      //   message[item.context.label] = item.message?.replaceAll('"', "");
      // });
      // error.message = message;
      // error.status = 422;
      JoiErrorFormatter(error)
    }
    
    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    //const result = await userAuthSchema.validateAsync(req.body);
    const result = req.body
    console.log("req", req.body)
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("user not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Email/Password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error)
    if (error.isJoi) {
      return next(createError.BadRequest("invalid Email/Password"));
    }
    next(error);
  }
};

const userRefreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

export default {
  userRegisterController,
  userLoginController,
  userRefreshTokenController,
};
