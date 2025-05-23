class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    // Logging for debug
    console.log("🔥 API Error Generated 🔥");
    console.log("statusCode:", statusCode);
    console.log("message:", message);
    console.log("errors:", errors);
    console.log("stack:", stack);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message,
      errors: this.errors,
    };
  }
}

export { ApiError };
