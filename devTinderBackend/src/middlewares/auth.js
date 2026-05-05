const jwt = require('jsonwebtoken');
const User = require('../models/users');


const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token missing");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send({ error: err.message });
    }
};

module.exports ={userAuth};