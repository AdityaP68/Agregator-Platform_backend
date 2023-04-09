import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
      type: Date,
      default: Date.now
  },
  socials: {
      likes: {
          type: Number,
          default: 0
      },
      dislikes: {
          type: Number,
          default: 0
      },
      views: {
          type: Number,
          default: 0
      },
      shares: {
          type: Number,
          default: 0
      }
  },
  is_media_attachment: {
      type: Boolean,
      default: false
  },
  media: {
      media_type: {
          type: String
      },
      url: {
          type: String
      }
  },
  updated_at: {
      type: Date,
      default: Date.now
  }
});


const Posts = model("posts", PostSchema);


export default Posts;
