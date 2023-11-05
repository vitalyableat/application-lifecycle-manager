import mongoose from 'mongoose';

export const connectDB = () =>
  mongoose.connect(process.env.MONGODB_URI).catch(() => console.log('Unable to Connect to MongoDB'));
