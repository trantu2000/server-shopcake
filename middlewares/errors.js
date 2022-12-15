const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    // Lỗi ID đối tượng Mongoose sai
    if (err.name === "CastError") {
      const message = `Không tìm thấy tài nguyên. Không hợp lệ: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    // Handling Mongoose Validation Error
    // Xử lý lỗi xác thực Mongoose
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    // Handling Mongoose duplicate key errors
    // Xử lý lỗi khóa trùng lặp Mongoose
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }
    // Handling wrong JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    // // Handling Expired JWT error
    // Xử lý lỗi JWT hết hạn
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired. Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }

};
