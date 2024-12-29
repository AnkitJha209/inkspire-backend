import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(process.env.DB_URL)
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}