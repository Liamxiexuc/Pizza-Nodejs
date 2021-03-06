const mongoose = require("mongoose");

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }

  console.log(`Connecting to ${connectionString}`);
  mongoose.set("useUnifiedTopology", true);

  return mongoose.connect(connectionString, { useNewUrlParser: true });
};
