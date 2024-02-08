import mongoose from "mongoose";

const MONGODB_URI =
  `mongodb+srv://shubhamcdx:sscodeasexpertformongodball1290@cluster0.soagvli.mongodb.net/expendi?retryWrites=true&w=majority`
    
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare const global: {
  mongoose: { conn: any; promise: any }; // Replace YourMongooseType with the actual type of mongoose
};
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  try {
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log("Connected to MongoDB");

        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
}

export default dbConnect;
