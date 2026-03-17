const mongoose = require("mongoose");

async function connectToMongo(mongoUri) {
  if (!mongoUri) return;

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongo connection error", err);
  });

  mongoose.connection.once("open", () => {
    console.log("Mongo connected");
  });
}

module.exports = { connectToMongo };

