import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const AdminSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  ph_no: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
    required: true,
  },
});

const Admin = model("admin", AdminSchema);

export default Admin