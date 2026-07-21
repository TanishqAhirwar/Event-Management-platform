import { User } from "../model/userModel.js";
import ApiResponse from "../response/pattern.js";
import { transporter } from "../config/nodemailer.js";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
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

    let hashedPassword = await Bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;

    await user.save();

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };

    const verificationLink = `${process.env.BASE_URL}/api/v1/auth/verify-email/${verificationToken}`;
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify Your Email",
      html: `
      <h2>Hello ${user.fullName}</h2>

      <p>Thank you for registering.</p>

      <p>Please click the button below to verify your email.</p>

      <a href="${verificationLink}">
          Verify Email
      </a>

      <p>If you didn't create this account, ignore this email.</p>
  `,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log("Mail sending failed:", error.message);
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          userResponse,
          "Registration successful. Please verify your email.",
        ),
      );
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
    });

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(false, null, "User not found"));
    }

    // Compare Password
    const isMatch = await Bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json(new ApiResponse(false, null, "Invalid password"));
    }

        if (!user.isVerified) {

        return res.status(403).json(
            new ApiResponse(
                false,
                null,
                "Please verify your email before logging in."
            )
        );

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
      fullName: user.fullName,
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

export const logOut = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
      })
      .json(new ApiResponse(true, null, "Logged Out Successfully"));
  } catch (error) {
    console.error(error);

    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
    });

    if (!user) {
      return res
        .status(400)
        .json(
          new ApiResponse(false, null, "Invalid or expired verification token"),
        );
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(true, null, "Email verified successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Email is required"));
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Security reason:
    // Email exist kare ya na kare,
    // same response dena better hota hai.

    if (!user) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            null,
            "If this email is registered, a password reset link has been sent.",
          ),
        );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.BASE_URL}/api/v1/auth/reset-password/${resetToken}`;

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `
        <h2>Hello ${user.fullName}</h2>

        <p>Click below to reset your password.</p>

        <a href="${resetLink}">
          Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log(error.message);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(true, null, "Password reset link sent successfully."),
      );
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Password is required"));
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(false, null, "Invalid or expired reset token"));
    }

    const hashedPassword = await Bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetPasswordToken = null;

    user.resetPasswordExpires = null;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(true, null, "Password reset successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
};
