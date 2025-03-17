import express from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import {validators} from '../validators/authValidator.js';

const router = express.Router();
// register
router.post('/register', async(req, res) => {
    try{
        const {error} = registerSchema.validate(req.body);
        if(error) return res.status(400).json({message:error.details[0].message});

        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser) return res.status(400).json({message:'User dey dada!'});

        const user =new User(req.body);
        await user.save();

        const token = jwt.sign({_id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user,token });
    } catch (error){
        res.status(500).json({message:'server error'});
    }
});


// login

router.post('/login', async(req, res) => {
    try{
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).json({message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).json({message:'invalid credentials'});

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({message:'invalid credentials'});
        
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
        res.json({user,token});
    }catch(error){
        res.status(500).json({message:'server error'});
    }
});


export default router;
// module.exports = router;