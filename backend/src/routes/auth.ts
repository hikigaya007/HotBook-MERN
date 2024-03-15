import express from 'express';
import User from '../models/user';
import { errorHandler } from '../utils/errorHandler';
import bcryptjs from 'bcryptjs';

const router = express.Router()

router.post("/register", async (req , res, next) => {

    const {email , firstname , password , lastname } = req.body ;

    try {
        const existingUser = await User.findOne({email})
        if(existingUser) return next(errorHandler(400 , "User Already Exist"))

        const hashPassword = bcryptjs.hashSync(password , 10);

        const createUser =  new User({email , firstname , password:hashPassword , lastname})

        await createUser.save();
        res
        .status(201)
        .json("User Created Successfully")

    } catch (error) {
        next(error);
    }

});

export default router ;