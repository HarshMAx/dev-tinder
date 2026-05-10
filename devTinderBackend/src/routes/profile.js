const express = require('express');
const {validatSignupdata, validateProfileEditData} = require('../utils/validation');
const {userAuth} = require('../middlewares/auth');
const {viewProfile,
       editProfile
} = require("../controller/profileController");


const profileRouter = express.Router();

profileRouter.get("/profile/view" , userAuth , viewProfile);

profileRouter.patch("/profile/edit" , userAuth , editProfile);


module.exports = profileRouter;