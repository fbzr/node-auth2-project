const router = require('express').Router();
const Users = require('../../data/models/user');

router.get('/', async (req, res) => {
    try {
        // const userId = req.userId;
        const loggedUser = await Users.findById(req.userId);
        const users = await Users.findBy({ department: loggedUser.department });
        
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error,
            errorMessage: 'There was an error'
        });
    }
});

module.exports = router;