const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

//always use function method not arraow fuction okay ..
userSchema.methods.getjwtToken = async function(){
    const token = await  jwt.sign({userId : this._id},process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRE_TIME
    })
    return token;
}

userSchema.methods.verifyPassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash= user.password;
    
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    
    return isPasswordValid;
}

const User = mongoose.model("User" , userSchema);


module.exports = User;