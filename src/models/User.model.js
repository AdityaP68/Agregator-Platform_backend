import { Schema, model } from "mongoose";

const UserSchema = Schema({
  email: {
    type: string,
    required: true,
    lowercase: true,
    unique: true,
  },
});

const User = model("user", UserSchema);

export default User;
