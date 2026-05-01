const mongoose = require('mongoose');

//create a schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 15
    },
    lastName : {
        type: String
    },
    emailId : {
        type : String,
        required : true,
        lowerCase : true,
        trim : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    },
    phtoUrl : {
        type: String,
        //only work when adding a new user not on update time ok 
        validate(value) {
            if(!["male","female","other"].includes(value)){
                    throw new Error("Gender data is not valid");
            }
        }
    },
    about : {
        type: String,
        default: "This is default about of the user"
    },
    skills : {
        type : [String]
    }
},{
    timestamps: true
})

//create a model and always in capital letter
const User = mongoose.model("User" , userSchema);

module.exports = User;