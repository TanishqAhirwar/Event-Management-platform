const express = require('express');
const { getUserById } = require('../controller/userController');
const { adminMiddleware } = require('../middleware/Middlewares');
const { adminLogin } = require('../controller/adminController');
const router = express.Router();

// get all users http://localhost:8000/api/admin
router.get("/", adminMiddleware, getUserById)

// http://localhost:8000/api/admin/login
router.post("/login", adminLogin)


module.exports = router;
