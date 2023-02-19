
import { Schema, model } from "mongoose";

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
    type: String
  },
  profile_image: {
    type:String,
  },
  ngo_preferences: {
    type: [String],
  },
  work_history: {
    type: String,
  },

  
});

const User = model("user", UserSchema);

export default User;
