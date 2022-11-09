const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const stripe = require("stripe")("sk_test_51LxNt3D5yEis04AKEZ65LClAR8FAjttNCEEZRcv2HosPcuOXfqyigtgriK9J8mK7GuM8FhHLcpgHBS6R9O76ST7X00weK2Yvcc");


// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "VND",

    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
