const JwtHandler = require("../helpers/JwtHandler");
const ErrorHandler = require("../helpers/ErrorHandler");
const { isValidObjectId } = require("../helpers/Utils");

class JwtMiddleware {
  constructor() {
    this.verifyAccessToken = this.verifyAccessToken.bind(this);
    this.verifyTokenAndAccountId = this.verifyTokenAndAccountId.bind(this);
    this.verifyRefreshToken = this.verifyRefreshToken.bind(this);
  }

  //! Middleware to verify the access token
  verifyAccessToken(req, res, next) {
    const cookies = req.cookies;
    if (cookies) {
      const token = cookies.access;
      if (token) {
        try {
          const payload = JwtHandler.verifyAccessToken(token);
          req.user = payload;
          next();
        } catch (err) {
          return ErrorHandler.handle500AndCustomError(err, res);
        }
      } else {
        return ErrorHandler.handle401("Unauthorized", res);
      }
    } else {
      return ErrorHandler.handle401("Unauthorized", res);
    }
  }

  //! Middleware to verify the access token and account id
  verifyTokenAndAccountId(req, res, next) {
    this.verifyAccessToken(req, res, () => {
      if (req.params.userId) {
        // check for valid object id
        if (!isValidObjectId(req.params.userId)) {
          return ErrorHandler.handle400("Invalid user id", res);
        } else if (req.user.userId === req.params.userId) {
          next();
        } else {
          return ErrorHandler.handle403("Forbidden", res);
        }
      } else {
        return ErrorHandler.handle400("Account id required", res);
      }
    });
  }

  //! Middleware to verify the refresh token
  verifyRefreshToken(req, res, next) {
    const cookies = req.cookies;
    if (cookies) {
      const refreshToken = cookies.refresh;
      if (refreshToken) {
        try {
          const payload = JwtHandler.verifyRefreshToken(refreshToken);
          req.user = payload;
          next();
        } catch (err) {
          return ErrorHandler.handle500AndCustomError(err, res);
        }
      } else {
        return ErrorHandler.handle401("Unauthorized", res);
      }
    } else {
      return ErrorHandler.handle401("Unauthorized", res);
    }
  }
}

module.exports = new JwtMiddleware();
