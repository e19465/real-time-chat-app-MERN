const ErrorHandler = require("../helpers/ErrorHandler");
const PasswordHashCompare = require("../helpers/PasswordHashCompare");
const { passwordStrengthChecker, normalizeEmail } = require("../helpers/Utils");
const User = require("../models/User");
const sendEmail = require("../services/EmailService");
const { mongoDbErrorCodes, otpSendEmailTypes } = require("../constants/common");
const EmailOtpHandler = require("../helpers/EmailOtpHandler");
const emailVerifyEmailTemplate = require("../emailTemplates/emailVerifyEmailTemplate");
const passwordResetEmailTemplate = require("../emailTemplates/passwordResetEmailTemplate");
const SuccessHandler = require("../helpers/SuccessHandler");
const JwtHandler = require("../helpers/JwtHandler");

class AuthController {
  //! Method for user login
  async login(req, res) {
    try {
      // get email and password from request body and check if they are present
      const { email, password } = req.body;
      if (!email || !password) {
        return ErrorHandler.handle400("Email and password are required", res);
      }

      // find user with email and check if user exists
      const normalizedEmail = normalizeEmail(email);
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return ErrorHandler.handle404("Invalid Credentials", res);
      }

      // compare password with hashed password and check if password is valid
      const isPasswordValid = await PasswordHashCompare.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return ErrorHandler.handle401("Invalid Credentials", res);
      }

      // check if email is verified
      if (!user.isEmailVerified) {
        return ErrorHandler.handle401("Email not verified", res);
      }

      // if all checks pass, generate access token and refresh token
      const accessToken = JwtHandler.getAccessToken(user._id, user.email);
      const refreshToken = JwtHandler.getRefreshToken(user._id);

      res.cookie("refresh", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      });

      res.cookie("access", accessToken, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      });

      // send success response with tokens
      return SuccessHandler.handle200("Login successful", null, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for user registration
  async register(req, res) {
    try {
      // get email, full name and password from request body and check if they are present, if not return 400
      const { email, fullName, password } = req.body;
      if (!email || !password || !fullName) {
        return ErrorHandler.handle400(
          "Email, Full Name and password are required",
          res
        );
      }

      // check if password is strong, if not return 400
      const isPasswordStrong = passwordStrengthChecker(password);
      if (!isPasswordStrong) {
        return ErrorHandler.handle400(
          "Password must be at least 8 characters long and contain at least 1 numeric character, 1 lowercase letter, 1 uppercase letter and 1 special character",
          res
        );
      }

      // normalize email
      const normalizedEmail = normalizeEmail(email);

      // Hash the password
      const hashedPassword = await PasswordHashCompare.hashPassword(password);

      // Create and Save user to DB
      const user = new User({
        email: normalizedEmail,
        fullName,
        password: hashedPassword,
      });
      await user.save();

      // Save OTP in Db and get the OTP
      const sixDigitOtp = await EmailOtpHandler.sendOtp(
        email,
        otpSendEmailTypes.email
      );

      // Send email verification email with OTP
      await sendEmail({
        email,
        subject: "Email Verification",
        html: emailVerifyEmailTemplate(email, sixDigitOtp),
      });

      // Return 201
      return SuccessHandler.handle201(
        "Registration successfull. Please verify your email",
        null,
        res
      );
    } catch (err) {
      if (err.code === mongoDbErrorCodes.duplicateKey) {
        return ErrorHandler.handle400("Email already exists", res);
      }
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for sending email verification email
  async sendEmailVerificationEmail(req, res) {
    try {
      // Get email from request body, if not present return 400
      const { email } = req.body;
      if (!email) {
        return ErrorHandler.handle400("Email is required", res);
      }

      // Get user from db, if not present return 404
      const normalizedEmail = normalizeEmail(email);
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return ErrorHandler.handle404("Invalid Email", res);
      }

      // Check if email is already verified, if yes return 400
      if (user.isEmailVerified) {
        return ErrorHandler.handle400("Email already verified", res);
      }

      // Save OTP in Db and get the OTP
      const sixDigitOtp = await EmailOtpHandler.sendOtp(
        email,
        otpSendEmailTypes.email
      );

      // Send email verification email with OTP
      await sendEmail({
        email,
        subject: "Email Verification",
        html: emailVerifyEmailTemplate(email, sixDigitOtp),
      });

      // Return 200
      return SuccessHandler.handle200(
        "Verification email has been sent successfully to your email",
        null,
        res
      );
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for verifying email
  async verifyEmail(req, res) {
    try {
      // Get email and otp from request body, if not present return 400
      const { email, otp } = req.body;
      if (!email || !otp) {
        return ErrorHandler.handle400("Email and OTP are required", res);
      }

      // Get user from db, if not present return 404
      const normalizedEmail = normalizeEmail(email);
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return ErrorHandler.handle404("Invalid Email", res);
      }

      // Check if email is already verified, if yes return 400
      if (user.isEmailVerified) {
        return ErrorHandler.handle400("Email already verified", res);
      }

      // Verify OTP, if not valid return 400, finally return 200
      await EmailOtpHandler.verifyOtp(email, otp, otpSendEmailTypes.email);
      return SuccessHandler.handle200(
        "Email verified successfully, You may sign in now",
        null,
        res
      );
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for sending password reset email
  async sendPasswordResetEmail(req, res) {
    try {
      // Get email from request body, if not present return 400
      const { email } = req.body;
      if (!email) {
        return ErrorHandler.handle400("Email is required", res);
      }

      // Get user from db, if not present return 404
      const normalizedEmail = normalizeEmail(email);
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return ErrorHandler.handle404("Invalid Email", res);
      }

      // Save user otp in db
      const sixDigitOtp = await EmailOtpHandler.sendOtp(
        email,
        otpSendEmailTypes.password
      );

      // Send password reset email with otp
      await sendEmail({
        email,
        subject: "Password Reset",
        html: passwordResetEmailTemplate(email, sixDigitOtp),
      });

      // Return 200
      return SuccessHandler.handle200(
        "Password reset email has been sent successfully to your email",
        null,
        res
      );
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for resetting password
  async resetPassword(req, res) {
    try {
      // Get email, otp, password and confirm password from request body, if not present return 400
      const { email, otp, password, confirmPassword } = req.body;
      if (!email || !otp || !password || !confirmPassword) {
        return ErrorHandler.handle400(
          "Email, OTP, Password and Confirm Password are required",
          res
        );
      }

      // Get user from db, if not present return 404
      const normalizedEmail = normalizeEmail(email);
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return ErrorHandler.handle404("Invalid Email", res);
      }

      // Check if password and confirm password match, if not return 400
      if (password !== confirmPassword) {
        return ErrorHandler.handle400(
          "Password and Confirm Password do not match",
          res
        );
      }

      // Check if password is strong, if not return 400
      const isPasswordStrong = passwordStrengthChecker(password);
      if (!isPasswordStrong) {
        return ErrorHandler.handle400(
          "Password must be at least 8 characters long and contain at least 1 numeric character, 1 lowercase letter, 1 uppercase letter and 1 special character",
          res
        );
      }

      // Verify OTP, if not valid return 400
      await EmailOtpHandler.verifyOtp(email, otp, otpSendEmailTypes.password);

      // If all checks passed, Hash password and save it to db and return 200
      const hashedPassword = await PasswordHashCompare.hashPassword(password);
      user.password = hashedPassword;
      await user.save();
      return SuccessHandler.handle200("Password reset successfully", null, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for changing password
  async changePassword(req, res) {
    try {
      // Get user from request (from token verification), if not present return 401
      const user = req.user;
      const userId = user.userId;
      if (!userId) {
        return ErrorHandler.handle401("Invalid user", res);
      }

      // Get password, new password and confirm new password from request body, if not present return 400
      const { password, newPassword, confirmNewPassword } = req.body;
      if (!password || !newPassword || !confirmNewPassword) {
        return ErrorHandler.handle400(
          "Password, New Password and Confirm New Password are required",
          res
        );
      }

      // Get user from db, if not present return 404
      const userFromDb = await User.findById(userId);
      if (!userFromDb) {
        return ErrorHandler.handle404("User not found", res);
      }

      // Check if password is valid, if not return 401
      const isPasswordValid = await PasswordHashCompare.comparePassword(
        password,
        userFromDb.password
      );
      if (!isPasswordValid) {
        return ErrorHandler.handle401("Invalid password", res);
      }

      // Check if new password and confirm new password match, if not return 400
      if (newPassword !== confirmNewPassword) {
        return ErrorHandler.handle400(
          "New Password and Confirm New Password do not match",
          res
        );
      }

      // Check if new password is strong, if not return 400
      const isPasswordStrong = passwordStrengthChecker(newPassword);
      if (!isPasswordStrong) {
        return ErrorHandler.handle400(
          "Password must be at least 8 characters long and contain at least 1 numeric character, 1 lowercase letter, 1 uppercase letter and 1 special character",
          res
        );
      }

      // if all checks pass, hash new password and save it to db and return 200
      const hashedPassword = await PasswordHashCompare.hashPassword(
        newPassword
      );
      userFromDb.password = hashedPassword;
      await userFromDb.save();
      return SuccessHandler.handle200(
        "Password changed successfully",
        null,
        res
      );
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for refreshing tokens
  async refreshTokens(req, res) {
    try {
      // Get user from request (from token verification), if not present return 401
      const user = req.user;
      const userId = user.userId;
      if (!userId) {
        return ErrorHandler.handle401("Invalid user", res);
      }

      // Get user from db, if not present return 404
      const userFromDb = await User.findById(userId);
      if (!userFromDb) {
        return ErrorHandler.handle404("User not found", res);
      }

      // if all checks pass, generate new access token and refresh token and return 200
      const accessToken = JwtHandler.getAccessToken(
        userFromDb._id,
        userFromDb.email
      );
      const refreshToken = JwtHandler.getRefreshToken(userFromDb._id);

      res.cookie("refresh", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      });

      res.cookie("access", accessToken, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", // only send cookie over https in production
      });

      return SuccessHandler.handle200(
        "Tokens refreshed successfully",
        null,
        res
      );
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }

  //! Method for user logout
  async logout(req, res) {
    try {
      res.clearCookie("refresh", "", { maxAge: 0 });
      res.clearCookie("access", "", { maxAge: 0 });
      return SuccessHandler.handle200("Logout successful", null, res);
    } catch (err) {
      return ErrorHandler.handle500AndCustomError(err, res);
    }
  }
}

module.exports = new AuthController();
