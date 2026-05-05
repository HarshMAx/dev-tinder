const express = require('express');
const {validatSignupdata} = require('../utils/validation');
const {userAuth} = require('../middlewares/auth');

const profileRouter = express.Router();

profileRouter.get("/profile" , userAuth , async (req,res,next)=>{

    try{
        const user = req.user;

        res.send(user);

    }catch(err){
         console.error(err);
        res.status(400).send(err.message )
    }

})


module.exports = profileRouter;