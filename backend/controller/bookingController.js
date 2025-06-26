const Event = require("../model/eventModel");
const bookingModel = require("../model/bookingModel");
const ApiResponse = require("../response/pattern");
const { Schema } = require("mongoose");

async function getAllBookings(req, res) {
    try {
        let bookings = await bookingModel.find({ attendee: req.data._id }).populate("attendee").populate("event");

        if (!bookings) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, bookings, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function bookTicket(req, res) {
    const { event, number_of_book_slots } = req.body;

    try {

        let findEvent = await Event.findOne({ _id: event, isCancel: false, isDeleted: false });

        if (!findEvent) {
            return res.json(new ApiResponse(false, null, "Event not Found or Cancelled"));
        }

        let todayTime = Date.now();
        let startDate = new Date(findEvent.on_booking_start)
        let eventDate = parseInt(findEvent.date)

        if (todayTime < startDate.getTime()) {
            return res.json(new ApiResponse(false, null, "Booking Not Start please Have some Patience Start Date Are Cooming Soon"));
        }

        if (todayTime > eventDate - 1000 * 60 * 48) {
            return res.json(new ApiResponse(false, null, "Booking date is Expired !"));
        }

        if (!(findEvent.available_slots >= number_of_book_slots)) {
            return res.json(new ApiResponse(false, null, `only ${findEvent.available_slots} slots are Available`));
        }

        if (number_of_book_slots > 5) {
            return res.json(new ApiResponse(false, null, "you Have book only maximum 5 slots"));
        }

        let booking = await bookingModel.create({
            event,
            receive_amount: parseInt(findEvent.per_slot_price) * parseInt(number_of_book_slots),
            number_of_book_slots,
            attendee: req.data._id
        });

        if (!booking) {
            return res.json(new ApiResponse(false, null, "Booking Failed"));
        }

        await Event.findByIdAndUpdate(event, { available_slots: findEvent.available_slots - number_of_book_slots });

        let bookDetails = await bookingModel.findById(booking._id).populate("attendee").populate('event')

        return res.json(new ApiResponse(true, bookDetails, "ticket book successfully"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function cancelTicket(req, res) {
    let { bookId } = req.params;
    try {

        let ticket = await bookingModel.findOne({ _id: bookId }).populate("event");

        if (!ticket) {
            return res.json(new ApiResponse(false, null, "Ticket not found"));
        }

        // aaj ka time
        let todayTime = Date.now()
        let eventDate = parseInt(ticket.event.date)
        let daate = new Date(parseInt(ticket.event.date))

        if (todayTime > eventDate - 1000 * 60 * 60 * 48) {
            return res.json(new ApiResponse(false, null, "You Can Not Cancel ticket " + daate.toDateString()));
        }

        let cancelTick = await bookingModel.findByIdAndUpdate(bookId, { isCancel: true }, { new: true }).populate("event").populate("attendee");

        if (!cancelTick) {
            return res.json(new ApiResponse(false, null, "ticket cancelled failed"));
        }

        await Event.findByIdAndUpdate(ticket.event._id, { available_slots: ticket.event.available_slots + ticket.number_of_book_slots }, { new: true })

        return res.json(new ApiResponse(true, cancelTick, "Ticket Cancelled"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function getAllBookingsOnEvent(req, res) {
    const { eventId } = req.params;
    try {

        let findEvent = await Event.findOne({ _id: eventId, creator: req.data._id });

        if (!findEvent) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        let bookings = await bookingModel.find({ event: eventId }).populate("attendee").populate("event");

        if (!bookings) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, bookings, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}


async function getAllBookingsOnMyEvent(req, res) {
    try {

        let bookings = await bookingModel.find().populate("attendee").populate("event")

        if (!bookings) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }


        let filter = bookings.filter((ele) => ele.event.creator == req.data._id)

        return res.json(new ApiResponse(true, filter, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

module.exports = { getAllBookings, bookTicket, cancelTicket, getAllBookingsOnEvent, getAllBookingsOnMyEvent };