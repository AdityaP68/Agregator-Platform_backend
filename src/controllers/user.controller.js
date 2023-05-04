import mongoose from "mongoose";
import User from "../models/user.model.js";
import userschemaValidation from "../validation/userschema.validation.js";
import createError from "http-errors";

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    // Find the user by ID and populate the posts
        // Convert the string to a valid ObjectId
        const objectId = mongoose.Types.ObjectId(userId);

        // Find the user by ID
        const user = await User.findById(objectId);    


    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });

  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userDetails = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw createError.BadRequest("Invalid user ID");
    }
    const result = await User.updateOne({ _id: userId }, userDetails);
    if (result.nModified === 0) {
      throw createError.NotFound("User not found");
    }
    const updatedUser = await User.findOne({ _id: userId });
    res.json({
      message: "User details updated successfully",
      user: updatedUser,
    });

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
