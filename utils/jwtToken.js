// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + 8 * 3600000),
    domain: "https://client-shopcake-tranthanhtu.vercel.app",
    path: "/",
    httpOnly: true,
    secure: true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
