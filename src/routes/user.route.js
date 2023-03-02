import { Router } from "express";
import userController from "../controllers/user.controller.js";
import middleware from "../middlewares/middleware.js";

const router = Router();
const { verifyAccessToken } = middleware;

router.get("/:id", userController.getUserById);
router.patch("/update/:id", userController.updateUserById);
router.delete("/delete/:id", userController.deleteUser);

export default router;
