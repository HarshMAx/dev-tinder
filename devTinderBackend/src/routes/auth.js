const express = require('express');
const {validatSignupdata} = require('../utils/validation');
// const User = require("../models/users");
const bcrypt = require('bcrypt');
const { signup, login, logout } = require('../controller/authController');


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;