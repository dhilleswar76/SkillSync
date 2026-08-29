const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  };

  const primaryUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_portal";

  try {
    const conn = await mongoose.connect(primaryUri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error(`❌ Primary MongoDB Connection Error: ${error.message}`);
    if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
      console.error("👉 Please verify your MongoDB Atlas username/password in MONGO_URI.");
    }
  }

  // Fallback 1: Environment fallback URI
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

  // Fallback 2: Local MongoDB
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

  console.warn("⚠️ Warning: MongoDB is currently disconnected. Database operations may fail until valid Atlas credentials are provided.");
};

module.exports = connectDB;
