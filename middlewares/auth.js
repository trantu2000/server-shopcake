const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");


//Kiểm tra xem người dùng có được xác thực hay không
// Checks if user is authenticated or not
// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//   const token  = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler("Vui lòng dăng nhập", 401));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decoded.id);

//   next();
// });

exports.isAuthenticatedUser = async (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token)
      return res
          .status(401)
          .json({ success: false, message: 'Access token not found' })
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // req.userId = decoded.userId
      req.user = await User.findById(decoded.id);
      next()
  } catch (error) {
      console.log(error);
      return res.status(403).json({success: false, message: 'Invalid token'})
  }

}

// Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
