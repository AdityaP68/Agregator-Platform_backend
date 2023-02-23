import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    lowercase: true,
    required: true,
  },
  last_name: {
    type: String,
    lowercase: true,
    required: true,
  },
  ph_no: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    lowercase: true,
    required: true,
  },
  state: {
    type: String,
    lowercase: true,
    required: true,
  },
  zip_code: {
    type: Number,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// can throw error as its a middleware
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    next(error);
  }
};

const User = model("user", UserSchema);

export default User;
