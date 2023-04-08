

const fetchPostsByUserIdController = async (req, res, next) => {};

const createPostByUserIdController = async (req, res, next) => {
    console.log(req.body)
};

const editPostByIdController = async (req, res, next) => {};

const deletePostByIdController = async (req, res, next) => {};


const fetchLikesByPostIdController = async (req, res, next) => {};


const fetchDislikesByPostIdController = async (req, res, next) => {};


const fetchSharesByPostIdController = async (req, res, next) => {};


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
};
