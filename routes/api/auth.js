const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('../../data/models/user');
const generateToken = require('../../utils/generateToken');

router.post('/register', async (req, res) => {
    try {
        const { username, password, department } = req.body;

        if (!username || !password || !department) {
            return res.status(400).json({ errorMessage: 'Required field missing' });
        }

        const hash = bcrypt.hashSync(password, 12);
        const user = await Users.add({
            ...req.body,
            password: hash
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: 'There was an error during register'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ errorMessage: 'Required field missing' });
        }

        const [user] = await Users.findBy({username});

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ errorMessage: 'Invalid credentials' });
        }
        
        const token = generateToken(user);
        res.json({token});   
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: 'There was an error during login'
        });
    }
});

module.exports = router;

