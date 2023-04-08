import { Schema, model } from "mongoose";
import User from './user.model.js'

const UserActivitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
    donated_assets: {
    type: String,
  },
  recieved_assets: {
    type: String,
  },
  campaigns_conducted: {
    type: String,
  },
  campaigns_participated: {
    type: String,
  },
  ngo_preferences: {
    type: [String],
  },
  work_history: {
    type: String,
  },
});
