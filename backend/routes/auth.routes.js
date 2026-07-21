import express from "express";
import {userRegister, userLogin, logOut, verifyEmail, resetPassword, forgotPassword} from "../controller/auth.controller.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logOut);
router.get(
    "/verify-email/:token",
    verifyEmail);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;