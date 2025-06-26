const User = require("../model/userModel");
const ApiResponse = require("../response/pattern");
const JWT = require("../config/tokenManager");
const Bcrypt = require("../config/passwordHashing");

async function adminLogin(req, res) {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email, isAdmin: true });

    if (!user) {
      return res.json(new ApiResponse(false, null, "User not found"));
    }

    user = user.toObject();

    let isMatch = await Bcrypt.comparePassword(password, user.password);

    if (!isMatch) {
      return res.json(new ApiResponse(false, null, "Invalid password"));
    }

    let token = JWT.genarateToken(user);

    user.token = token;

    return res.json(new ApiResponse(true, user, "User Login successfully"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

module.exports = { adminLogin };
