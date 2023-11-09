import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log('MongoDB Connected');
    } catch (e) {
      console.log('Unable to Connect to MongoDB: ', e);
    }
  }
};
