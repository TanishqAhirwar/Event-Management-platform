import User from "../model/userModel.js";
import ApiResponse from "../response/pattern.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "All Fields are required"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json(new ApiResponse(false, null, "Email already exists"));
    }

    let hashedPassword = await Bcrypt.hashPassword(password);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    let mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome Message",
      html: `<h1>Dear ${user.username}</h1>
           <b>welcome to our Website</b>`,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log("Mail sending failed:", error.message);
    }

    return res
      .status(201)
      .json(new ApiResponse(true, userResponse, "User Created Successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validation
    if (!email?.trim() || !password?.trim()) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "All Fields are required"));
    }

    // Find User
    const user = await User.findOne({
      email: email.toLowerCase(),
      isAdmin: false,
    });

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "User not found"));
    }

    // Compare Password
    const isMatch = await Bcrypt.comparePassword(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json(new ApiResponse(false, null, "Invalid password"));
    }

    // Generate JWT
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json(new ApiResponse(true, userResponse, "User Login successfully"));

  } catch (error) {
    console.error(error);

    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

async function getUserById(req, res) {
  try {
    let user = await User.findById(req.data._id);

    if (!user) {
      return res.json(new ApiResponse(false, null, "Users not found"));
    }

    return res.json(new ApiResponse(true, user, "success"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}
