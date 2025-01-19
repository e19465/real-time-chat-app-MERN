const jwt = require("jsonwebtoken");
const { ForbiddenError } = require("./CustomErrors");

class JwtHandler {
  //! Method for generating tokens
  getAccessToken(userId, email) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const timestamp = Math.floor(Date.now() / 1000);
    const expirationTime = timestamp + 60 * 5; // expires in 5 minutes
    const payload = {
      userId: userId,
      email: email,
      tokenType: "access",
      timestamp: timestamp,
      exp: expirationTime,
    };
    const token = jwt.sign(payload, accessTokenSecret);
    return token;
  }

  //! Method for generating refresh tokens
  getRefreshToken(userId) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const timestamp = Math.floor(Date.now() / 1000);
    const expirationTime = timestamp + 60 * 60 * 24 * 7; // expires in week
    const payload = {
      userId: userId,
      tokenType: "refresh",
      timestamp: timestamp,
      exp: expirationTime,
    };
    const token = jwt.sign(payload, refreshTokenSecret);
    return token;
  }

  //! Method for verifying tokens
  verifyAccessToken(token) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    try {
      return jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            throw new ForbiddenError("Access token has expired");
          } else {
            return new ForbiddenError("Invalid access token");
          }
        }
        return payload;
      });
    } catch (err) {
      throw err;
    }
  }

  //! Method for verifying refresh tokens
  verifyRefreshToken(token) {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    try {
      return jwt.verify(token, refreshTokenSecret, (err, payload) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            throw new ForbiddenError("Session is expired, Please login again");
          } else {
            return new ForbiddenError("Invalid refresh token");
          }
        }
        return payload;
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new JwtHandler();
