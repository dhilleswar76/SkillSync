const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const primaryUri = process.env.MONGO_URI;
    const fallbackUri = process.env.MONGO_URI_FALLBACK;

    if (!primaryUri && !fallbackUri) {
      throw new Error("MONGO_URI is not configured");
    }

    try {
      await mongoose.connect(primaryUri || fallbackUri);
      console.log(`MongoDB connected${primaryUri ? "" : " (fallback)"}`);
      return;
    } catch (primaryError) {
      if (!fallbackUri || fallbackUri === primaryUri) {
        throw primaryError;
      }

      console.warn("Primary MongoDB connection failed, trying fallback URI...");
      await mongoose.connect(fallbackUri);
      console.log("MongoDB connected (fallback)");
      return;
    }
  } catch (err) {
    console.error(err);
    console.warn("Continuing without a live MongoDB connection so the server can stay up.");
  }
};
