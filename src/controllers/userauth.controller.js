import User from "../models/user.model.js";
import userschemaValidation from "../validation/userschema.validation.js";
import createError from "http-errors";
import jwt_helper from "../helpers/jwt_helper.js";

const { userAuthSchema } = userschemaValidation;
const { signAccessToken, signRefreshToken, verifyRefreshToken } = jwt_helper;

const userRegisterController = async (req, res, next) => {
  console.log(req.body);
  try {
    // const { email, password } = req.body;
    const result = await userAuthSchema.validateAsync(req.body);

    const doesExists = await User.findOne({ email: result.email });
    console.log(doesExists);
    if (doesExists) {
      throw createError.Conflict(`${result.email} is an existing user`);
    }

    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) {
      error.status = 422;
    }
    next(error);
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const result = await userAuthSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("user not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Username/Password not valid");
    
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) {
      return next(createError.BadRequest("invalid Username/Password"));
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
