import mongoose from 'mongoose';

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect("mongodb+srv://darshishah2209:xtfgOu7YDevTdpGn@cluster0.dt0spub.mongodb.net/ecommerce")
        console.log(`Connected to Database ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connecting DB");
    }
};

export default connectDB;