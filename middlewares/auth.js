const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// const dotenv = require('dotenv');
// dotenv.config({ path: '../server/config/config.env' })




// Checks if user is authenticated or not
//Kiểm tra xem người dùng có được xác thực hay không
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    let JWT_SECRET = 'UEIH4353R4234E09NFDJ34FWG2MNM4U34KFLS';

    const { token } = req.cookies
    

    if (!token) {
        return next(new ErrorHandler('Đăng nhập trước để truy cập.', 401))
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}