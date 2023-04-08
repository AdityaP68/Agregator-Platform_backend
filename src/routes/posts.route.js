import { Router } from "express";
import postsController from "../controllers/posts.controller.js";

const router = Router();

//Controllers
const {
  fetchPostsByUserIdController,
  createPostByUserIdController,
  editPostByIdController,
  deletePostByIdController,
  fetchLikesByPostIdController,
  fetchDislikesByPostIdController,
  fetchSharesByPostIdController,
  incrementLikesCountController,
  incrementDislikesCountController,
  incrementSharesCountController,
  fetchCommentsByPostIdController,
  createCommentByPostIdController,
  editCommentByIdController,
  deleteCommentByIdController
} = postsController;

//Posts Routes
router.get("/all/:userId", fetchPostsByUserIdController);
router.post("/create/:userId", createPostByUserIdController);
router.patch("/edit/:postId", editPostByIdController);
router.delete("/delete/:postId", deletePostByIdController);

//Socials Routes
router.get("/likes/:postId", fetchLikesByPostIdController);
router.get("/dislikes/:postId", fetchDislikesByPostIdController);
router.get("/shares/:postId", fetchSharesByPostIdController);
router.patch("/likes/upcount/:postId", incrementLikesCountController);
router.patch("/dislikes/upcount/:postId", incrementDislikesCountController);
router.patch("/shares/upcount/:postId", incrementSharesCountController);
router.patch("/likes/downcount/:postId", fetchCommentsByPostIdController);
router.patch("/dislikes/downcount/:postId", createCommentByPostIdController);

//Comments Routes
router.get("/comments/:postId", editCommentByIdController);
router.post("/comments/create/:userId", deleteCommentByIdController);
router.patch("/comments/edit/:postId/:commentId");
router.delete("/comments/delete/:postId/:commentId");

//----------------------------------------------------------------------------------------------

// router.get("/posts/:userId", fetchPostsByUserIdController);
// router.post("/posts/:userId", createPostByUserIdController);
// router.patch("/posts/:postId/edit", editPostByIdController);
// router.delete("/posts/:postId", deletePostByIdController);

// // Socials Routes
// router.get("/posts/:postId/likes", fetchLikesByPostIdController);
// router.get("/posts/:postId/dislikes", fetchDislikesByPostIdController);
// router.get("/posts/:postId/shares", fetchSharesByPostIdController);
// router.patch("/posts/:postId/likes", incrementLikesCountController);
// router.patch("/posts/:postId/dislikes", incrementDislikesCountController);
// router.patch("/posts/:postId/shares", incrementSharesCountController);

// // Comments Routes
// router.get("/posts/:postId/comments", fetchCommentsByPostIdController);
// router.post("/comments/posts/:postId", createCommentByPostIdController);
// router.patch("/comments/:commentId/edit", editCommentByIdController);
// router.delete("/comments/:commentId", deleteCommentByIdController);

export default router