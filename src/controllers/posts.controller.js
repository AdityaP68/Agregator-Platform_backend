import Posts from "../models/posts.model.js";
import PostsSchemaCheck from "../validation/postsSchema.validation.js";
import User from "../models/user.model.js";
import createError from "http-errors";
import mongoose from "mongoose";

const { PostSchemaValidator, PostUpdateValidator } = PostsSchemaCheck;

const getAllPostsController = async (req, res, next) => {
  try {
    // Fetch all posts
    const posts = await Posts.find();

    // Return the posts
    return res.status(200).json({ count: posts?.length, posts });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

const createPostByUserIdController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { title, description, post_type, resource_type, resource_goal } =
      req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("this is req.body", req.body);
    // Create a new Post instance
    const post = new Posts({
      title,
      description,
      post_type,
      created_by: user,
      resource: {
        resource_type,
        resource_goal,
      },
    });

    console.log(post);

    await post.save();

    // Save the post to the database
    // await post.save();

    console.log(post);

    // Return a success response
    return res.status(201).json({
      message: "Post created successfully",
      post: post
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    console.log(error.message);
    next(error);
  }
};

const editPostByIdController = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const result = await PostUpdateValidator.validateAsync(req.body);

    const post = await Posts.findOne({ _id: postId });
    if (!post) {
      console.log("doesnt exist");
      throw createError.NotFound("This post doesnt exists");
    }
    if (userId !== String(post.created_by)) {
      throw createError.MethodNotAllowed("Invalid operation by this user");
    }

    if (result.title) post.title = result.title;
    if (result.description) post.description = result.description;
    if (result.media) post.is_media_attachment = true;
    if (result.media?.media_type)
      post.media.media_type = result.media.media_type;
    if (result.media?.url) post.media.url = result.media.url;
    post.updated_at = new Date();

    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deletePostByIdController = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;

    const post = await Posts.findOne({ _id: postId });
    if (!post) {
      console.log("doesnt exist");
      throw createError.NotFound("This post doesnt exists");
    }
    if (userId !== String(post.created_by)) {
      throw createError.MethodNotAllowed("Invalid operation by this user");
    }

    await post.delete();
    res.json({
      status: 204,
      message: "Post deleted successfully",
      deleted_post: { ...post },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// const fetchLikesByPostIdController = async (req, res, next) => {};

// const fetchDislikesByPostIdController = async (req, res, next) => {};

// const fetchSharesByPostIdController = async (req, res, next) => {};

const incrementLikesCountController = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;
    const { action } = req.query;

    const post = Posts.findOne({ _id: postId });
    if (!post) {
      throw createError.NotFound("No post exist with id");
    }
    // if (String(post.created_by) !== userId) {
    //   throw createError.MethodNotAllowed("Invalid operation by this user");
    // }
    if (action) {
      if (action === "upcount" && post?.socials?.likes) {
        post.socials.likes += 1;
      }
    }
    res.json({ status: 204, message: "The like count has been incremented" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const incrementDislikesCountController = async (req, res, next) => {};

const incrementSharesCountController = async (req, res, next) => {};

const fetchCommentsByPostIdController = async (req, res, next) => {};

const createCommentByPostIdController = async (req, res, next) => {};

const editCommentByIdController = async (req, res, next) => {};

const deleteCommentByIdController = async (req, res, next) => {};

export default {
  getAllPostsController,
  createPostByUserIdController,
  editPostByIdController,
  deletePostByIdController,
  // fetchLikesByPostIdController,
  // fetchDislikesByPostIdController,
  // fetchSharesByPostIdController,
  incrementLikesCountController,
  incrementDislikesCountController,
  incrementSharesCountController,
  fetchCommentsByPostIdController,
  createCommentByPostIdController,
  editCommentByIdController,
  deleteCommentByIdController,
};
