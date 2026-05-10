const { validateProfileEditData } = require('../utils/validation');
const connectionRequest = require("../models/connectionReq");
const user = require("../models/users")

const sendRequest = async(req,res,next)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedtoUser = await user.findById(toUserId);
        if(!allowedtoUser){
            return res.status(404).json({message:"User not found"});
        }

        const allowedStatus = ['ignored', 'interested'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        //if there is n exiting connection request then ..
         const existingRequest =await connectionRequest.findOne({
            $or : [
                {fromUserId,toUserId}, //already exist in db
                {fromUserId : toUserId , toUserId : fromUserId} // already exist but in reverse order 
            ],
         }); 
         
         if(existingRequest){
            return res.status(400).json({message : "Request already exists"});
         }


        const connectionReq = new connectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionReq.save();
        res.status(200).json(
            {
                message : req.user.firstName + " " + status + " in  " + allowedtoUser.firstName,
                data
            }
        );

    }catch(err){
        res.status(400).send(err.message);
    }


}

const reviewRequest = async(req,res,next)=>{
     try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
}


module.exports = {sendRequest,reviewRequest};