import mongoose from "mongoose";
import User from "../models/user.model.js";
import userschemaValidation from "../validation/userschema.validation.js";
import createError from "http-errors";

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      throw createError.BadRequest("invalid user id");
    const user = await User.findOne({ _id: userId });
    if (!user) throw createError.NotFound("user not found");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userDetails = req.body
    if (!mongoose.Types.ObjectId.isValid(userId))
      throw createError.BadRequest("invalid user id");
    const user = await User.findOne({ _id: userId });
    if(!user) throw createError.NotFound('user not found')

    // if user found in the database update the provided details 
    
  } catch (error) {
    next(error);
  }
};

const getUserList = async (req, res, next) => {};

const deleteUser = async (req, res, next) => {};

export default {
  getUserById,
  updateUserById,
  getUserList,
  deleteUser,
};
