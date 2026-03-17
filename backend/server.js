const { loadEnv } = require("./src/config/env");
const { connectToMongo } = require("./src/config/db");
const { createApp } = require("./src/presentation/server");

async function start() {
  loadEnv();

  const app = createApp();
  await connectToMongo(process.env.MONGO_URI);

  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    // Keep startup logs minimal but useful
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start backend", err);
  process.exitCode = 1;
});

