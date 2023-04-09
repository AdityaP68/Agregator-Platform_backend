import Posts from "../models/posts.model.js";
import PostsSchemaCheck from "../validation/postsSchema.validation.js";
import createError from "http-errors";
import mongoose from "mongoose";

const { PostSchemaValidator, PostUpdateValidator } = PostsSchemaCheck;

const fetchPostsByUserIdController = async (req, res, next) => {};

const createPostByUserIdController = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await PostSchemaValidator.validateAsync(req.body);
    const doesExists = await Posts.findOne({
      title: result.title,
      created_by: result.created_by,
    });
    if (doesExists) {
      throw createError.Conflict(`This post already exists`);
    }
    const post = new Posts(result);
    const savedPost = await post.save();
    res.json({ creation: "success", ...savedPost._doc });
  } catch (error) {
    // if (error.isJoi) {
    //   console.log("joi error");
    // }
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

const incrementLikesCountController = async (req, res, next) => {};

const incrementDislikesCountController = async (req, res, next) => {};

const incrementSharesCountController = async (req, res, next) => {};

const fetchCommentsByPostIdController = async (req, res, next) => {};

const createCommentByPostIdController = async (req, res, next) => {};

const editCommentByIdController = async (req, res, next) => {};

const deleteCommentByIdController = async (req, res, next) => {};

export default {
  fetchPostsByUserIdController,
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
