const express = require('express');
const { userMiddleware, adminMiddleware } = require('../middleware/Middlewares');
const { getAllBookings, bookTicket, cancelTicket,getAllBookingsOnEvent } = require('../controller/bookingController');
const router = express.Router();

// get all users http://localhost:8000/api/booking/
router.get("/", userMiddleware, getAllBookings)

// get all users http://localhost:8000/api/booking/book-now
router.post("/book-now", userMiddleware, bookTicket)

// http://localhost:8000/api/booking/cancel-ticket/bookId
router.put("/cancel-ticket/:bookId", userMiddleware, cancelTicket)

// get all users http://localhost:8000/api/booking/event/:eventId
router.get("/event/:eventId", adminMiddleware, getAllBookingsOnEvent)

module.exports = router;