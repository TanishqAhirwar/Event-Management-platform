const Event = require("../model/eventModel");
const ApiResponse = require("../response/pattern");

async function getAllEvents(req, res) {
    try {
        let event = await Event.find({ isDeleted: false }).populate("creator");

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, event, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function getMyEvents(req, res) {
    try {
        let event = await Event.find({ creator: req.data._id, isDeleted: false }).populate("creator");

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, event, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function createEvent(req, res) {
    const { title, description, date, time, available_slots, event_category, price, location } = req.body;

    let str = new Date(date);
    let today = Date.now()

    if (today > str.getTime()) {
        return res.json(new ApiResponse(false, null, "! Invalid Date, You Can Not Create Event In Past"))
    }

    let url = `${req.protocol}://${req.host}/${req?.file?.path?.replaceAll("\\", "/")}`

    try {
        let event = await Event.create({
            title,
            description,
            date: str.getTime(),
            time,
            available_slots,
            per_slot_price: price,
            location,
            event_category,
            thumbnail : url,
            creator: req.data._id
        });

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event not created"));
        }

        return res.json(new ApiResponse(true, event, "Event created successfully"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function cancelEvent(req, res) {
    let { eventId } = req.params;
    const { cancel_message } = req.body;
    try {
        let event = await Event.findOneAndUpdate({ _id: eventId, creator: req.data._id }, { cancel_message, isCancel: true }, { new: true }).populate("creator");

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, event, "Event Cancelled"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function deleteEvent(req, res) {
    let { eventId } = req.params;
    try {
        let event = await Event.findOneAndUpdate({ _id: eventId, creator: req.data._id }, { isDeleted: true }, { new: true }).populate("creator");

        if (!event) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, event, "Event Deleted successfully"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

async function editEvent(req, res) {
    let { eventId } = req.params;
    const { title, description, event_category, on_booking_start } = req.body;
    let str = new Date(on_booking_start);
    let today = Date.now()

    if (today > str.getTime()) {
        return res.json(new ApiResponse(false, null, "! Invalid Booking Date, You Can Not Create Event In Past"))
    }

    try {

        let evenObj = await Event.findOne({ _id: eventId, isCancel: false, isDeleted: false,creator : req.data._id });

        if (!evenObj) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        evenObj = evenObj.toObject();

        if (str.getTime() > parseInt(evenObj.date) - 1000 * 60 * 60 * 24) {
            return res.json(new ApiResponse(false, null, "! Invalid Booking Date, You Can Not Create Event In Past"))
        }

        let updated = await Event.findByIdAndUpdate(eventId, { title, description, event_category, on_booking_start: str.getTime() }, { new: true }).populate("creator");

        if (!updated) {
            return res.json(new ApiResponse(false, null, "Event not found"));
        }

        return res.json(new ApiResponse(true, updated, "Event Updated"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

module.exports = { getAllEvents, createEvent, cancelEvent, deleteEvent, editEvent, getMyEvents };