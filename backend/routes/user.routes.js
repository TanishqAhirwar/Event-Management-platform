import express from "express";
import {isAuthenticated} from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/admin.middileware.js";
import { updateUserRole } from "../controller/user.controller.js";

const router = express.Router();

router.patch("/:id/updateUserRole", isAuthenticated, isAdmin, updateUserRole
);

export default router;