const HttpStatus = require("../constants/httpStatus");
const {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  PaymentRequiredError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
} = require("./CustomErrors");

class ErrorHandler {
  constructor() {
    this.handle400 = this.handle400.bind(this);
    this.handle401 = this.handle401.bind(this);
    this.handle402 = this.handle402.bind(this);
    this.handle403 = this.handle403.bind(this);
    this.handle404 = this.handle404.bind(this);
    this.handle405 = this.handle405.bind(this);
    this.handle409 = this.handle409.bind(this);
    this.handle500 = this.handle500.bind(this);
    this.handle500AndCustomError = this.handle500AndCustomError.bind(this);
  }

  //! This method will be used to handle missing arguments (400)
  handle400(message, res) {
    return res.status(HttpStatus.HTTP_400_BAD_REQUEST).json({ error: message });
  }

  //! This method will be used to handle unauthorized requests (401)
  handle401(message, res) {
    return res
      .status(HttpStatus.HTTP_401_UNAUTHORIZED)
      .json({ error: message });
  }

  //! This method will be used to handle payment required requests (402)
  handle402(message, res) {
    return res
      .status(HttpStatus.HTTP_402_PAYMENT_REQUIRED)
      .json({ error: message });
  }

  //! This method will be used to handle forbidden requests (403)
  handle403(message, res) {
    return res.status(HttpStatus.HTTP_403_FORBIDDEN).json({ error: message });
  }

  //! This method will be used to handle not found requests (404)
  handle404(message, res) {
    return res.status(HttpStatus.HTTP_404_NOT_FOUND).json({ error: message });
  }

  //! This method will be used to handle method not allowed requests (405)
  handle405(message, res) {
    return res
      .status(HttpStatus.HTTP_405_METHOD_NOT_ALLOWED)
      .json({ error: message });
  }

  //! This method will be used to handle conflict requests (409)
  handle409(message, res) {
    return res.status(HttpStatus.HTTP_409_CONFLICT).json({ error: message });
  }

  //! This method will be used to handle server errors (500)
  handle500(err, res) {
    return res
      .status(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }

  //! This method will be used to handle server errors (500)
  handle500AndCustomError(err, res) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof BadRequestError) {
      return this.handle400(err.message, res);
    } else if (err instanceof UnauthorizedError) {
      return this.handle401(err.message, res);
    } else if (err instanceof NotFoundError) {
      return this.handle404(err.message, res);
    } else if (err instanceof ConflictError) {
      return this.handle409(err.message, res);
    } else if (err instanceof MethodNotAllowedError) {
      return this.handle405(err.message, res);
    } else if (err instanceof ForbiddenError) {
      return this.handle403(err.message, res);
    } else if (err instanceof PaymentRequiredError) {
      return this.handle402(err.message, res);
    } else {
      return this.handle500(err, res);
    }
  }
}

module.exports = new ErrorHandler();
