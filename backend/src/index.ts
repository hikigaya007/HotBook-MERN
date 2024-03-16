import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
}));


mongoose.connect(process.env.DB as string)
.then(() =>{
    console.log("Db connected")
})
.catch((error) =>{
    console.log(error)
})

app.listen(3000 , () => {
    console.log("the server is running at port 6000")
})

app.use('/api/auth' , authRouter);

app.use((err:any , req:Request , res:Response , next:NextFunction) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || "Internal server error"

    return res
    .status(statusCode)
    .json({
        success: false,
        message
    })


})