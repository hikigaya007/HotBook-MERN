import express , { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { errorHandler } from '../utils/errorHandler';
import bcryptjs from 'bcryptjs';
import { check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

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

router.post('/login' , [
    check("email" , "Email is Required").isString(),
    check("password" , "Password Should Be Atleast 6 character").isLength({min: 6}),
] , async(req: Request , res: Response , next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email , password } = req.body;

    try {

    const validUser = await User.findOne({ email });
    if(!validUser) return next(errorHandler(400 , "User Not Found"))
    
    const validPassword =  bcryptjs.compareSync(password , validUser?.password)
    if(!validPassword) return next(errorHandler(400 , "Invalid Credential"))

    const token =  jwt.sign({id: validUser._id} , process.env.JWT_KEY as string , {
        expiresIn: '2h'
    } )


    const createdUser = await User.findById(validUser?._id).select("-password")


    res.cookie('accessToken', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
    });

    res.status(200).json(createdUser);


    } catch (error) {
       
        next(error);

    }


})

export default router ;