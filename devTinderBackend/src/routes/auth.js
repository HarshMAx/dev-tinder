const express = require('express');
const {validatSignupdata} = require('../utils/validation');
const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const {userAuth} = require('./middlewares/auth');

const authRouter = express.Router();

authRouter.post("/signup", async (req,res,next)=>{
    // const userObj = {
    //     firstName : "Virat",
    //     lastName  : "Kohli",
    //     emailId : "vk04@gmail.com",
    //     password : "virat@123"
    // }

        try{
        //validation of data 
          validatSignupdata(req);

         //encrypt the password
         const {firstName ,lastName , emailId, password}  = req.body;
        const passwordHash = await bcrypt.hash(password,10)

        //creting a new instance of user model
        const user = new User({
            firstName ,
            lastName,
            emailId,
            password : passwordHash,
        });
        // console.log(user)
        await user.save();
        res.send("User Added Successfully")

    }catch(err){
        console.error(err);
        res.status(400).send("some thing went wrong")
    }

})

authRouter.post("/login", async (req,res,next)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId :emailId})
        if(!user){
            throw new Error("Invalida credentials")
        }
        const isPasswordValid = await user.verifyPassword(password);

        if(isPasswordValid){
            const token = await user.getjwtToken();
           
            // console.log(token,"token");
            res.cookie("token",token);
            res.send("Login successfully");
        }else{
            throw new Error("Invalida credentials");
        }
        
    }catch(err){
        console.error(err);
        res.status(400).send(err.message )
    }
})

module.exports = authRouter;