const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // If already connected, reuse the existing connection
    if (mongoose.connection.readyState === 1) {
      return;
    }

    // If connection is currently being established, wait for it
    if (mongoose.connection.readyState === 2) {
      await mongoose.connection.asPromise();
      return;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    throw error;
  }
};

module.exports = connectDB;