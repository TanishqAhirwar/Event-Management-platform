const express = require('express');
const { adminMiddleware } = require('../middleware/Middlewares');
const { getAllEvents, createEvent, cancelEvent,deleteEvent,editEvent, getMyEvents } = require('../controller/eventController');
const router = express.Router();

// http://localhost:8000/api/event/
router.get("/", getAllEvents)

// http://localhost:8000/api/event/create
router.post("/create", adminMiddleware, createEvent)

// http://localhost:8000/api/event/cancel/:eventId
router.put("/cancel/:eventId", adminMiddleware, cancelEvent)

// http://localhost:8000/api/event/delete/:eventId
router.put("/delete/:eventId", adminMiddleware, deleteEvent)

// http://localhost:8000/api/event/delete/:eventId
router.put("/edit/:eventId", adminMiddleware, editEvent)

// get all users http://localhost:8000/api/event/myevents/:creatorId
router.get("/my-events", adminMiddleware , getMyEvents)

module.exports = router;