const JwtHandler = require("../helpers/JwtHandler");
const ErrorHandler = require("../helpers/ErrorHandler");

class JwtMiddleware {
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
        console.log("Here");
        return ErrorHandler.handle401("Unauthorized", res);
      }
    } else {
      return ErrorHandler.handle401("Unauthorized", res);
    }
  }

  //! Middleware to verify the access token and account id
  verifyTokenAndAccountId(req, res, next) {
    this.verifyAccessToken(req, res, () => {
      if (req.params.account) {
        if (req.user.userId === req.params.account) {
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
