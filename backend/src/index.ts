import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(process.env.DB as string)
.then(() =>{
    console.log("Db connected")
})
.catch((error) =>{
    console.log(error)
})

app.listen(6000 , () => {
    console.log("the server is running at port 6000")
})