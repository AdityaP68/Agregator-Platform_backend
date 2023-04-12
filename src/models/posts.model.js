import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    socials: {
      likes: {
        count: {
          type: Number,
          default: 0,
        },
        likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      dislikes: {
        count: {
          type: Number,
          default: 0,
        },
        dislikedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      views: {
        count: {
          type: Number,
          default: 0,
        },
        viewedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
      shares: {
        count: {
          type: Number,
          default: 0,
        },
        sharedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
      },
    },
    is_media_attachment: {
      type: Boolean,
      default: false,
    },
    media: {
      media_type: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);


const Posts = model("posts", PostSchema);

export default Posts;
