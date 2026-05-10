const express = require("express");
const userRouter = express.Router();
const {userAuth}  = require("../middlewares/auth");
const {pendingRequest,allConnections,feedAllUsers} = require("../controller/userController");

userRouter.get("/user/request/received",userAuth,pendingRequest);
userRouter.get("/user/allconnections",userAuth,allConnections);
userRouter.get("/user/feed",userAuth,feedAllUsers);


module.exports = userRouter;
