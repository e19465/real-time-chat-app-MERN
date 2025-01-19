const sendEmail = require("../services/EmailService");
const User = require("../models/User");
const { generateOtp, normalizeEmail } = require("./Utils");
const { otpSendEmailTypes } = require("../constants/common");
const { NotFoundError, BadRequestError } = require("../helpers/CustomErrors");

class EmailOtpHandler {
  //! Method for sending email verification OTP
  async sendOtp(email, type) {
    try {
      email = normalizeEmail(email); // Normalize email address
      const user = await User.findOne({ email });
      if (!user) {
        throw new NotFoundError(`User with email ${email} not found`);
      }

      const sixDigitOtp = generateOtp(6); // Function to generate a 6-digit OTP
      const oneHourFromNow = Date.now() + 1 * 60 * 60 * 1000; // 1-hour expiration

      if (type === otpSendEmailTypes.email) {
        // Set or update email verification fields
        user.emailVerificationToken = sixDigitOtp;
        user.emailVerificationTokenExpires = oneHourFromNow;
      } else if (type === otpSendEmailTypes.password) {
        // Set or update password reset fields
        user.passwordResetToken = sixDigitOtp;
        user.passwordResetTokenExpires = oneHourFromNow;
      } else {
        throw new BadRequestError("Invalid OTP type");
      }

      await user.save(); // Save changes to the database
      return sixDigitOtp;
    } catch (err) {
      console.error("Error while sending OTP:", err);
      throw err;
    }
  }

  //! Method for verifying OTP
  async verifyOtp(email, otp, type) {
    try {
      email = normalizeEmail(email); // Normalize email address
      const user = await User.findOne({ email });
      if (!user) {
        throw new NotFoundError(`User with email ${email} not found`);
      }

      if (type === otpSendEmailTypes.email) {
        // Verify email OTP
        if (user.emailVerificationToken !== otp) {
          throw new BadRequestError("Invalid OTP");
        }
        if (user.emailVerificationTokenExpires < Date.now()) {
          // Remove expired token
          await User.updateOne(
            { email },
            {
              $unset: {
                emailVerificationToken: "",
                emailVerificationTokenExpires: "",
              },
            }
          );
          throw new BadRequestError("OTP expired");
        }
        // Mark email as verified
        await User.updateOne(
          { email },
          {
            $unset: {
              emailVerificationToken: "",
              emailVerificationTokenExpires: "",
            },
            $set: { isEmailVerified: true },
          }
        );
        return true;
      } else if (type === otpSendEmailTypes.password) {
        // Verify password reset OTP
        if (user.passwordResetToken !== otp) {
          throw new BadRequestError("Invalid OTP");
        }
        if (user.passwordResetTokenExpires < Date.now()) {
          // Remove expired token
          await User.updateOne(
            { email },
            {
              $unset: { passwordResetToken: "", passwordResetTokenExpires: "" },
            }
          );
          throw new BadRequestError("OTP expired");
        }
        // Clean up tokens after successful verification
        await User.updateOne(
          { email },
          { $unset: { passwordResetToken: "", passwordResetTokenExpires: "" } }
        );
        return true;
      } else {
        // Invalid OTP type
        throw new BadRequestError("Invalid OTP type");
      }
    } catch (err) {
      console.error("Error in verifyOtp:", err);
      throw err;
    }
  }

  //! Method for sending email
  async sendEmail(email, subject, html) {
    try {
      await sendEmail({
        email,
        subject: subject,
        html: html,
      });
    } catch (err) {
      console.log("Error while sending email", err);
      throw err;
    }
  }
}

module.exports = new EmailOtpHandler();
