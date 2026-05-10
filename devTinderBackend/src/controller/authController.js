const User = require("../models/users");
const bcrypt = require('bcrypt');
const { validatSignupdata } = require('../utils/validation');

const signup = async (req, res) => {
    try {
        validatSignupdata(req);

        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User Added Successfully");

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid credentials");

        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) throw new Error("Invalid credentials");

        const token = await user.getjwtToken();
        res.cookie("token", token);
        res.send("Login successfully");

    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
};

const logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now())
        });
        res.send("Logout successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { signup, login, logout };