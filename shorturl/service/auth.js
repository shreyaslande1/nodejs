const jwt = require("jsonwebtoken");
const secret = "shreyas@123";

function setUSer(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret
    );
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

module.exports = { setUSer, getUser };