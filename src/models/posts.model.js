import mongoose, { Schema, model } from "mongoose";

const PostSchema = Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
    dislikes: {
      type: Number,
      default: 0,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    shares: {
      type: Number,
      required: true,
      default: 0,
    },
    saves: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [{ comment: String }],
    media: {
      type: {
        type: String,
        enum: ["image", "video"],
      },
      url: {
        type: String,
        required: true,
      },
    },
    post_type: {
      type: String,
      enum: [
        "text/video",
        "text/image",
        "text",
        "fundraiser",
        "resource-pooling",
      ],
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamp: true }
);



const Posts = model("posts", PostSchema);


export default Posts;
