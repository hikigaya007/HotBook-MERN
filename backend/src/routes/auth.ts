import express from 'express';
import User from '../models/user';
import { errorHandler } from '../utils/errorHandler';
import bcryptjs from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from "express-validator";

const router = express.Router()

router.post("/register", [
    check("firstname" , "First Name is required").isString(),
    check("lastname" , "Last Name is required").isString(),
    check("email" , "Email is required").isEmail(),
    check("password" , "Password Length Should Be Atleast 6 Character").isLength({min : 6}),
] , async (req: Request , res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

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