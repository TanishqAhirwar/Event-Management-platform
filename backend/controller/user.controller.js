import {User} from "../model/userModel.js";
import ApiResponse from "../response/pattern.js";
import jwt from "jsonwebtoken";
import Bcrypt from "bcrypt";


// export const uploadProfile = (req, res) =>{

//     let url = `${req.protocol}://${req.host}/${req?.file?.path?.replaceAll("\\", "/")}`
//     try {
//         let user = await User.findOneAndUpdate({ _id: req.data._id }, { profilePic: url }, { new: true });

//         if (!user) {
//             return res.json(new ApiResponse(false, null, "Users not found"));
//         }

//         return res.json(new ApiResponse(true, user, "success"));

//     } catch (error) {
//         console.error(error);
//         return res.json(new ApiResponse(false, null, error.message));
//     }
// }

export const updateUserRole = async (req, res) => {
    try {

        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "organizer", "admin"].includes(role)) {
            return res.status(400).json(
                new ApiResponse(false, null, "Invalid Role")
            );
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json(
                new ApiResponse(false, null, "User not found")
            );
        }

        user.role = role;

        await user.save();

        return res.status(200).json(
            new ApiResponse(true, user, "Role Updated Successfully")
        );

    } catch (error) {
        return res.status(500).json(
            new ApiResponse(false, null, error.message)
        );
    }
};