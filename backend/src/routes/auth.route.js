const authRouter = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const JwtMiddleware = require("../middleware/jwtMiddleware");

// register endpoint
authRouter.post("/register", AuthController.register);

// login endpoint
authRouter.post("/login", AuthController.login);

// logout endpoint
authRouter.post(
  "/logout",
  JwtMiddleware.verifyAccessToken,
  AuthController.logout
);

// send email verification OTP email endpoint
authRouter.post("/send-email-otp", AuthController.sendEmailVerificationEmail);

// verify email endpoint
authRouter.post("/verify-email", AuthController.verifyEmail);

// send password reset OTP email endpoint
authRouter.post(
  "/send-password-reset-otp",
  AuthController.sendPasswordResetEmail
);

// reset password endpoint
authRouter.post("/reset-password", AuthController.resetPassword);

// refresh tokens endpoint
authRouter.post(
  "/refresh-tokens",
  JwtMiddleware.verifyRefreshToken,
  AuthController.refreshTokens
);

// change password endpoint
authRouter.post(
  "/change-password",
  JwtMiddleware.verifyAccessToken,
  AuthController.changePassword
);

authRouter.get(
  "/check-is-authenticated/:userId",
  JwtMiddleware.verifyTokenAndAccountId,
  AuthController.checkLoggedInUserWithParamsId
);

/**
 * Complete end points for the auth route
 * 1. Register - POST - http://localhost:5000/api/auth/register
 * 2. Login - POST - http://localhost:5000/api/auth/login
 * 3. Logout - POST - http://localhost:5000/api/auth/logout
 * 4. Send Email Verification OTP - POST - http://localhost:5000/api/auth/send-email-otp
 * 5. Verify Email - POST - http://localhost:5000/api/auth/verify-email
 * 6. Send Password Reset OTP - POST - http://localhost:5000/api/auth/send-password-reset-otp
 * 7. Reset Password - POST - http://localhost:5000/api/auth/reset-password
 * 8. Refresh Tokens - POST - http://localhost:5000/api/auth/refresh-tokens
 * 9. Change Password - POST - http://localhost:5000/api/auth/change-password
 * 10. Check Is Authenticated - GET - http://localhost:5000/api/auth/check-is-authenticated/:userId
 */

module.exports = authRouter;
