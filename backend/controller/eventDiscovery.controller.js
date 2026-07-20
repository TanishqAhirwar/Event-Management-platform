import ApiResponse from "../response/pattern.js";
import {Event} from "../model/eventModel.js";

export const getAllPublishedEvents = async (req, res) => {
  try {

    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    const filter = {
      status: "Published",
      isDeleted: false,
    };

    const totalEvents = await Event.countDocuments(filter);

    const events = await Event.find(filter)
      .populate("creator", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalEvents / limit);

    return res.status(200).json(
      new ApiResponse(
        true,
        {
          events,
          pagination: {
            currentPage: page,
            totalPages,
            totalEvents,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        },
        "Events fetched successfully"
      )
    );

  } catch (error) {

    return res.status(500).json(
      new ApiResponse(false, null, error.message)
    );

  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({
      _id: id,
      status: "Published",
      isDeleted: false,
    }).populate(
      "creator",
      "fullName profilePic"
    );

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, null, "Event not found")
      );
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        event,
        "Event fetched successfully"
      )
    );

  } catch (error) {
    return res.status(500).json(
      new ApiResponse(
        false,
        null,
        error.message
      )
    );
  }
};

export const searchEvents = async (req, res) => {
    try {

        const { keyword } = req.query;

        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        if (!keyword) {
            return res.status(400).json(
                new ApiResponse(false, null, "Keyword is required")
            );
        }

        const filter = {
            status: "Published",
            isDeleted: false,
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        };

        const totalEvents = await Event.countDocuments(filter);

        const events = await Event.find(filter)
            .populate("creator", "fullName profilePic")
            .sort({ date: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    events,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalEvents / limit),
                        totalEvents,
                        limit,
                        hasNextPage: page < Math.ceil(totalEvents / limit),
                        hasPreviousPage: page > 1
                    }
                },
                "Search completed successfully"
            )
        );

    } catch (error) {

        return res.status(500).json(
            new ApiResponse(false, null, error.message)
        );

    }
};

export const filterEvents = async (req, res) => {
    try {

        const { category, location, date } = req.query;

        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const query = {
            status: "Published",
            isDeleted: false
        };

        if (category) {
            query.event_category = category;
        }

        if (location) {
            query.location = {
                $regex: location,
                $options: "i"
            };
        }

        if (date) {

            const startDate = new Date(date);
            const endDate = new Date(date);

            endDate.setDate(endDate.getDate() + 1);

            query.date = {
                $gte: startDate,
                $lt: endDate
            };

        }

        const totalEvents = await Event.countDocuments(query);

        const events = await Event.find(query)
            .populate("creator", "fullName profilePic")
            .sort({ date: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    events,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalEvents / limit),
                        totalEvents,
                        limit,
                        hasNextPage: page < Math.ceil(totalEvents / limit),
                        hasPreviousPage: page > 1
                    }
                },
                "Filtered events fetched successfully"
            )
        );

    } catch (error) {

        return res.status(500).json(
            new ApiResponse(
                false,
                null,
                error.message
            )
        );

    }
};