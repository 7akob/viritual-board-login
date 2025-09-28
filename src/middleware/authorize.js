const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    console.log("Authorizing...");
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        console.log("Token:", token);

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.authUser = user;
        console.log("Authorized user:", user.sub, user.username);
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Unauthorized',
            error: error.message
        });
    }
}