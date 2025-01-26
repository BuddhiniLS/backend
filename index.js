import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
 
import productRouter from './Router/productRouter.js';
import userRouter from './Router/userRouter.js';
import jwt from "jsonwebtoken"

const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "")
    console.log(token);

    if(token!=null){
        jwt.verify(token,"cbc-secret-key 7973",(error,decoded)=>{
            if(!error){
                
                req.user = decoded
            }
        }) 
        
    }
      next() 
    
});

// MongoDB connection URL (use environment variables for sensitive data)
const mongoUrl = "mongodb+srv://admin:123@cluster0.n37yk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connecting to MongoDB
mongoose.connect(mongoUrl, {})
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(err => {
        console.error("Database connection error:", Error);
    });

// Corrected routes

app.use("/api/products", productRouter);
app.use("/api/users", userRouter)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});