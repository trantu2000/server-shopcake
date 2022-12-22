// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token-shopcake", token, { domain: 'https://client-shopcake-tranthanhtu.vercel.app', encode: String }).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
