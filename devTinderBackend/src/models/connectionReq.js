const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status: {
    type: String,
    enum: {
        values: ['ignored', 'accepted', 'rejected', 'interested'],
        message: "{VALUE} is not valid status"
    },
    required: true
}
},
{timestamps: true})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1}, {unique : true});

//save ni pela aa method call thse 
connectionRequestSchema.pre("save",async function(){
    const conectionReq = this;

    if(conectionReq.fromUserId.equals(conectionReq.toUserId)){
        throw new Error("You cannot send request to yourself")
    }
    // next();

})

const ConnectionRequestModel = new mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequestModel;
