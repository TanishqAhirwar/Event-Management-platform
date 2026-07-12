import { User } from "../model/userModel.js";
import ApiResponse from "../response/pattern.js";

export const isAdmin = async (req, res, next) => {
    try {

        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json(
                new ApiResponse(false, null, "User not found")
            );
        }

        if (user.role !== "admin") {
            return res.status(403).json(
                new ApiResponse(false, null, "Only Admin can perform this action")
            );
        }

        next();

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(false, null, error.message)
        );
    }
};