import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from "cors";

dotenv.config()
connectDB();
const app=express();

//Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//Routes
app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

const PORT=process.env.PORT || 8888

app.listen(PORT,()=>{
    console.log(`Server started running at ${PORT}`);
})

