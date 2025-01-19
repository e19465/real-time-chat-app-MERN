const HttpStatus = require("../constants/httpStatus");

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(HttpStatus.HTTP_400_BAD_REQUEST, message);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(HttpStatus.HTTP_401_UNAUTHORIZED, message);
  }
}

class PaymentRequiredError extends HttpError {
  constructor(message = "Payment Required") {
    super(HttpStatus.HTTP_402_PAYMENT_REQUIRED, message);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(HttpStatus.HTTP_403_FORBIDDEN, message);
  }
}

class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(HttpStatus.HTTP_404_NOT_FOUND, message);
  }
}

class MethodNotAllowedError extends HttpError {
  constructor(message = "Method Not Allowed") {
    super(HttpStatus.HTTP_405_METHOD_NOT_ALLOWED, message);
  }
}

class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(HttpStatus.HTTP_409_CONFLICT, message);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  PaymentRequiredError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
};
