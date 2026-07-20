import ApiResponse from "../response/pattern.js";
import {Event} from "../model/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      date,
      time,
      reporting_time,
      available_slots,
      total_slots,
      per_slot_price,
      status,
      event_category,
      booking_start,
      max_booking_per_user,
    } = req.body;

    if(
        !title ||
        !description ||
        !location ||
        !date ||
        !time ||
        !available_slots ||
        !per_slot_price ||
        !event_category
    ){
        return res.status(400).json(
            new ApiResponse(false, null, "All required fields are mandatory")
        );
    }

    const eventDate = new Date(date);
    
    if (isNaN(eventDate.getTime())){
        return res.status(400).json(
            new ApiResponse(false, null, "Invalid Date")
        );
    }

    if (eventDate.getTime() < Date.now()){
      return res.status(400).json(
        new ApiResponse(
          false,
          null,
          "! Invalid Date, You Can Not Create Event In Past",
        ),
      );
    }

    const thumbnail_url = req.file? `${req.protocol}://${req.get("host")}/${req?.file?.path?.replaceAll("\\", "/")}`:null;

    const event = await Event.create({
      title,
      description,
      location,
      date: eventDate,
      time,
      thumbnail: thumbnail_url,
      reporting_time,
      available_slots,
      total_slots,
      per_slot_price,
      status,
      event_category,
      booking_start,
      max_booking_per_user,
      creator: req.id,
    });
    return res.status(201).json(new ApiResponse(true, event, "Event created successfully"));

  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
}

export const cancelEvent = async (req, res) => {
  try {

    const { id } = req.params;
    const { cancel_message } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    if (event.creator.toString() !== req.id) {
      return res.status(403).json(
        new ApiResponse(false, null, "Unauthorized")
      );
    }

    if (event.status === "Completed") {
      return res.status(400).json(
        new ApiResponse(false, null, "Completed event cannot be cancelled")
      );
    }

    event.status = "Cancelled";
    event.cancel_message = cancel_message;

    await event.save();

    return res.status(200).json(
      new ApiResponse(true, event, "Event cancelled successfully")
    );

  } catch (error) {

    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );

  }
};

export const deleteEvent = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    if (event.creator.toString() !== req.id) {
      return res.status(403).json(
        new ApiResponse(false, null, "Unauthorized")
      );
    }

    event.isDeleted = true;

    await event.save();

    return res.status(200).json(
      new ApiResponse(true, event, "Event deleted successfully")
    );

  } catch (error) {

    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );

  }
};

export const editEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    if (event.creator.toString() !== req.id) {
      return res.status(403).json(
        new ApiResponse(false, null, "Unauthorized")
      );
    }

    if (event.status === "Completed") {
      return res.status(400).json(
        new ApiResponse(false, null, "Completed event cannot be edited")
      );
    }

    Object.assign(event, req.body);

    if (req.file) {
      event.thumbnail = `/uploads/${req.file.filename}`;
    }

    await event.save();

    return res.status(200).json(
      new ApiResponse(true, event, "Event updated successfully")
    );

  } catch (error) {

    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );

  }

};

export const getMyEvents= async(req, res) =>{
  try {
    const events = await Event.find({
    creator: req.id,
    isDeleted: false
});

     if (events.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "No events found"));
    }

    return res.json(new ApiResponse(true, events, "success"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

export const publishEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    if (event.creator.toString() !== req.id) {
      return res.status(403).json(
        new ApiResponse(false, null, "Unauthorized")
      );
    }

    event.status = "Published";

    await event.save();

    return res.status(200).json(
      new ApiResponse(true, event, "Event Published Successfully")
    );

  } catch (error) {
    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );
  }
};

export const completeEvent = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(
        new ApiResponse(false, null, "Invalid Event ID")
      );
    }

    const event = await Event.findById(id);

    if (!event || event.isDeleted) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    // Only creator can complete the event
    if (event.creator.toString() !== req.id) {
      return res.status(403).json(
        new ApiResponse(false, null, "Unauthorized")
      );
    }

    // Event must be published
    if (event.status === "Draft") {
      return res.status(400).json(
        new ApiResponse(
          false,
          null,
          "Publish the event before marking it as completed."
        )
      );
    }

    // Cancelled event cannot be completed
    if (event.status === "Cancelled") {
      return res.status(400).json(
        new ApiResponse(
          false,
          null,
          "Cancelled event cannot be marked as completed."
        )
      );
    }

    // Already completed
    if (event.status === "Completed") {
      return res.status(400).json(
        new ApiResponse(
          false,
          null,
          "Event is already completed."
        )
      );
    }

    // Event date must have passed
    if (new Date() < event.date) {
      return res.status(400).json(
        new ApiResponse(
          false,
          null,
          "Event cannot be completed before its scheduled date."
        )
      );
    }

    event.status = "Completed";

    await event.save();

    return res.status(200).json(
      new ApiResponse(
        true,
        event,
        "Event marked as completed successfully."
      )
    );

  } catch (error) {

    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );

  }
};