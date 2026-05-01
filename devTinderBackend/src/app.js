const express = require('express');
const connectDB = require('./config/database');
const User = require("./models/users");
const {validatSignupdata} = require('./utils/validation');
const bcrypt = require('bcrypt');
 
const app = express();

const PORT = 7777;

app.use(express.json());

app.post("/signup", async (req,res,next)=>{
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

app.post("/login", async (req,res,next)=>{
    try{
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId :emailId})
        if(!user){
            throw new Error("Invalida credentials")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("user login successfully");
        }else{
            throw new Error("Invalida credentials");
        }
        
    }catch(err){
        console.error(err);
        res.status(400).send(err.message )
    }
})

//get user by email
app.post("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmail });
        // console.log(user, "here");
        res.send(user);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.delete("/deleteUser",async (req,res)=>{

    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({userId});
        res.send("Delete successfully")

    }catch(e){
        res.status(400).send("something went wrong");
    }
})

//get all user from an api ...
app.get("/feed",async (req,res,next)=>{

    try{
        const allUser = await User.find({});
        if(!allUser){
            res.status(400).send("Not findthe data ");
        }else{
            res.send(allUser);
        }

    }catch(e){
        res.status(400).send("some thing went wrong");
    }

})

app.patch("/updateUser",async (req,res)=>{

    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({_id:userId},data);
        res.send("Updated  successfully")

    }catch(e){
        res.status(400).send("something went wrong");
    }
})

connectDB().then(() => {
    console.log("Database Connection is Success");
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })

}).catch((err) => {
    console.error("Database not connest");

})