const User = require("../model/userModel");
const ApiResponse = require("../response/pattern");
const JWT = require('../config/tokenManager')
const Bcrypt = require("../config/passwordHashing");
const transporter = require("../config/nodemailer");



async function uploadProfile(req, res) {

    let url = `${req.protocol}://${req.host}/${req?.file?.path?.replaceAll("\\", "/")}`
    try {
        let user = await User.findOneAndUpdate({ _id: req.data._id }, { profilePic: url }, { new: true });

        if (!user) {
            return res.json(new ApiResponse(false, null, "Users not found"));
        }

        return res.json(new ApiResponse(true, user, "success"));

    } catch (error) {
        console.error(error);
        return res.json(new ApiResponse(false, null, error.message));
    }
}

module.exports = { userRegister, userLogin, getUserById, uploadProfile };