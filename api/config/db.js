import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
    const conn = await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME || 'test',
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Selected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
