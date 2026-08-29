const mongoose = require("mongoose");

let isConnecting = false;
let lastDbError = null;

const sanitizeMongoUri = (raw) => {
  if (!raw || typeof raw !== "string") return "";
  let s = raw.trim();
  // Strip accidental "MONGO_URI=" or "MONGO_URI:" prefix
  s = s.replace(/^MONGO_URI\s*[:=]\s*/i, "").trim();
  // Strip wrapping single/double quotes
  s = s.replace(/^["']|["']$/g, "").trim();
  return s;
};

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return;
  }

  isConnecting = true;

  const rawUri = process.env.MONGO_URI;
  const cleanUri = sanitizeMongoUri(rawUri);
  const uri = cleanUri || "mongodb://127.0.0.1:27017/student_portal";

  const options = {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 10000,
  };

  try {
    const conn = await mongoose.connect(uri, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    lastDbError = null;
    isConnecting = false;

    // Drop legacy phone_1 unique index if it exists in the collection
    try {
      const collections = await conn.connection.db.listCollections({ name: "users" }).toArray();
      if (collections.length > 0) {
        await conn.connection.db.collection("users").dropIndex("phone_1").catch(() => {});
      }
    } catch (idxErr) {
      // Ignore if index doesn't exist
    }

    return conn;
  } catch (error) {
    lastDbError = error.message;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes("bad auth") || error.message.includes("Authentication failed")) {
      console.error("👉 Please verify your MongoDB Atlas password (URL-encode special chars like @ as %40).");
    }
    isConnecting = false;

    // Retry connection after 5 seconds
    setTimeout(() => {
      if (mongoose.connection.readyState === 0) {
        connectDB();
      }
    }, 5000);
  }
};

const ensureConnected = async () => {
  if (mongoose.connection.readyState === 1) {
    return true;
  }
  await connectDB();
  return mongoose.connection.readyState === 1;
};

const getDbStatus = () => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  return {
    state: states[mongoose.connection.readyState] || "unknown",
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
    lastError: lastDbError,
  };
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.ensureConnected = ensureConnected;
module.exports.getDbStatus = getDbStatus;
