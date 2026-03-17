function errorHandler(err, _req, res, _next) {
  const status = Number(err?.statusCode || err?.status || 500);
  const message = err?.message || "Internal Server Error";

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({ message });
}

module.exports = { errorHandler };

