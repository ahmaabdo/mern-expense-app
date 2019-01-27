const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users.controller');

//auth and sign up

router.post('/register', userController.register);
router.post('/auth', userController.login);
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.send({ message: 'You are authenticated user' });
});

module.exports = router;