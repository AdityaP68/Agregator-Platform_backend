import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  ph_no: {
    type: Number,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip_code: {
    type: Number,
  },
  description: {
    type: String,
  },
  date_of_birth: {
    type: Date,
  },
  gender: {
    type: String,
  },

  profile_name: {
    type: String,
  },
  profile_image: {
    type: String,
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
UserSchema.methods.isValidPassword = async function(password){
  try{
    return await bcrypt.compare(password, this.password)
  }catch(error){
    next(error)
  }
}

const User = model("user", UserSchema);

export default User;
