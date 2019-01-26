const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

//auth and sign up

router.post('/register', userController.register);

module.exports = router;