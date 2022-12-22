// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    domain: "https://client-shopcake-tranthanhtu.vercel.app",
    path: "/",
    expires: new Date(Date.now() + 8 * 3600000),
    httpOnly: true,
    secure: true
  };

  res.status(statusCode).cookie("token-shopcake", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
