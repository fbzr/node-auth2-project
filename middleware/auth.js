const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({ errorMessage: 'No token, authorization denied' });
    }

    // Verify token
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ errorMessage: 'Token is not valid' });
        } else {
            req.userId = decoded.user.id;
            next();
        }
        });
    } catch (err) {
        res.status(500).json({ errorMessage: 'Server Error' });
    }
}