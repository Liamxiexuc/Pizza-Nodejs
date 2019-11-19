const mongoose = require("mongoose");

exports.connectToDB = () => {
  // const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

  //const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

  const connectionString = "mongodb://localhost:27017/pizza";
  mongoose.set("useUnifiedTopology", true);

  return mongoose.connect(connectionString, { useNewUrlParser: true });
};
