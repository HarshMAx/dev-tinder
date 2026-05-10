const { validateProfileEditData } = require('../utils/validation');

const viewProfile = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const editProfile = async (req, res) => {
    try {
        const isEditAllowed = validateProfileEditData(req);
        if (!isEditAllowed) {
            throw new Error("Invalid edit request");
        }

        const loginUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loginUser[key] = req.body[key];
        });

        await loginUser.save();
        res.send(`${loginUser.firstName} profile updated successfully`);

    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = { viewProfile, editProfile };