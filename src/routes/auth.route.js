import { Router } from "express";

import userauthController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", userauthController.userRegisterController);
router.post("/login", userauthController.userLoginController);
router.post("/refresh-token", userauthController.userRefreshTokenController);

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;
