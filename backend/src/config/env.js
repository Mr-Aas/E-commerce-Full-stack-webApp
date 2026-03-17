const dotenv = require("dotenv");

function loadEnv() {
  dotenv.config();

  // Basic validation for required env vars (fail fast in dev)
  const missing = [];
  if (!process.env.MONGO_URI) missing.push("MONGO_URI");
  if (missing.length > 0) {
    // Don't throw here to allow running without DB (e.g. UI-only work),
    // but make it obvious what is missing.
    console.warn(`Missing environment variables: ${missing.join(", ")}`);
  }
}

module.exports = { loadEnv };

