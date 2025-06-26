const express = require('express');
const userRouter = require("./users");
const adminRouter = require("./admin");
const eventRouter = require('./event');
const bookingRouter = require("./booking");

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index",{title:"Welcome to the API"})
})

router.use("/users",userRouter);

router.use("/admin",adminRouter);

router.use("/event",eventRouter);

router.use("/booking",bookingRouter);

module.exports = router;

