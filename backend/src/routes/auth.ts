import express from 'express';

const router = express.Router()

router.post("/register", async (req , res, next) => {

    const {email , firstname , password } = req.body ;

});