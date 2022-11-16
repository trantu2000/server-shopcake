const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shpcake.nuvjd7e.mongodb.net/?retryWrites=true&w=majority`,
      connectionParams
    );
    console.log("connected to datatbase successfully!");
  } catch (error) {
    console.log("could not connect to database!");
  }
};
