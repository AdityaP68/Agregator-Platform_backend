import mongoose from "mongoose";
import User from "../models/user.model.js";
import userschemaValidation from "../validation/userschema.validation.js";
import createError from "http-errors";

const getUserById = async (req, res, next) => {
  //console.log(req.params.id);
  try {
    const userId = mongoose.Types.ObjectId(req.params.id);
    const user = await User.findOne(userId);
    if (!user) throw createError.NotFound("user not found");
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const user = req.body;
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
