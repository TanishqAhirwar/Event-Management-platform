import { User } from "../model/userModel.js";
import ApiResponse from "../response/pattern.js";

export const isOrganizer = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json(
                new ApiResponse(false, null, "User not found")
            );
        }

        if (user.role !== "organizer") {
            return res.status(403).json(
                new ApiResponse(false, null, "Only organizers can perform this action")
            );
        }

        next();

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(false, null, error.message)
        );
    }
};