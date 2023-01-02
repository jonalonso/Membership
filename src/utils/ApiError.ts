import codes from "../consts/codesError";
import httpStatus from "../consts/httpStatusCodes";
class ApiError extends Error {
  code: string;
  status: any;
  details: any;
  constructor(
    message:any,
    code = codes.GENERIC,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    details:any = undefined
  ) {
    super(message);

    this.code = code;
    this.status = status;
    this.details = details;
  }

  static codes() {
    return { ...codes };
  }

  static unknown(message:any = "An unknown error occurred") {
    return new ApiError(
      message,
      codes.UNKNOWN,
      httpStatus.INTERNAL_SERVER_ERROR
    );
  }

  static invalidRequest(message:any = "Invalid request", details:any) {
    return new ApiError(
      message,
      codes.INVALID_REQUEST,
      httpStatus.UNPROCESSABLE_ENTITY,
      details
    );
  }

  static badRequest(message:any = "Bad request", details:any) {
    return new ApiError(
      message,
      codes.INVALID_REQUEST,
      httpStatus.BAD_REQUEST,
      details
    );
  }

  static notFound(message:any = "Not found", details:any) {
    return new ApiError(
      message,
      codes.NOT_FOUND,
      httpStatus.NOT_FOUND,
      details
    );
  }

  static notAuthenticated() {
    return new ApiError(
      "Not authenticated",
      codes.NOT_AUTHENTICATED,
      httpStatus.UNAUTHORIZED
    );
  }

  static accessDenied(details:any) {
    return new ApiError(
      "Access denied",
      codes.ACCESS_DENIED,
      httpStatus.FORBIDDEN,
      details
    );
  }

  static fileUploadFailed() {
    return new ApiError(
      "File upload failed",
      codes.INVALID_REQUEST,
      httpStatus.UNPROCESSABLE_ENTITY
    );
  }

  static conflict(details:any, message:any = "Conflict detected") {
    return new ApiError(
      message,
      codes.CONFLICT,
      httpStatus.CONFLICT,
      details
    );
  }

  static paymentRequired(message:any = "Payment required", details:any) {
    return new ApiError(
      message,
      codes.PAYMENT_REQUIRED,
      httpStatus.PAYMENT_REQUIRED,
      details
    );
  }

  static preconditionFailed(message:any = "Precondition Failed", details:any) {
    return new ApiError(
      message,
      codes.PRECONDITION_FAILED,
      httpStatus.PRECONDITION_FAILED,
      details
    );
  }

  static invalidMimeType(allowedTypes:any) {
    return new ApiError(
      "Invalid MIME-type",
      codes.INVALID_REQUEST,
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      { allowedTypes }
    );
  }

  static bodyParserErrorHandler(error:any, ctx:any) {

    throw new ApiError(
      "Could not parse body",
      codes.INVALID_REQUEST,
      httpStatus.BAD_REQUEST
    );
  }
}

export default ApiError;
