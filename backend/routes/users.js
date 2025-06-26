const express = require('express');
const multer = require('multer');
const { userRegister, userLogin, getUserById, uploadProfile } = require('../controller/userController');
const { userMiddleware } = require('../middleware/Middlewares');
const {storage,profileFiter} = require('../config/multer');
const router = express.Router();

const upload = multer({storage,fileFilter : profileFiter,limits : { fileSize : 1024 * 1024 }});

// get all users http://localhost:8000/api/users
router.get("/", userMiddleware, getUserById)

// http://localhost:8000/api/users/register
router.post("/register", userRegister)

// http://localhost:8000/api/users/login
router.post("/login", userLogin)

// http://localhost:8000/api/users/upload-profile
router.put("/upload-profile", userMiddleware, upload.single("profile"), uploadProfile)


module.exports = router;
