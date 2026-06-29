import express from "express";
import {userRegister,userLogin,logOut} from "../controller/auth.controller.js"

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(logOut);

export default router;