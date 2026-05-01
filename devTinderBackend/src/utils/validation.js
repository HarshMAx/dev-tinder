const validator = require('validator')

const validatSignupdata = (req) => {
    const {
        firstName,
        lastName,
        emailId,
        password
    }= req.body;

    if(!firstName || !lastName){
        throw new Error ("Name is not valid");
    }
    else if(firstName.length < 4 && firstName.length > 15){
        throw new Error("First name should be 4 to 15 character")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
     else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password")
    }
}

module.exports = {
    validatSignupdata
}