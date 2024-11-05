class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;

    // ghi lai stack trace de thuan tien cho viec debug 
    Error.captureStackTrace(this.constructor)
  }
}
export default ApiError