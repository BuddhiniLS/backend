import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
 

import userRouter from './Router/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from './Router/productRouter.js';
import product from './models/product.js';
import orderRouter from './Router/orderRouter.js';
import cors from "cors";
  

dotenv.config()

const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "")
    console.log(token);

    if(token!=null){
        jwt.verify(token,process.env.SECRET,(error,decoded)=>{
            if(!error){
                
                req.user = decoded
            }
        }) 
        
    }
      next() 
    
});

// MongoDB connection URL (use environment variables for sensitive data)
const mongoUrl = process.env.MONGO_DB_URI


app.use(cors())


// Connecting to MongoDB
mongoose.connect(mongoUrl, {})
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });
// Corrected routes


app.use("/api/users", userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});