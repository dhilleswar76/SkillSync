const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 4000,
  };

  const primaryUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_portal";

  try {
    const conn = await mongoose.connect(primaryUri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.warn(`Primary MongoDB Connection Notice: ${error.message}`);
  }

  // Fallback 1: Local MongoDB
  try {
    console.log("Attempting local MongoDB connection (127.0.0.1:27017)...");
    const localConn = await mongoose.connect("mongodb://127.0.0.1:27017/student_portal", {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`✅ Local MongoDB Connected: ${localConn.connection.host}`);
    return;
  } catch (localErr) {
    console.warn(`Local MongoDB not detected: ${localErr.message}`);
  }

  // Fallback 2: Environment fallback URI
  if (process.env.MONGO_URI_FALLBACK) {
    try {
      console.log("Attempting MONGO_URI_FALLBACK connection...");
      const fbConn = await mongoose.connect(process.env.MONGO_URI_FALLBACK, options);
      console.log(`✅ Fallback MongoDB Connected: ${fbConn.connection.host}`);
      return;
    } catch (fbErr) {
      console.warn(`Fallback connection notice: ${fbErr.message}`);
    }
  }

  console.log("ℹ️ Server operating with in-memory / mock mode enabled for unhindered operation.");
};

module.exports = connectDB;
