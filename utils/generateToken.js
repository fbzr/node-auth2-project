const jwt = require('jsonwebtoken');

module.exports = user => {
    const payload = {
        user: {
            id: user.id
        }
    };

    const secret = process.env.JWT_SECRET;

    return jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
}