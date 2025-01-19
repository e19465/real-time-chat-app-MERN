const HttpStatus = require("../constants/httpStatus");

class SuccessHandler {
  handle200(message, data, res) {
    if (message && data) {
      return res.status(HttpStatus.HTTP_200_OK).json({ message, data });
    }
    if (message) {
      return res.status(HttpStatus.HTTP_200_OK).json({ message });
    }
    if (data) {
      return res.status(HttpStatus.HTTP_200_OK).json({ data });
    }
    return res.status(HttpStatus.HTTP_200_OK).json();
  }

  handle201(message, data, res) {
    if (message && data) {
      return res.status(HttpStatus.HTTP_200_OK).json({ message, data });
    }
    if (message) {
      return res.status(HttpStatus.HTTP_200_OK).json({ message });
    }
    if (data) {
      return res.status(HttpStatus.HTTP_200_OK).json({ data });
    }
    return res.status(HttpStatus.HTTP_200_OK).json();
  }
}

module.exports = new SuccessHandler();
